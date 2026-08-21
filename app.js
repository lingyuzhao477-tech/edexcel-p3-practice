const decodeStarts = value => value ? value.split(" ").map(item => {
  const [page, difficulty] = item.split(":").map(Number);
  return {page, difficulty};
}) : [];

const chapters = [
  {id:"function",icon:"F",zh:"函数",en:"Functions",q:39,a:51,color:"#dcefe8",tokens:["ch2function"],qIndex:decodeStarts("2:1 3:6 5:8 7:7 8:1 10:4 11:3 12:10 13:3 14:3 16:5 18:2 21:3 22:4 23:6 24:2 25:2 26:1 27:4 28:4 29:2 30:1 31:4 32:5 33:6 34:6 39:1"),aIndex:[]},
  {id:"modulus",icon:"|x|",zh:"模函数",en:"Modulus Function",q:51,a:54,color:"#eee5f5",tokens:["ch2modulus"],qIndex:decodeStarts("2:6 3:3 4:6 7:4 10:5 11:10 16:9 17:4 25:6 45:7 46:8"),aIndex:decodeStarts("2:6 3:3 6:7 8:1 9:1 13:1 15:4 20:2 22:6 25:1 28:2 29:1 30:1 31:2 33:2 35:1 37:1 38:6 39:1 43:1 44:10 45:3 48:1 49:8 50:1 51:1 53:1")},
  {id:"trigonometry2",icon:"θ",zh:"三角函数 2",en:"Trigonometry 2",q:36,a:33,color:"#fee7d6",tokens:["trigonometry2"],qIndex:decodeStarts("7:10 8:1 10:10 13:6 15:1 16:1 17:7 18:1 22:7 23:9 24:8 26:2 27:4 29:5 33:8 35:4"),aIndex:decodeStarts("2:1 5:5 6:1 7:1 8:10 10:1 12:6 13:1 14:1 19:1 20:1 22:9 23:1 24:7 26:1 27:2 29:5 30:1")},
  {id:"trig-proof",icon:"≡",zh:"三角方程与证明",en:"Equations & Proof",q:41,a:70,color:"#e0eafa",tokens:["equation&proof","equationproof"],qIndex:[],aIndex:decodeStarts("3:1 13:2 15:7 20:1 22:1 23:2 24:3 26:5 27:3 31:2 33:1 34:2 35:1 38:7 40:1 51:4 52:10 55:1 56:3 59:4 61:5 63:1 65:1 67:1")},
  {id:"exponential",icon:"eˣ",zh:"指数与对数",en:"Exponential & Logarithm",q:75,a:77,color:"#f6e4e7",tokens:["exponential","logarithm"],qIndex:decodeStarts("2:8 4:10 6:4 9:6 10:6 13:10 16:3 17:9 19:2 20:5 26:2 27:1 28:3 29:2 30:5 31:8 32:5 34:8 38:7 39:4 41:8 45:10 47:2 49:7 51:4 53:6 55:3 57:5 59:3 61:4 62:2 63:5 65:4 68:6 72:3 74:5"),aIndex:decodeStarts("10:10 20:10 21:5 22:2 31:3 32:1 33:3 35:10 39:1 40:3 41:1 42:4 45:8 46:1 48:1 53:2 56:4 57:3 58:1 60:10 62:4 64:3 67:4 69:3 72:10 74:1")},
  {id:"differentiation",icon:"dy",zh:"微分",en:"Differentiation",q:77,a:105,color:"#e1eef0",tokens:["differentiation"],qIndex:decodeStarts("2:5 3:7 4:2 5:3 6:5 8:1 9:3 10:10 11:1 14:4 15:6 16:8 19:7 22:7 23:1 25:4 28:8 29:10 30:7 31:1 32:6 33:8 34:1 37:1 42:3 43:4 44:6 45:7 46:3 51:5 54:10 60:2 63:3 68:3 72:3 75:4 76:4 77:7"),aIndex:[]},
  {id:"integration",icon:"∫",zh:"积分",en:"Integration",q:40,a:53,color:"#f3ead7",tokens:["integration"],qIndex:decodeStarts("2:4 3:3 4:4 5:5 6:5 7:9 8:8 9:5 10:9 12:1 13:9 14:3 16:5 19:3 20:3 21:1 23:4 24:8 25:9 27:3 28:7 30:2 35:4 38:3 39:1 40:6"),aIndex:decodeStarts("4:4 5:4 6:5 8:2 11:8 13:5 15:4 17:1 22:4 27:2 29:1 31:7 36:3 37:1 38:3 40:3 41:4 42:8 43:1 45:1 46:1 50:1")},
  {id:"iteration",icon:"xₙ",zh:"迭代",en:"Iteration",q:52,a:55,color:"#e4ecd8",tokens:["iteration"],qIndex:decodeStarts("2:2 3:1 5:1 8:5 9:10 11:2 13:1 14:3 15:3 19:1 20:4 21:1 25:6 27:6 29:1 40:1 41:1 42:2 47:1 50:2"),aIndex:decodeStarts("5:1 6:1 7:2 8:5 10:3 13:3 16:3 17:4 18:3 25:3 26:7 27:1 28:1 30:2 32:4 34:1 37:6 38:10 39:1 41:1 42:1 43:1 45:1 46:5 47:10 49:9 50:1 51:6 52:6")}
];

