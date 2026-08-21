const chapters = [
  {id:"function",icon:"F",zh:"函数",en:"Functions",q:39,a:51,color:"#dcefe8",tokens:["ch2function"]},
  {id:"modulus",icon:"|x|",zh:"模函数",en:"Modulus Function",q:51,a:54,color:"#eee5f5",tokens:["ch2modulus"]},
  {id:"trigonometry2",icon:"θ",zh:"三角函数 2",en:"Trigonometry 2",q:36,a:33,color:"#fee7d6",tokens:["trigonometry2"]},
  {id:"trig-proof",icon:"≡",zh:"三角方程与证明",en:"Equations & Proof",q:41,a:70,color:"#e0eafa",tokens:["equation&proof","equationproof"]},
  {id:"exponential",icon:"eˣ",zh:"指数与对数",en:"Exponential & Logarithm",q:75,a:77,color:"#f6e4e7",tokens:["exponential","logarithm"]},
  {id:"differentiation",icon:"dy",zh:"微分",en:"Differentiation",q:77,a:105,color:"#e1eef0",tokens:["differentiation"]},
  {id:"integration",icon:"∫",zh:"积分",en:"Integration",q:40,a:53,color:"#f3ead7",tokens:["integration"]},
  {id:"iteration",icon:"xₙ",zh:"迭代",en:"Iteration",q:52,a:55,color:"#e4ecd8",tokens:["iteration"]}
];

const $ = (id) => document.getElementById(id);
const state = {
  active:"function", difficulty:5, view:"question", questionPage:2, answerPage:2,
  files:{}, urls:{question:"",answer:""}, results:readJSON("p3-results",[])
};

function readJSON(key,fallback){try{return JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback))}catch{return fallback}}
function normalise(name){return name.toLowerCase().replace(/\s+/g,"").replace(/[^a-z0-9&\u4e00-\u9fff]/g,"")}
function classify(name){
  const clean=normalise(name);
  const chapter=chapters.find(c=>c.tokens.some(t=>clean.includes(t)));
  return chapter?{chapter:chapter.id,kind:clean.includes("答案")?"answer":"question"}:null;
}
function activeChapter(){return chapters.find(c=>c.id===state.active)}
function notify(text){$("noticeText").textContent=text;$("notice").classList.remove("hidden")}

function openDB(){return new Promise((resolve,reject)=>{
  const request=indexedDB.open("edexcel-p3-ipad",1);
  request.onupgradeneeded=()=>request.result.createObjectStore("files",{keyPath:"key"});
  request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error);
})}
async function getAllFiles(){const db=await openDB();return new Promise((resolve,reject)=>{const r=db.transaction("files").objectStore("files").getAll();r.onsuccess=()=>{db.close();resolve(r.result)};r.onerror=()=>reject(r.error)})}
async function putFiles(items){const db=await openDB();return new Promise((resolve,reject)=>{const tx=db.transaction("files","readwrite"),store=tx.objectStore("files");items.forEach(i=>store.put(i));tx.oncomplete=()=>{db.close();resolve()};tx.onerror=()=>reject(tx.error)})}
async function deleteChapter(id){const db=await openDB();return new Promise((resolve,reject)=>{const tx=db.transaction("files","readwrite"),store=tx.objectStore("files");store.delete(`${id}:question`);store.delete(`${id}:answer`);tx.oncomplete=()=>{db.close();resolve()};tx.onerror=()=>reject(tx.error)})}

async function unzipPdfs(file){
  const bytes=new Uint8Array(await file.arrayBuffer()),view=new DataView(bytes.buffer);let end=-1;
  for(let i=bytes.length-22;i>=Math.max(0,bytes.length-65557);i--){if(view.getUint32(i,true)===0x06054b50){end=i;break}}
  if(end<0)throw new Error("无法读取 ZIP，请解压后直接选择 PDF");
  const count=view.getUint16(end+10,true),decoder=new TextDecoder("utf-8"),out=[];let p=view.getUint32(end+16,true);
  for(let i=0;i<count;i++){
    if(view.getUint32(p,true)!==0x02014b50)break;
    const method=view.getUint16(p+10,true),size=view.getUint32(p+20,true),nameLen=view.getUint16(p+28,true),extraLen=view.getUint16(p+30,true),commentLen=view.getUint16(p+32,true),offset=view.getUint32(p+42,true);
    const name=decoder.decode(bytes.slice(p+46,p+46+nameLen));p+=46+nameLen+extraLen+commentLen;
    if(!name.toLowerCase().endsWith(".pdf")||name.includes("__MACOSX")||name.includes("/._"))continue;
    const localName=view.getUint16(offset+26,true),localExtra=view.getUint16(offset+28,true),start=offset+30+localName+localExtra,compressed=bytes.slice(start,start+size);let data;
    if(method===0)data=compressed;
    else if(method===8){const stream=new Blob([compressed]).stream().pipeThrough(new DecompressionStream("deflate-raw"));data=new Uint8Array(await new Response(stream).arrayBuffer())}
    else continue;
    out.push(new File([data],name.split("/").pop(),{type:"application/pdf"}));
  }
  return out;
}

