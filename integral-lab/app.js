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
{id:27,paper:'P3',topic:'换元积分',level:3,q:'求 ∫x cos(x²+1) dx',hint:'括号 x²+1 的导数含有 2x。',steps:['令 u=x²+1，du=2x dx','原式=½∫cosu du','代回并加 C。'],answer:'(1/2)sin(x²+1) + C'},
{id:28,paper:'P4',topic:'代换积分',level:2,q:'求 ∫x√(x²+5) dx',hint:'令 u=x²+5。',steps:['u=x²+5，du=2x dx','原式=½∫u¹ᐟ²du','积分后把 u 代回。'],answer:'(1/3)(x²+5)³ᐟ² + C'},
{id:29,paper:'P4',topic:'代换积分',level:2,q:'求 ∫sin x/(2+cos x)² dx',hint:'分母内 2+cosx 的导数是 −sinx。',steps:['令 u=2+cosx，du=−sinx dx','原式=−∫u⁻²du','积分并代回。'],answer:'1/(2+cos x) + C'},
{id:30,paper:'P4',topic:'代换积分',level:3,q:'求 ∫sec²x√(1+tan x) dx',hint:'令 u=1+tanx。',steps:['du=sec²x dx','原式=∫u¹ᐟ²du','积分后代回。'],answer:'(2/3)(1+tan x)³ᐟ² + C'},
{id:31,paper:'P4',topic:'代换积分',level:3,q:'计算 ∫₀¹ 6x²e^(2x³) dx',hint:'指数 2x³ 的导数为 6x²。',steps:['令 u=2x³，du=6x²dx','新上下限：x=0→u=0，x=1→u=2','计算 ∫₀²eᵘdu。'],answer:'e²−1'},
{id:32,paper:'P4',topic:'代换积分',level:3,q:'求 ∫1/[x(1+ln x)³] dx，x>0',hint:'令 u=1+lnx，则 du=dx/x。',steps:['原式变为 ∫u⁻³du','积分得 −½u⁻²+C','把 u 代回。'],answer:'−1/[2(1+ln x)²] + C'},
{id:33,paper:'P4',topic:'分部积分',level:2,q:'求 ∫x cos(2x) dx',hint:'令 u=x，dv=cos(2x)dx。',steps:['du=dx，v=½sin(2x)','使用 ∫u dv=uv−∫v du','再积分 sin(2x)。'],answer:'(x/2)sin(2x) + (1/4)cos(2x) + C'},
{id:34,paper:'P4',topic:'分部积分',level:2,q:'求 ∫x e^(3x) dx',hint:'令 u=x，dv=e^(3x)dx。',steps:['du=dx，v=(1/3)e^(3x)','原式=(x/3)e^(3x)−(1/3)∫e^(3x)dx','整理并加 C。'],answer:'e^(3x)(x/3−1/9) + C'},
{id:35,paper:'P4',topic:'分部积分',level:3,q:'求 ∫x² sin x dx',hint:'需要连续使用两次分部积分。',steps:['第一次令 u=x²，dv=sinx dx','得 −x²cosx+∫2xcosx dx','对 ∫2xcosx dx 再分部积分。'],answer:'−x²cos x + 2x sin x + 2cos x + C'},
{id:36,paper:'P4',topic:'分部积分',level:3,q:'求 ∫eˣcos x dx',hint:'分部积分两次后，原积分会再次出现。',steps:['设 I=∫eˣcosx dx','分部积分两次得到 I=eˣcosx+eˣsinx−I','移项得 2I=eˣ(cosx+sinx)。'],answer:'(1/2)eˣ(sin x+cos x) + C'},
{id:37,paper:'P4',topic:'分部积分',level:3,q:'计算 ∫₁ᵉ ln x dx',hint:'把 ln x 看成 ln x·1，然后分部积分。',steps:['令 u=lnx，dv=dx','得到 xlnx−x','代入 e 和 1。'],answer:'1'},
{id:38,paper:'P4',topic:'部分分式',level:2,q:'求 ∫(3x+7)/[(x+1)(x+2)] dx',hint:'先设为 A/(x+1)+B/(x+2)。',steps:['3x+7=A(x+2)+B(x+1)','比较系数得 A=4，B=−1','分别积分两个一次分式。'],answer:'4ln|x+1|−ln|x+2| + C'},
{id:39,paper:'P4',topic:'部分分式',level:3,q:'求 ∫(2x+5)/[(x−1)(x+2)] dx',hint:'设 A/(x−1)+B/(x+2)。',steps:['2x+5=A(x+2)+B(x−1)','令 x=1 得 A=7/3；令 x=−2 得 B=−1/3','逐项积分。'],answer:'(7/3)ln|x−1|−(1/3)ln|x+2| + C'},
{id:40,paper:'P4',topic:'部分分式',level:3,q:'求 ∫(5x+1)/[x(x+1)²] dx',hint:'重复因式需要写成 A/x+B/(x+1)+C/(x+1)²。',steps:['比较系数得到 A=1，B=−1，C=4','积分 1/x 与 −1/(x+1)','∫4/(x+1)²dx=−4/(x+1)。'],answer:'ln|x|−ln|x+1|−4/(x+1) + C'},
{id:41,paper:'P4',topic:'部分分式',level:3,q:'求 ∫(x²+4x+1)/(x²−1) dx',hint:'这是非真分式，先做多项式除法。',steps:['原式=1+(4x+2)/(x²−1)','把 (4x+2)/[(x−1)(x+1)] 拆分','得到 1+3/(x−1)+1/(x+1)。'],answer:'x+3ln|x−1|+ln|x+1| + C'},
{id:42,paper:'P4',topic:'部分分式',level:3,q:'计算 ∫₀¹ 1/[(x+1)(x+2)] dx',hint:'拆成 1/(x+1)−1/(x+2)。',steps:['原函数为 ln(x+1)−ln(x+2)','代入 1 得 ln2−ln3','减去代入 0 的 ln1−ln2。'],answer:'ln(4/3)'}
];

