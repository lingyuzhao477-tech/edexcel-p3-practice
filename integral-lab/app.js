const BANK=[
{id:1,paper:'P3',topic:'基础积分',level:1,q:'求 ∫(6x² − 4x + 3) dx',hint:'把每一项分别积分：幂次加 1，再除以新的幂次。',steps:['∫6x² dx = 2x³','∫−4x dx = −2x²','∫3 dx = 3x','不定积分最后加 C。'],answer:'2x³ − 2x² + 3x + C'},
{id:2,paper:'P3',topic:'基础积分',level:2,q:'求 ∫(4√x − 3/x²) dx',hint:'先把根号和分母改写成 x 的幂。',steps:['√x=x¹ᐟ²，1/x²=x⁻²','原式为 ∫(4x¹ᐟ²−3x⁻²)dx','分别使用幂函数积分法','整理并加 C。'],answer:'(8/3)x³ᐟ² + 3/x + C'},
{id:3,paper:'P3',topic:'换元积分',level:2,q:'求 ∫2x(x² + 3)⁵ dx',hint:'括号内 x²+3 的导数正好是 2x。',steps:['令 u=x²+3，则 du=2x dx','原式变为 ∫u⁵du','积分得 u⁶/6+C','把 u 代换回去。'],answer:'(x² + 3)⁶/6 + C'},
{id:4,paper:'P3',topic:'定积分',level:2,q:'计算 ∫₀²(3x² + 1) dx',hint:'先求原函数，再用 F(2)−F(0)。',steps:['原函数为 x³+x','F(2)=2³+2=10','F(0)=0','所以上限减下限等于 10。'],answer:'10'},
{id:5,paper:'P3',topic:'面积',level:3,q:'曲线 y=x²−4x 与 x 轴围成的有限区域面积是多少？',hint:'先解 x²−4x=0 找交点；区间内曲线在 x 轴下方。',steps:['交点为 x=0 和 x=4','面积=−∫₀⁴(x²−4x)dx','原函数为 x³/3−2x²','代入并取正值得 32/3。'],answer:'32/3'},
{id:6,paper:'P4',topic:'分部积分',level:2,q:'求 ∫xeˣ dx',hint:'使用 ∫u dv=uv−∫v du，令 u=x。',steps:['令 u=x，dv=eˣdx','则 du=dx，v=eˣ','原式=xeˣ−∫eˣdx','提取 eˣ 并加 C。'],answer:'eˣ(x − 1) + C'},
{id:7,paper:'P4',topic:'分部积分',level:3,q:'求 ∫x ln x dx',hint:'令 u=ln x，dv=x dx。',steps:['u=ln x，du=1/x dx','dv=x dx，v=x²/2','原式=(x²/2)ln x−½∫x dx','整理并加 C。'],answer:'(x²/2)ln x − x²/4 + C'},
{id:8,paper:'P4',topic:'三角积分',level:2,q:'求 ∫sin(2x) dx',hint:'2x 的导数是 2，所以需要补偿 1/2。',steps:['令 u=2x，则 du=2dx','原式=½∫sin u du','积分为 −½cos u','代回 u=2x。'],answer:'−½cos(2x) + C'},
{id:9,paper:'P4',topic:'三角积分',level:3,q:'求 ∫tan x dx',hint:'把 tan x 写成 sin x/cos x，再令 u=cos x。',steps:['tan x=sin x/cos x','令 u=cos x，du=−sin x dx','原式=−∫1/u du','代回并加 C。'],answer:'−ln|cos x| + C'},
{id:10,paper:'P4',topic:'部分分式',level:3,q:'求 ∫1/(x² − 1) dx',hint:'先把 1/[(x−1)(x+1)] 拆成部分分式。',steps:['拆为 1/[2(x−1)]−1/[2(x+1)]','分别使用 ∫1/x dx=ln|x|','得 ½ln|x−1|−½ln|x+1|+C','最后可合并两个对数。'],answer:'½ln|(x−1)/(x+1)| + C'},
{id:11,paper:'P4',topic:'代换积分',level:3,q:'求 ∫x/√(x² + 4) dx',hint:'令 u=x²+4，分子 x dx 会变成 ½du。',steps:['令 u=x²+4','du=2x dx，所以 x dx=½du','原式=½∫u⁻¹ᐟ²du','积分后代回。'],answer:'√(x² + 4) + C'},
{id:12,paper:'P3',topic:'三角函数积分',level:1,q:'求 ∫sin(5x) dx',hint:'使用 ∫sin(ax)dx=−cos(ax)/a。',steps:['这里 a=5','对 sin(5x) 积分时除以 5','记得加积分常数 C。'],answer:'−(1/5)cos(5x) + C'},
{id:13,paper:'P3',topic:'三角函数积分',level:1,q:'求 ∫cos(3x−2) dx',hint:'括号 3x−2 的导数是 3。',steps:['令 u=3x−2，则 du=3dx','原式=⅓∫cos u du','代回 u 并加 C。'],answer:'(1/3)sin(3x−2) + C'},
{id:14,paper:'P3',topic:'三角函数积分',level:2,q:'求 ∫sec²(4x) dx',hint:'tan(4x) 的导数是 4sec²(4x)。',steps:['使用 ∫sec²u du=tan u','令 u=4x，dx=du/4','代回并加 C。'],answer:'(1/4)tan(4x) + C'},
{id:15,paper:'P3',topic:'三角函数积分',level:2,q:'求 ∫cosec²(2x+1) dx',hint:'cot u 的导数是 −cosec²u。',steps:['令 u=2x+1，dx=du/2','原式=½∫cosec²u du','积分并代回。'],answer:'−(1/2)cot(2x+1) + C'},
{id:16,paper:'P3',topic:'三角恒等式',level:2,q:'求 ∫sin²x dx',hint:'先用 sin²x=(1−cos2x)/2。',steps:['把 sin²x 改写为 ½−½cos2x','分别积分两项','∫cos2x dx=½sin2x。'],answer:'x/2 − (1/4)sin(2x) + C'},
{id:17,paper:'P3',topic:'三角恒等式',level:2,q:'求 ∫cos²(3x) dx',hint:'使用 cos²u=(1+cos2u)/2。',steps:['cos²(3x)=½+½cos(6x)','分别积分','∫cos6x dx=(1/6)sin6x。'],answer:'x/2 + (1/12)sin(6x) + C'},
{id:18,paper:'P3',topic:'三角恒等式',level:3,q:'求 ∫sin(2x)cos(5x) dx',hint:'使用积化和差：sinAcosB=½[sin(A+B)+sin(A−B)]。',steps:['sin2x cos5x=½[sin7x−sin3x]','分别积分两项','注意 ∫−sin3x dx=⅓cos3x。'],answer:'−(1/14)cos(7x) + (1/6)cos(3x) + C'},
{id:19,paper:'P3',topic:'三角恒等式',level:3,q:'求 ∫cos(3x)cos x dx',hint:'使用 cosAcosB=½[cos(A+B)+cos(A−B)]。',steps:['cos3x cosx=½[cos4x+cos2x]','逐项积分','整理系数并加 C。'],answer:'(1/8)sin(4x) + (1/4)sin(2x) + C'},
{id:20,paper:'P3',topic:'反向链式法则',level:2,q:'求 ∫sin x/(3+cos x) dx',hint:'分母 3+cos x 的导数是 −sin x。',steps:['令 u=3+cosx','du=−sinx dx','原式=−∫1/u du','代回并加 C。'],answer:'−ln|3+cos x| + C'},
{id:21,paper:'P3',topic:'反向链式法则',level:2,q:'求 ∫sec²x/(2+tan x) dx',hint:'分母 2+tan x 的导数正好是 sec²x。',steps:['令 u=2+tanx','du=sec²x dx','得到 ∫1/u du','代回并加 C。'],answer:'ln|2+tan x| + C'},
{id:22,paper:'P3',topic:'反向链式法则',level:3,q:'求 ∫6sin(3x)e^(2cos(3x)) dx',hint:'指数 2cos(3x) 的导数是 −6sin(3x)。',steps:['令 u=2cos(3x)','du=−6sin(3x)dx','原式=−∫eᵘdu','代回并加 C。'],answer:'−e^(2cos(3x)) + C'},
{id:23,paper:'P3',topic:'定积分',level:2,q:'计算 ∫₀^(π/6) cos(3x) dx',hint:'角度必须使用弧度；先求原函数。',steps:['原函数为 (1/3)sin(3x)','代入上限得 (1/3)sin(π/2)=1/3','代入下限得 0。'],answer:'1/3'},
{id:24,paper:'P3',topic:'定积分',level:3,q:'计算 ∫₀^(π/4) sec²(2x) dx',hint:'原函数是 ½tan(2x)，但先检查上限处函数是否有定义。',steps:['当 x→π/4 时，tan(2x)→∞','上限 x=π/4 处 cos(2x)=0','这是反常积分，并不收敛。'],answer:'积分发散（不存在有限值）'},
{id:25,paper:'P3',topic:'三角恒等式',level:3,q:'求 ∫sin³x dx',hint:'保留一个 sinx，把 sin²x 换成 1−cos²x。',steps:['sin³x=sinx(1−cos²x)','令 u=cosx，du=−sinx dx','积分 −∫(1−u²)du','代回并加 C。'],answer:'−cos x + (1/3)cos³x + C'},
{id:26,paper:'P3',topic:'三角恒等式',level:3,q:'求 ∫cos³(2x) dx',hint:'写成 cos(2x)[1−sin²(2x)]。',steps:['令 u=sin(2x)，du=2cos(2x)dx','原式=½∫(1−u²)du','积分后代回。'],answer:'(1/2)sin(2x) − (1/6)sin³(2x) + C'},
{id:27,paper:'P3',topic:'换元积分',level:3,q:'求 ∫x cos(x²+1) dx',hint:'括号 x²+1 的导数含有 2x。',steps:['令 u=x²+1，du=2x dx','原式=½∫cosu du','代回并加 C。'],answer:'(1/2)sin(x²+1) + C'}
];
let paper='P3',topic='全部专题',index=0,tool='pen',size=3,drawing=false,history=[];
const $=id=>document.getElementById(id), state=JSON.parse(localStorage.getItem('integral-progress')||'{"done":0,"wrong":[]}');
function topics(){return ['全部专题',...new Set(BANK.filter(x=>x.paper===paper).map(x=>x.topic))]}
function list(){return BANK.filter(x=>x.paper===paper&&(topic==='全部专题'||x.topic===topic))}
function current(){const a=list();return a[index%a.length]}
function saveState(){$('done').textContent=state.done;$('wrong').textContent=state.wrong.length;localStorage.setItem('integral-progress',JSON.stringify(state))}
function renderTopics(){$('topicButtons').innerHTML='';topics().forEach(t=>{const b=document.createElement('button');b.textContent=t;b.className=t===topic?'active':'';b.onclick=()=>{topic=t;index=0;hide();renderTopics();render()};$('topicButtons').appendChild(b)})}
function render(){const q=current(),a=list();$('paperBadge').textContent=q.paper;$('paperBadge').style.cssText=q.paper==='P3'?'':'background:#f0eaff;color:#7a3fd0';$('topicBadge').textContent=q.topic;$('level').textContent='●'.repeat(q.level)+'○'.repeat(3-q.level);$('counter').textContent=`${paper} · ${topic}　第 ${index%a.length+1} / ${a.length} 题`;$('question').textContent=q.q;$('hint').textContent=q.hint;$('steps').innerHTML=q.steps.map(s=>`<li>${s}</li>`).join('');$('finalAnswer').textContent='答案：'+q.answer;clearCanvas()}
function hide(){$('hintBox').classList.add('hidden');$('solution').classList.add('hidden');$('hintBtn').textContent='给我一个提示';$('answerBtn').textContent='检查答案与步骤'}
document.querySelectorAll('.paper-tabs button').forEach(b=>b.onclick=()=>{paper=b.dataset.paper;topic='全部专题';index=0;document.querySelectorAll('.paper-tabs button').forEach(x=>x.classList.remove('active','p3'));b.classList.add('active');if(paper==='P3')b.classList.add('p3');hide();renderTopics();render()});
$('hintBtn').onclick=()=>{const box=$('hintBox'),open=box.classList.toggle('hidden');$('hintBtn').textContent=open?'给我一个提示':'收起提示'};
$('answerBtn').onclick=()=>{const box=$('solution'),open=box.classList.toggle('hidden');$('answerBtn').textContent=open?'检查答案与步骤':'隐藏解析'};
function next(){index=(index+1)%list().length;hide();render()}
$('next').onclick=next;$('random').onclick=()=>{index=Math.floor(Math.random()*list().length);hide();render()};
$('correct').onclick=()=>{state.done++;state.wrong=state.wrong.filter(x=>x!==current().id);saveState();next()};$('incorrect').onclick=()=>{state.done++;if(!state.wrong.includes(current().id))state.wrong.push(current().id);saveState();next()};
const canvas=$('canvas'),wrap=$('canvasWrap'),ctx=canvas.getContext('2d');
function resize(){const old=document.createElement('canvas');old.width=canvas.width;old.height=canvas.height;old.getContext('2d').drawImage(canvas,0,0);const r=devicePixelRatio||1,w=wrap.clientWidth,h=Math.max(480,wrap.clientHeight);canvas.width=w*r;canvas.height=h*r;canvas.style.width=w+'px';canvas.style.height=h+'px';ctx.setTransform(r,0,0,r,0,0);if(old.width)ctx.drawImage(old,0,0,old.width/r,old.height/r)}
function point(e){const r=canvas.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top}}
canvas.onpointerdown=e=>{canvas.setPointerCapture(e.pointerId);history.push(ctx.getImageData(0,0,canvas.width,canvas.height));if(history.length>20)history.shift();drawing=true;const p=point(e);ctx.beginPath();ctx.moveTo(p.x,p.y)};
canvas.onpointermove=e=>{if(!drawing)return;const p=point(e);ctx.lineCap='round';ctx.lineJoin='round';ctx.globalCompositeOperation=tool==='eraser'?'destination-out':'source-over';ctx.strokeStyle='#17233c';ctx.lineWidth=tool==='eraser'?25:size*(e.pressure?.7+e.pressure:1);ctx.lineTo(p.x,p.y);ctx.stroke()};
canvas.onpointerup=canvas.onpointercancel=()=>{drawing=false;ctx.closePath()};
function clearCanvas(){ctx.clearRect(0,0,canvas.width,canvas.height);history=[]}
$('pen').onclick=()=>setTool('pen');$('eraser').onclick=()=>setTool('eraser');function setTool(t){tool=t;$('pen').classList.toggle('active',t==='pen');$('eraser').classList.toggle('active',t==='eraser')}
$('undo').onclick=()=>{const s=history.pop();if(s)ctx.putImageData(s,0,0)};$('clear').onclick=clearCanvas;$('size').oninput=e=>size=+e.target.value;$('save').onclick=()=>{const a=document.createElement('a');a.download=`积分练习-${current().id}.png`;a.href=canvas.toDataURL();a.click()};
addEventListener('resize',resize);resize();renderTopics();render();saveState();