const $ = id => document.getElementById(id);
const state = {active:"function",difficulty:5,view:"question",questionPage:2,answerPage:2,current:null,files:{},urls:{question:"",answer:""},results:readJSON("p3-results",[])};

function readJSON(key,fallback){try{return JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback))}catch{return fallback}}
function normalise(name){return name.toLowerCase().replace(/\s+/g,"").replace(/[^a-z0-9&\u4e00-\u9fff]/g,"")}
function classify(name){const clean=normalise(name),chapter=chapters.find(c=>c.tokens.some(t=>clean.includes(t)));return chapter?{chapter:chapter.id,kind:clean.includes("答案")?"answer":"question"}:null}
function activeChapter(){return chapters.find(c=>c.id===state.active)}
function notify(text){$("noticeText").textContent=text;$("notice").classList.remove("hidden")}

function openDB(){return new Promise((resolve,reject)=>{const request=indexedDB.open("edexcel-p3-ipad",1);request.onupgradeneeded=()=>request.result.createObjectStore("files",{keyPath:"key"});request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error)})}
async function getAllFiles(){const db=await openDB();return new Promise((resolve,reject)=>{const r=db.transaction("files").objectStore("files").getAll();r.onsuccess=()=>{db.close();resolve(r.result)};r.onerror=()=>reject(r.error)})}
async function putFiles(items){const db=await openDB();return new Promise((resolve,reject)=>{const tx=db.transaction("files","readwrite"),store=tx.objectStore("files");items.forEach(i=>store.put(i));tx.oncomplete=()=>{db.close();resolve()};tx.onerror=()=>reject(tx.error)})}
async function deleteChapter(id){const db=await openDB();return new Promise((resolve,reject)=>{const tx=db.transaction("files","readwrite"),store=tx.objectStore("files");store.delete(`${id}:question`);store.delete(`${id}:answer`);tx.oncomplete=()=>{db.close();resolve()};tx.onerror=()=>reject(tx.error)})}

async function zipEntries(file){
  const tailSize=Math.min(file.size,65557),tailBytes=new Uint8Array(await file.slice(file.size-tailSize).arrayBuffer()),tailView=new DataView(tailBytes.buffer);let end=-1;
  for(let i=tailBytes.length-22;i>=0;i--){if(tailView.getUint32(i,true)===0x06054b50){end=i;break}}
  if(end<0)throw new Error("无法读取 ZIP，请先在“文件”中解压后选择 PDF");
  const count=tailView.getUint16(end+10,true),centralSize=tailView.getUint32(end+12,true),centralOffset=tailView.getUint32(end+16,true),bytes=new Uint8Array(await file.slice(centralOffset,centralOffset+centralSize).arrayBuffer()),view=new DataView(bytes.buffer),decoder=new TextDecoder("utf-8"),entries=[];let p=0;
  for(let i=0;i<count&&p+46<=bytes.length;i++){
    if(view.getUint32(p,true)!==0x02014b50)break;
    const flags=view.getUint16(p+8,true),method=view.getUint16(p+10,true),compressedSize=view.getUint32(p+20,true),uncompressedSize=view.getUint32(p+24,true),nameLen=view.getUint16(p+28,true),extraLen=view.getUint16(p+30,true),commentLen=view.getUint16(p+32,true),localOffset=view.getUint32(p+42,true),name=decoder.decode(bytes.slice(p+46,p+46+nameLen));p+=46+nameLen+extraLen+commentLen;
    if((flags&1)||!name.toLowerCase().endsWith(".pdf")||name.includes("__MACOSX")||name.includes("/._"))continue;
    entries.push({name:name.split("/").pop(),method,compressedSize,uncompressedSize,localOffset});
  }
  return entries;
}