// Extra practice generated from the methods covered by the uploaded P3/P4 pages.
// The wording and numerical values are original so the public site does not republish textbook pages.
let extraId=43;
const add=(paper,topic,level,q,hint,steps,answer)=>BANK.push({id:extraId++,paper,topic,level,q,hint,steps,answer});

[[5,3,2],[7,-4,5],[3,6,-1],[8,-5,4]].forEach(([a,b,c],i)=>add('P3','基础积分',i<2?1:2,
  `求 ∫(${a}x² ${b<0?'−':'+'} ${Math.abs(b)}x ${c<0?'−':'+'} ${Math.abs(c)}) dx`,
  '逐项使用幂函数积分法，幂次加 1 后除以新幂次。',
  [`∫${a}x²dx=(${a}/3)x³`,`∫${b}x dx=(${b}/2)x²`,`常数项积分为 ${c}x`,'合并并加 C。'],
  `(${a}/3)x³ + (${b}/2)x² + ${c}x + C`));

[[2,4,3],[3,2,4],[4,5,2],[5,1,3]].forEach(([a,b,n])=>add('P3','换元积分',2,
  `求 ∫${a}x(x²+${b})^${n} dx`,'令 u=x²+常数，把 x dx 换成 du/2。',
  [`令 u=x²+${b}，du=2x dx`,`原式=(${a}/2)∫u^${n}du`,'使用幂函数积分法后代回。'],
  `${a}/[${2*(n+1)}](x²+${b})^${n+1} + C`));

[[2,1,3],[3,2,2],[4,-1,2],[5,3,1]].forEach(([m,c,u])=>add('P3','定积分',2,
  `计算 ∫₀^${u} (${m}x+${c}) dx`,'先求原函数，再计算 F(上限)−F(0)。',
  [`原函数为 ${m/2}x²+${c}x`,`代入 x=${u}`,'减去 x=0 时的值。'],
  String(m*u*u/2+c*u)));

[3,5,6,8].forEach((a,i)=>add('P3','面积',i<2?2:3,
  `求曲线 y=x²−${a}x 与 x 轴围成的有限区域面积。`,'先解 x(x−a)=0；两根之间曲线在 x 轴下方。',
  [`交点为 x=0 和 x=${a}`,`面积=−∫₀^${a}(x²−${a}x)dx`,'求原函数并取正值。'],
  `${a**3}/6`));

