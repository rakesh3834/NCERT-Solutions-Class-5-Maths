const fs=require('fs'),vm=require('vm'),assert=require('assert');
const root=__dirname+'/chapters/class-4-science/',context={console,window:{}};vm.createContext(context);
for(const f of ['content.js','learning.js','games.js','science-games.js','doodles.js'])vm.runInContext(fs.readFileSync(root+f,'utf8').replace('window.SAFARI={};','var SAFARI=window.SAFARI={};'),context);
const S=context.SAFARI,api={stage(){},render(){},tell(){},complete(){},animate(t,f,end){f(1);end()}};
function solve(g){const a=(k,v='')=>g.action(k,String(v));if(g.drawingGame){if(g.id==='dye-pen')a('pigment',g.q.source);for(const p of g.q.paths){g.pointer(...p[0],'start');for(let i=1;i<p.length;i++)for(let j=1;j<=12;j++)g.pointer(p[i-1][0]+(p[i][0]-p[i-1][0])*j/12,p[i-1][1]+(p[i][1]-p[i-1][1])*j/12,'move');g.pointer(...p.at(-1),'end')}a('check');return}if(g.q.steps){g.q.steps.forEach((s,i)=>a('sequence',i));return}if(g.q.needed){g.q.needed.forEach(v=>a('item',v));a('check');return}
switch(g.id){
case 'helpers':g.q.tasks.forEach(v=>a('service',v));break;
case 'team':g.q.jobs.forEach((v,i)=>{a('job',i);a('team',v[1])});break;
case 'park':g.q.things.forEach((v,i)=>{a('thing',i);a('care',v[1])});break;
case 'journey':{a('transport',g.q.trip[1]);const queue=[[0,[]]],seen=new Set([0]);while(queue.length){const[p,m]=queue.shift();if(p===g.q.target){m.forEach(d=>a('move',d));break}for(const d of [-1,1,-5,5]){const n=p+d;if(n<0||n>24||Math.abs(d)===1&&Math.floor(n/5)!==Math.floor(p/5)||g.q.closed.includes(n)||seen.has(n))continue;seen.add(n);queue.push([n,[...m,d]])}}break}
case 'messages':case 'observe':g.q.items.forEach(v=>a('sort',v[1]));break;
case 'savings':a('buy');for(let n=0;n<g.q.goal;n+=10)a('save');a('check');break;
case 'web':g.q.links.forEach((v,i)=>{a('source',i);a('link',v[1])});break;
case 'village':for(let i=0;i<g.q.wall;i++)a('wall');a('roof');if(!g.q.rain)a('roof');a('check');break;
case 'solar':for(let i=0;i<g.q.sun;i++)a('step',1);a('shade');a('check');break;
case 'plate':for(const group of ['Energy','Growth','Protective','Water'])a('food',g.q.foods.findIndex(f=>f[1]===group));a('check');break;
case 'cooking':a('method',g.q.recipe[1]);a('check');break;
case 'tastes':g.q.cards.forEach(v=>a('taste',v[1]));break;
case 'feelings':a('support',g.q.story[2]);break;
case 'spinner':while(g.s.offset)a('pivot',g.s.offset<0?1:-1);a('spin');a('check');break;
case 'float':a('predict',g.q.object[1]==='float'?'sink':'float');a('test');a('observe',g.q.object[1]);break;
case 'boats':a('shape');a('shape');a('load');a('test');a('check');break;
case 'paper-test':g.q.order.forEach(v=>a('test',v));a('choose',g.q.task[1]);break;
case 'rs':g.q.cases.forEach(v=>a('r',v[1]));break;
case 'lands':while(['Mountains','Plains','Desert','Coast'][g.s.index]!==g.q.target)a('land',1);a('check');break;
case 'culture':g.q.items.forEach(v=>a('region',v[1]));break;
case 'shadows':while(g.s.value!==g.q.target)a('light',g.s.value<g.q.target?1:-1);a('check');break;
case 'moon':while(g.s.phase!==g.q.target)a('phase',1);a('check');break;
case 'sky':while(g.s.side!==g.q.target)a('turn');a('check');break;
default:throw Error('No solver '+g.id)}}
function run(){assert.equal(S.topics.length,40);assert.equal(S.worlds.length,10);let passed=0;const failures=[],variations=[];for(const t of S.topics){assert.equal(S.lessons[t.id].faqs.length,3);const scenes=new Set();for(const round of [0,7,8,15,16,23,24,47])for(let seed=1;seed<=5;seed++){const g=S.games.create(t.id,round,seed*7919,api);scenes.add(g.visualKey);try{assert(!/undefined|NaN/.test(g.draw()+g.controls()));if(g.drawingGame){g.pointer(2,2,'start');g.pointer(4,4,'end');assert.equal(g.s.paths.length,0);g.action('check','');assert(!g.done)}solve(g);assert(g.done,'Not completed');assert(!/undefined|NaN/.test(g.draw()));passed++}catch(e){failures.push({id:t.id,round,seed,error:e.message})}}variations.push([t.id,scenes.size]);if(scenes.size<4)failures.push({id:t.id,error:'Too few distinct starting scenes: '+scenes.size})}console.log(JSON.stringify({passed,variations,failures},null,2));if(failures.length)process.exitCode=1}
if(require.main===module)run();module.exports={solve};