async function extractZipEntry(file,entry){
  const headerBytes=new Uint8Array(await file.slice(entry.localOffset,entry.localOffset+30).arrayBuffer()),header=new DataView(headerBytes.buffer);if(header.getUint32(0,true)!==0x04034b50)throw new Error(`无法读取 ${entry.name}`);
  const nameLen=header.getUint16(26,true),extraLen=header.getUint16(28,true),start=entry.localOffset+30+nameLen+extraLen,compressed=file.slice(start,start+entry.compressedSize);let blob;
  if(entry.method===0)blob=compressed;else if(entry.method===8&&"DecompressionStream" in window){blob=await new Response(compressed.stream().pipeThrough(new DecompressionStream("deflate-raw"))).blob()}else throw new Error("此 iPad 无法直接解压，请先在“文件”中解压 ZIP，再选择其中的 PDF");
  return blob.slice(0,blob.size,"application/pdf");
}

async function pdfHealth(blob){if(blob.size<8)return false;const head=new TextDecoder("latin1").decode(await blob.slice(0,5).arrayBuffer()),tail=new TextDecoder("latin1").decode(await blob.slice(Math.max(0,blob.size-2048)).arrayBuffer());return head==="%PDF-"&&tail.includes("%%EOF")}
async function storePdf(name,blob){const match=classify(name);if(!match)return false;const healthy=await pdfHealth(blob);await putFiles([{key:`${match.chapter}:${match.kind}`,chapter:match.chapter,kind:match.kind,name,size:blob.size,blob,healthy,updatedAt:Date.now()}]);return {healthy}}

async function importFiles(fileList){
  const selected=[...fileList];if(!selected.length)return;let imported=0,skipped=0,warnings=0;
  try{
    for(const file of selected){
      if(file.name.toLowerCase().endsWith(".zip")){
        const entries=await zipEntries(file);
        for(let i=0;i<entries.length;i++){const entry=entries[i];if(!classify(entry.name)){skipped++;continue}notify(`正在导入 ${entry.name}（${i+1}/${entries.length}）…`);const result=await storePdf(entry.name,await extractZipEntry(file,entry));if(result){imported++;if(!result.healthy)warnings++}}
      }else if(file.name.toLowerCase().endsWith(".pdf")){notify(`正在导入 ${file.name}…`);const result=await storePdf(file.name,file);if(result){imported++;if(!result.healthy)warnings++}else skipped++}
    }
    if(!imported)throw new Error("没有识别到文件，请保留原来的章节文件名");await refreshFiles();notify(`已导入 ${imported} 份 PDF${skipped?`，${skipped} 份未识别`:""}${warnings?`；${warnings} 份文件可能需要重新导出`:""}`);
  }catch(error){notify(error.message||"导入失败，请解压后选择 PDF")}
}

function answerAlignment(chapter){
  const q=chapter.qIndex,a=chapter.aIndex,n=q.length,m=a.length,dp=Array.from({length:n+1},()=>new Uint16Array(m+1));
  for(let i=n-1;i>=0;i--)for(let j=m-1;j>=0;j--)dp[i][j]=q[i].difficulty===a[j].difficulty?dp[i+1][j+1]+1:Math.max(dp[i+1][j],dp[i][j+1]);
  const map=new Map();let i=0,j=0;while(i<n&&j<m){if(q[i].difficulty===a[j].difficulty&&dp[i][j]===dp[i+1][j+1]+1){map.set(i,a[j].page);i++;j++}else if(dp[i+1][j]>=dp[i][j+1])i++;else j++}return map;
}

