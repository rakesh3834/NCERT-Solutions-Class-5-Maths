const fs=require('fs'),vm=require('vm'),assert=require('assert');
const root=__dirname+'/chapters/class-4-maths/';
const context={console,window:{}};vm.createContext(context);for(const file of ['content.js','learning.js','games.js','doodles.js']){if(file==='content.js')vm.runInContext(fs.readFileSync(root+file,'utf8').replace('window.SAFARI={};','var SAFARI=window.SAFARI={};'),context);else vm.runInContext(fs.readFileSync(root+file,'utf8'),context)}
const S=context.SAFARI,api={stage(){},render(){},tell(){},complete(){}};
function solve(g){const act=(k,v)=>g.action(k,String(v));if(g.drawingGame){for(const p of g.q.paths){g.pointer(...p[0],'start');for(let i=1;i<p.length;i++)for(let j=1;j<=12;j++)g.pointer(p[i-1][0]+(p[i][0]-p[i-1][0])*j/12,p[i-1][1]+(p[i][1]-p[i-1][1])*j/12,'move');g.pointer(...p.at(-1),'end')}act('check','');return}
switch(g.id){
case 'solid':case 'pattern':case 'fraction-compare':case 'bonds':case 'measure-compare':act('choice',g.q.answer);break;
case 'net':act('flap',g.q.options.findIndex(p=>S.cubeNet([...g.q.stem,p])));act('check','');break;
case 'model':g.q.heights.forEach((h,i)=>{for(let j=0;j<h;j++)act('tower',i)});act('check','');break;
case 'position':act('cell',g.q.target);break;
case 'views':act('view',g.q.answer);break;
case 'treasure':{const queue=[[0,[]]],seen=new Set([0]);while(queue.length){const[p,steps]=queue.shift();if(p===g.q.target){steps.forEach(v=>act('move',v));break}for(const d of [-1,1,-5,5]){const n=p+d;if(n<0||n>24||Math.abs(d)===1&&Math.floor(p/5)!==Math.floor(n/5)||g.q.walls.includes(n)||seen.has(n))continue;seen.add(n);queue.push([n,[...steps,d]])}}break}
case 'pairs':for(let i=0;i<g.q.n-g.q.n%2;i++)act('counter',i);act('choice',g.q.n%2?'odd':'even');break;
case 'place':String(g.q.answer).split('').forEach((d,i)=>{for(let j=0;j<+d;j++)act('digit',i)});act('check','');break;
case 'order':case 'length-sort':case 'wild-order':g.q.order.forEach(v=>act('card',v));break;
case 'line':case 'ruler':case 'time':case 'duration':act('range',g.q.answer);act('check','');break;
case 'fraction':for(let i=0;i<g.q.n;i++)act('part',i);act('check','');break;
case 'share':for(let i=0;i<g.q.people;i++)for(let j=0;j<g.q.each;j++)act('give',i);act('check','');break;
case 'perimeter':for(let i=0;i<4;i++)act('side',i);act('number',g.q.answer);act('check','');break;
case 'market':for(let v=g.q.answer;v>0;){const c=[50,20,10,5,2,1].find(c=>c<=v);act('coin',c);v-=c}act('check','');break;
case 'balance':for(let v=g.q.answer;v>0;){const c=[1000,500,250,100,50].find(c=>c<=v);act('weight',c);v-=c}act('check','');break;
case 'pour':for(let v=g.q.answer;v>0;){const c=[500,250,100,50].find(c=>c<=v);act('cup',c);v-=c}act('check','');break;
case 'array':for(let i=1;i<g.q.rows;i++)act('rows',1);for(let i=1;i<g.q.cols;i++)act('cols',1);act('check','');break;
case 'jumps':act('size',g.q.step);for(let i=0;i<g.q.count;i++)act('hop','');break;
case 'groups':for(let i=0;i<g.q.full;i++)act('group','');act('check','');break;
case 'race':for(let tries=0;tries<100&&!g.done;tries++){if(g.s.lost)act('clear','');while(!g.s.lost&&!g.done)act('add',(g.q.target-g.s.total)%3||1)}break;
case 'mirror':g.q.left.forEach((v,i)=>{if(v)act('mirror',i)});act('check','');break;
case 'axis':g.q.answer.forEach(v=>act('axis',v));act('check','');break;
case 'tiles':g.q.pattern.forEach((v,i)=>{while(g.s.tiles[i]!==v)act('tile',i)});act('check','');break;
case 'calendar':act('date',g.q.answer);break;
case 'routes':act('route',g.q.answer);break;
case 'coaches':for(let i=0;i<g.q.answer;i++)act('coach',1);act('check','');break;
case 'survey':g.q.responses.forEach(v=>act('vote',v));break;
case 'bars':g.q.counts.forEach((v,i)=>{for(let j=0;j<v/g.q.step;j++)act('bar',i)});act('check','');break;
default:act('number',g.q.answer);act('check','');}}
let solved=0;const failures=[],variation=[];assert.equal(S.topics.length,56);assert.equal(S.worlds.length,14);
for(const t of S.topics){assert(S.lessons[t.id]);const unique=new Set();for(const round of [0,7,8,15,16,23,24,47])for(let seed=1;seed<=5;seed++){const g=S.games.create(t.id,round,seed*1731,api);unique.add(g.problemKey);try{assert(!/NaN|undefined/.test(g.draw()+g.controls()+g.prompt));if(g.drawingGame){g.pointer(5,5,'start');g.pointer(7,9,'end');assert.equal(g.s.paths.length,0,'bad drawing accepted');g.action('check','');assert(!g.done,'empty drawing passed')}solve(g);assert(g.done,`unsolved ${JSON.stringify(g.q)}`);solved++}catch(e){failures.push({id:t.id,round,seed,error:e.message})}}variation.push([t.id,unique.size]);if(unique.size<8)failures.push({id:t.id,error:'Insufficient puzzle variation: '+unique.size})}
assert(S.drawingMatches([[0,0],[10,0],[20,0]],[[0,0],[20,0]],3));assert(!S.drawingMatches([[0,0],[10,100],[20,0]],[[0,0],[20,0]],10));
console.log(JSON.stringify({solved,variation,failures},null,2));if(failures.length)process.exitCode=1;
module.exports={solve};