async function importFiles(fileList){
  const selected=[...fileList];if(!selected.length)return;
  notify("正在导入，请不要关闭页面…");
  try{
    const pdfs=[];
    for(const file of selected){if(file.name.toLowerCase().endsWith(".zip"))pdfs.push(...await unzipPdfs(file));else if(file.name.toLowerCase().endsWith(".pdf"))pdfs.push(file)}
    const items=[];let skipped=0;
    for(const file of pdfs){const match=classify(file.name);if(!match){skipped++;continue}items.push({key:`${match.chapter}:${match.kind}`,chapter:match.chapter,kind:match.kind,name:file.name,size:file.size,blob:file,updatedAt:Date.now()})}
    if(!items.length)throw new Error("没有识别到文件。请保留原来的章节文件名。")
    await putFiles(items);await refreshFiles();
    notify(`已导入 ${items.length} 份文件${skipped?`，${skipped} 份未识别`:""}`);
  }catch(error){notify(error.message||"导入失败，请改为选择单个 PDF")}
}

async function refreshFiles(){
  const rows=await getAllFiles();state.files={};rows.forEach(r=>{state.files[r.key]=r});
  renderNav();renderLibrary();renderStats();renderCurrent();
}

function renderNav(){
  $("chapterNav").innerHTML=chapters.map(c=>{
    const ready=state.files[`${c.id}:question`]&&state.files[`${c.id}:answer`];
    return `<button class="chapter-btn ${state.active===c.id?"active":""}" data-chapter="${c.id}"><span class="icon" style="background:${c.color}">${c.icon}</span><span><b>${c.zh}</b><small>${c.en}</small></span><span class="ready">${ready?"✓":""}</span></button>`
  }).join("");
  document.querySelectorAll("[data-chapter]").forEach(btn=>btn.onclick=()=>selectChapter(btn.dataset.chapter));
}
function renderCurrent(){
  const c=activeChapter();$("largeIcon").textContent=c.icon;$("largeIcon").style.background=c.color;$("chapterZh").textContent=c.zh;$("chapterEn").textContent=c.en;
  const ready=state.files[`${c.id}:question`];$("emptyState").classList.toggle("hidden",!!ready);$("viewer").classList.toggle("hidden",!ready);
  if(ready)loadPdf();
}
function renderStats(){
  const done=state.results.length,correct=state.results.filter(r=>r.correct).length,matched=chapters.filter(c=>state.files[`${c.id}:question`]&&state.files[`${c.id}:answer`]).length;
  $("doneCount").textContent=done;$("accuracy").textContent=done?`${Math.round(correct/done*100)}%`:"0%";$("accuracyDetail").textContent=done?`${correct}/${done}`:"开始后统计";$("matchCount").textContent=matched;$("matchProgress").style.width=`${matched/8*100}%`;
}
function renderLibrary(){
  $("libraryList").innerHTML=chapters.map(c=>{
    const q=state.files[`${c.id}:question`],a=state.files[`${c.id}:answer`];if(!q&&!a)return"";
    const size=((q?.size||0)+(a?.size||0))/1024/1024;
    return `<div class="library-item"><span><b>${c.zh}</b><small>${q?"题目 ✓":"题目缺失"} · ${a?"答案 ✓":"答案缺失"} · ${size.toFixed(0)} MB</small></span><button data-delete="${c.id}" type="button">移除缓存</button></div>`
  }).join("")||`<div class="dialog-tip">还没有缓存章节。</div>`;
  document.querySelectorAll("[data-delete]").forEach(btn=>btn.onclick=async()=>{await deleteChapter(btn.dataset.delete);await refreshFiles();notify("章节缓存已移除，学习记录仍保留")});
}