function approximatePage(total,difficulty){const start=2,usable=Math.max(1,total-start),band=usable/10,low=Math.floor(start+(difficulty-1)*band),high=Math.max(low,Math.floor(start+difficulty*band-1));return low+Math.floor(Math.random()*(high-low+1))}
function chooseQuestion(){
  const c=activeChapter(),candidates=c.qIndex.map((item,index)=>({...item,index})).filter(item=>item.difficulty===state.difficulty);let chosen,exactQuestion=false;
  if(candidates.length){chosen=candidates[Math.floor(Math.random()*candidates.length)];exactQuestion=true}else chosen={page:approximatePage(c.q,state.difficulty),difficulty:state.difficulty,index:-1};
  const matches=answerAlignment(c),matchedAnswer=chosen.index>=0?matches.get(chosen.index):undefined,answerPage=matchedAnswer||Math.max(2,Math.min(c.a,Math.round((chosen.page/Math.max(1,c.q))*c.a)));
  state.current={chapter:c.id,difficulty:chosen.difficulty,qPage:chosen.page,aPage:answerPage,exactQuestion,exactAnswer:Boolean(matchedAnswer)};state.questionPage=chosen.page;state.answerPage=answerPage;state.view="question";renderTabs();renderQuestionMeta();loadPdf();
}

async function refreshFiles(){const rows=await getAllFiles();state.files={};rows.forEach(r=>{state.files[r.key]=r});renderNav();renderLibrary();renderStats();renderCurrent()}
function renderNav(){$("chapterNav").innerHTML=chapters.map(c=>{const ready=state.files[`${c.id}:question`]&&state.files[`${c.id}:answer`];return `<button class="chapter-btn ${state.active===c.id?"active":""}" data-chapter="${c.id}"><span class="icon" style="background:${c.color}">${c.icon}</span><span><b>${c.zh}</b><small>${c.en}</small></span><span class="ready">${ready?"✓":""}</span></button>`}).join("");document.querySelectorAll("[data-chapter]").forEach(btn=>btn.onclick=()=>selectChapter(btn.dataset.chapter))}
function renderCurrent(){const c=activeChapter();$("largeIcon").textContent=c.icon;$("largeIcon").style.background=c.color;$("chapterZh").textContent=c.zh;$("chapterEn").textContent=c.en;const ready=state.files[`${c.id}:question`];$("emptyState").classList.toggle("hidden",!!ready);$("viewer").classList.toggle("hidden",!ready);if(ready){if(!state.current||state.current.chapter!==c.id)chooseQuestion();else{renderQuestionMeta();loadPdf()}}}
function renderStats(){const done=state.results.length,correct=state.results.filter(r=>r.correct).length,matched=chapters.filter(c=>state.files[`${c.id}:question`]&&state.files[`${c.id}:answer`]).length;$("doneCount").textContent=done;$("accuracy").textContent=done?`${Math.round(correct/done*100)}%`:"0%";$("accuracyDetail").textContent=done?`${correct}/${done}`:"开始后统计";$("matchCount").textContent=matched;$("matchProgress").style.width=`${matched/8*100}%`}
function renderLibrary(){$("libraryList").innerHTML=chapters.map(c=>{const q=state.files[`${c.id}:question`],a=state.files[`${c.id}:answer`];if(!q&&!a)return"";const size=((q?.size||0)+(a?.size||0))/1024/1024,warning=(q&&q.healthy===false)||(a&&a.healthy===false);return `<div class="library-item"><span><b>${c.zh}${warning?` <em>需检查</em>`:""}</b><small>${q?"题目 ✓":"题目缺失"} · ${a?"答案 ✓":"答案缺失"} · ${size.toFixed(0)} MB</small></span><button data-delete="${c.id}" type="button">移除缓存</button></div>`}).join("")||`<div class="dialog-tip">还没有缓存章节。</div>`;document.querySelectorAll("[data-delete]").forEach(btn=>btn.onclick=async()=>{await deleteChapter(btn.dataset.delete);state.current=null;await refreshFiles();notify("章节缓存已移除，学习记录仍保留")})}
function renderQuestionMeta(){if(!state.current){$("questionMeta").textContent="等待抽题";return}const qText=state.current.exactQuestion?`识别题号 ${state.current.difficulty}`:`难度 ${state.current.difficulty} · 页段抽取`,aText=state.current.exactAnswer?"答案已自动匹配":"答案页为估算";$("questionMeta").textContent=`${qText} · ${aText}`;$("questionMeta").classList.toggle("estimated",!state.current.exactAnswer)}