[['sin',4,'−(1/4)cos(4x) + C'],['sin',7,'−(1/7)cos(7x) + C'],['cos',2,'(1/2)sin(2x) + C'],['cos',5,'(1/5)sin(5x) + C'],['sec²',3,'(1/3)tan(3x) + C']].forEach(([f,k,ans])=>add('P3','三角函数积分',2,
  `求 ∫${f}(${k}x) dx`,'先识别基本三角函数的原函数，再补偿括号内导数。',
  [`令 u=${k}x，dx=du/${k}`,'对基本三角函数积分','代回 u 并加 C。'],ans));

[["sin²",2,'x/2−sin(4x)/8+C'],["sin²",3,'x/2−sin(6x)/12+C'],["cos²",2,'x/2+sin(4x)/8+C'],["cos²",4,'x/2+sin(8x)/16+C'],["sin³",1,'−cosx+cos³x/3+C']].forEach(([f,k,ans])=>add('P3','三角恒等式',3,
  `求 ∫${f}(${k}x) dx`,'平方使用半角公式；奇次幂保留一个因子后换元。',
  ['先选择合适的三角恒等式','把被积函数化成可直接积分的形式','逐项积分并整理。'],ans));

[[2,3],[3,4],[4,5],[5,2]].forEach(([a,b])=>add('P3','反向链式法则',2,
  `求 ∫${a}/(${a}x+${b}) dx`,'分子与分母的导数相同，结果是对数。',
  [`令 u=${a}x+${b}，du=${a}dx`,'原式变成 ∫1/u du','代回并加 C。'],
  `ln|${a}x+${b}| + C`));

[[2,2],[3,2],[4,3],[5,2]].forEach(([a,k])=>add('P4','分部积分',2,
  `求 ∫x e^(${a}x) dx`,'令 u=x，dv=e^(ax)dx。',
  [`u=x，du=dx；v=e^(${a}x)/${a}`,'代入 ∫u dv=uv−∫v du','整理并加 C。'],
  `e^(${a}x)(x/${a}−1/${a*a}) + C`));
[[2,'cos'],[3,'cos'],[2,'sin'],[4,'sin']].forEach(([a,f])=>add('P4','分部积分',3,
  `求 ∫x ${f}(${a}x) dx`,'令 u=x，另一部分作为 dv。',
  ['先求出 v','应用分部积分公式','对剩余的基本三角函数积分。'],
  f==='cos'?`(x/${a})sin(${a}x)+cos(${a}x)/${a*a}+C`:`−(x/${a})cos(${a}x)+sin(${a}x)/${a*a}+C`));

[[2,'sin²','x/2−sin(4x)/8+C'],[3,'cos²','x/2+sin(6x)/12+C'],[1,'sin³','−cosx+cos³x/3+C'],[1,'cos³','sinx−sin³x/3+C'],[2,'sec²','tan(2x)/2+C'],[3,'cosec²','−cot(3x)/3+C'],[2,'tan','−ln|cos(2x)|/2+C']].forEach(([k,f,ans])=>add('P4','三角积分',3,
  `求 ∫${f}(${k}x) dx`,'根据平方、奇次幂或基本导数选择恒等式与换元。',
  ['识别函数结构','使用恒等式或令 u 为括号内函数','积分后代回并加 C。'],ans));

[[1,2,2,-1],[2,3,3,1],[1,4,4,-2],[3,5,2,2],[2,5,5,-1],[1,3,3,2],[4,7,2,-3],[3,8,4,1]].forEach(([a,b,A,B])=>{
  const px=A+B, pc=A*b+B*a;
  add('P4','部分分式',3,`求 ∫(${px}x+${pc})/[(x+${a})(x+${b})] dx`,
    `拆成 A/(x+${a})+B/(x+${b})。`,
    ['设两个待定系数','代入使其中一个因式为 0 的 x 值','分别得到两个对数项。'],
    `${A}ln|x+${a}| ${B<0?'−':'+'} ${Math.abs(B)}ln|x+${b}| + C`);
});

[[2,3,2],[3,1,3],[4,2,2],[5,4,3],[2,6,4],[3,5,2],[4,1,3]].forEach(([a,b,n])=>add('P4','代换积分',3,
  `求 ∫${a}x(x²+${b})^${n} dx`,'令 u=x²+b，注意 x dx=du/2。',
  [`u=x²+${b}，du=2x dx`,`原式=(${a}/2)∫u^${n}du`,'积分后代回。'],
  `${a}/[${2*(n+1)}](x²+${b})^${n+1} + C`));

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