function selectChapter(id){state.active=id;state.view="question";state.questionPage=pageForDifficulty(activeChapter(),state.difficulty);state.answerPage=2;renderNav();renderTabs();renderCurrent()}
function pageForDifficulty(chapter,difficulty){const start=2,usable=Math.max(1,chapter.q-start),band=usable/10,low=Math.floor(start+(difficulty-1)*band),high=Math.max(low,Math.floor(start+difficulty*band-1));return low+Math.floor(Math.random()*(high-low+1))}
function maxPage(){const c=activeChapter();return state.view==="question"?c.q:c.a}
function currentPage(){return state.view==="question"?state.questionPage:state.answerPage}
function setPage(value){const page=Math.max(1,Math.min(maxPage(),Number(value)||1));if(state.view==="question")state.questionPage=page;else state.answerPage=page;loadPdf()}
function loadPdf(){
  const row=state.files[`${state.active}:${state.view}`];if(!row){$("pdfFrame").src="about:blank";notify(state.view==="answer"?"这个章节还没有导入答案":"这个章节还没有导入题目");return}
  if(state.urls[state.view])URL.revokeObjectURL(state.urls[state.view]);state.urls[state.view]=URL.createObjectURL(row.blob);
  $("pageInput").value=currentPage();$("pdfFrame").src=`${state.urls[state.view]}#page=${currentPage()}&view=FitH`;
}
function renderTabs(){document.querySelectorAll("[data-view]").forEach(btn=>btn.classList.toggle("active",btn.dataset.view===state.view))}
function updateDifficulty(value){state.difficulty=Number(value);$("difficultyValue").textContent=value;$("difficultyLabel").textContent=value<=3?"基础":value<=7?"进阶":"挑战"}
function record(correct){state.results.push({chapter:state.active,difficulty:state.difficulty,page:state.questionPage,correct,at:Date.now()});localStorage.setItem("p3-results",JSON.stringify(state.results));renderStats();notify(correct?"已记录：已经掌握":"已加入重做记录")}

function downloadJSON(){const payload={version:1,exportedAt:new Date().toISOString(),results:state.results};const url=URL.createObjectURL(new Blob([JSON.stringify(payload,null,2)],{type:"application/json"}));const a=document.createElement("a");a.href=url;a.download=`P3学习记录-${new Date().toISOString().slice(0,10)}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
async function importResults(file){try{const data=JSON.parse(await file.text());if(!Array.isArray(data.results))throw new Error();state.results=data.results;localStorage.setItem("p3-results",JSON.stringify(state.results));renderStats();notify("学习记录导入成功")}catch{notify("学习记录文件无法识别")}}

function bind(){
  [$("headerImport"),$("emptyImport")].forEach(btn=>btn.onclick=()=>{$("managerDialog").showModal()});$("openManager").onclick=()=>$("managerDialog").showModal();$("closeNotice").onclick=()=>$("notice").classList.add("hidden");
  $("fileInput").onchange=e=>{importFiles(e.target.files);e.target.value=""};
  const zone=$("dropZone");["dragenter","dragover"].forEach(n=>zone.addEventListener(n,e=>{e.preventDefault();zone.classList.add("drag")}));["dragleave","drop"].forEach(n=>zone.addEventListener(n,e=>{e.preventDefault();zone.classList.remove("drag")}));zone.addEventListener("drop",e=>importFiles(e.dataTransfer.files));
  $("difficulty").oninput=e=>updateDifficulty(e.target.value);$("randomQuestion").onclick=()=>{state.questionPage=pageForDifficulty(activeChapter(),state.difficulty);state.view="question";renderTabs();loadPdf()};
  document.querySelectorAll("[data-view]").forEach(btn=>btn.onclick=()=>{state.view=btn.dataset.view;renderTabs();loadPdf()});
  $("prevPage").onclick=()=>setPage(currentPage()-1);$("nextPage").onclick=()=>setPage(currentPage()+1);$("pageInput").onchange=e=>setPage(e.target.value);$("retry").onclick=()=>record(false);$("mastered").onclick=()=>record(true);
  $("exportProgress").onclick=downloadJSON;$("importProgress").onchange=e=>{if(e.target.files[0])importResults(e.target.files[0]);e.target.value=""};
}

async function init(){bind();updateDifficulty(state.difficulty);await refreshFiles();if("serviceWorker" in navigator)navigator.serviceWorker.register("./sw.js").catch(()=>{})}
init();