function selectChapter(id){state.active=id;state.current=null;state.view="question";renderNav();renderTabs();renderCurrent()}
function maxPage(){const c=activeChapter();return state.view==="question"?c.q:c.a}
function currentPage(){return state.view==="question"?state.questionPage:state.answerPage}
function setPage(value){const page=Math.max(1,Math.min(maxPage(),Number(value)||1));if(state.view==="question")state.questionPage=page;else state.answerPage=page;loadPdf()}
function loadPdf(){const row=state.files[`${state.active}:${state.view}`];if(!row){$("pdfFrame").src="about:blank";notify(state.view==="answer"?"这个章节还没有导入答案":"这个章节还没有导入题目");return}if(state.urls[state.view])URL.revokeObjectURL(state.urls[state.view]);state.urls[state.view]=URL.createObjectURL(row.blob);$("pageInput").value=currentPage();$("pdfFrame").src=`${state.urls[state.view]}#page=${currentPage()}&view=FitH`}
function renderTabs(){document.querySelectorAll("[data-view]").forEach(btn=>btn.classList.toggle("active",btn.dataset.view===state.view))}
function updateDifficulty(value){state.difficulty=Number(value);$("difficultyValue").textContent=value;$("difficultyLabel").textContent=value<=3?"基础":value<=7?"进阶":"挑战"}
function record(correct){state.results.push({chapter:state.active,difficulty:state.current?.difficulty||state.difficulty,page:state.questionPage,correct,at:Date.now()});localStorage.setItem("p3-results",JSON.stringify(state.results));renderStats();notify(correct?"已记录：已经掌握":"已加入重做记录")}

function downloadJSON(){const payload={version:2,exportedAt:new Date().toISOString(),results:state.results},url=URL.createObjectURL(new Blob([JSON.stringify(payload,null,2)],{type:"application/json"})),a=document.createElement("a");a.href=url;a.download=`P3学习记录-${new Date().toISOString().slice(0,10)}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
async function importResults(file){try{const data=JSON.parse(await file.text());if(!Array.isArray(data.results))throw new Error();state.results=data.results;localStorage.setItem("p3-results",JSON.stringify(state.results));renderStats();notify("学习记录导入成功")}catch{notify("学习记录文件无法识别")}}

function bind(){
  [$("headerImport"),$("emptyImport")].forEach(btn=>btn.onclick=()=>$("managerDialog").showModal());$("openManager").onclick=()=>$("managerDialog").showModal();$("closeNotice").onclick=()=>$("notice").classList.add("hidden");
  $("fileInput").onchange=e=>{importFiles(e.target.files);e.target.value=""};const zone=$("dropZone");["dragenter","dragover"].forEach(n=>zone.addEventListener(n,e=>{e.preventDefault();zone.classList.add("drag")}));["dragleave","drop"].forEach(n=>zone.addEventListener(n,e=>{e.preventDefault();zone.classList.remove("drag")}));zone.addEventListener("drop",e=>importFiles(e.dataTransfer.files));
  $("difficulty").oninput=e=>updateDifficulty(e.target.value);$("randomQuestion").onclick=chooseQuestion;document.querySelectorAll("[data-view]").forEach(btn=>btn.onclick=()=>{state.view=btn.dataset.view;if(state.view==="answer"&&state.current)state.answerPage=state.current.aPage;renderTabs();loadPdf()});
  $("prevPage").onclick=()=>setPage(currentPage()-1);$("nextPage").onclick=()=>setPage(currentPage()+1);$("pageInput").onchange=e=>setPage(e.target.value);$("retry").onclick=()=>record(false);$("mastered").onclick=()=>record(true);$("exportProgress").onclick=downloadJSON;$("importProgress").onchange=e=>{if(e.target.files[0])importResults(e.target.files[0]);e.target.value=""};
}

async function init(){bind();updateDifficulty(state.difficulty);await refreshFiles();if("serviceWorker" in navigator)navigator.serviceWorker.register("./sw.js").catch(()=>{})}
init();
