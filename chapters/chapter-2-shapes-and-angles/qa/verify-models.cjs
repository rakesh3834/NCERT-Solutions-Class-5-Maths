const assert=require('node:assert/strict');
global.window=global;require('../content.js');require('../games.js');
const S=SAFARI,U=S.util;
let cases=0,completions=0;
function solve(g){const act=(k,v)=>g.action(k,v);
switch(g.id){
case 'loops':for(let i=0;i<(g.q.closed?g.q.n:g.q.n+1);i++)act('peg',i);if(g.q.closed)act('peg',0);act('check');break;
case 'shifter':act('range',g.q.target);act('check');break;
case 'match':act('pick',g.q.angles.indexOf(g.q.biggest?Math.max(...g.q.angles):g.q.target));break;
case 'sticks':for(let i=0;i<g.s.sticks.length;i++){if(g.q.target.some(t=>S.games.edgeKey(t)===S.games.edgeKey(g.s.sticks[i])))continue;const slot=g.q.target.findIndex(t=>!g.s.sticks.some(e=>S.games.edgeKey(e)===S.games.edgeKey(t)));act('stick',i);act('slot',slot)}break;
case 'tester':act('range',g.q.target);act('check');break;
case 'painter':g.q.angles.forEach((a,i)=>{act('brush',U.type(a));act('paint',i)});break;
case 'fold':for(let i=0;i<3;i++)act('fold');act('fold-angle',g.q.target);break;
case 'yoga':act('range',g.q.target);act('check');break;
case 'garden':if(g.q.observe)act('garden-pick',g.q.angles.indexOf(Math.max(...g.q.angles)));else{act('range',g.q.target);act('check')}break;
case 'names':for(const a of g.q.answers)act('corner',a);break;
case 'ramps':act('range',g.q.other+(g.q.relation==='steeper'?10:-10));act('race');break;
case 'towers':for(let i=0;i<g.q.bays;i++)act('brace',i);act('wind');break;
case 'clock':act('range',g.q.time);act('set-time');act('family',U.type(g.q.angle));break;
case 'carrom':act('range',Math.round(g.q.ideal));act('strike');break;
case 'degrees':act('range',g.q.target);act('check');break;
case 'doodle':act('range',g.q.target-5);act('reveal');act('bank');break;
}}
for(let seed=1;seed<=24;seed++)for(let round=0;round<48;round++)for(const topic of S.topics){
 let local=0;const api={stage(){},render(){},tell(){},markSelected(){},complete(text,extra){local++;completions++;assert.ok(text.length>20);if(topic.id==='doodle')assert.equal(extra.error,5)},animate(d,f,end){f(1);end()}};
 const g=S.games.create(topic.id,round,seed,api);
 assert.ok(g.draw().includes('<svg'));assert.ok(g.prompt.length>10);
 if(topic.id==='carrom')assert.ok(g.q.ideal>=210&&g.q.ideal<=400,`unreachable queen ${g.q.ideal}`);
 if(topic.id==='names')assert.ok(g.q.answers.length>0);
 if(topic.id==='clock'){const h=(g.q.time/60)%12,m=g.q.time%60;const d=Math.abs(30*h-6*m);assert.equal(g.q.angle,Math.min(d,360-d));}
 if(topic.id==='sticks'){
  const lengths=[...g.q.start,...g.q.target].map(e=>U.distance(e[0],e[1]));
  assert.ok(Math.max(...lengths)-Math.min(...lengths)<.001,'Unequal sticks');
  const shared=g.q.start.filter(e=>g.q.target.some(t=>S.games.edgeKey(t)===S.games.edgeKey(e))).length;
  assert.equal(g.q.start.length-shared,g.q.moves,'Wrong number of stick moves');
 }
 solve(g);assert.equal(local,1,`No completion: ${topic.id}, round ${round}, seed ${seed}`);assert.ok(g.done);g.success('Do not count the same round twice');assert.equal(local,1);cases++;
}
// Independently count all triangles from the star's straight-line arrangement.
const edges=S.games.stickPuzzle(0).target, vertices=[];
function add(p){if(!vertices.some(q=>U.distance(p,q)<.001))vertices.push(p)}
for(const e of edges){e.forEach(add)}
for(let i=0;i<edges.length;i++)for(let j=i+1;j<edges.length;j++){
 const [a,b]=edges[i],[c,d]=edges[j],r=[b[0]-a[0],b[1]-a[1]],s=[d[0]-c[0],d[1]-c[1]],cross=(p,q)=>p[0]*q[1]-p[1]*q[0],den=cross(r,s);if(Math.abs(den)<1e-8)continue;
 const ca=[c[0]-a[0],c[1]-a[1]],t=cross(ca,s)/den,u=cross(ca,r)/den;if(t>=-1e-8&&t<=1+1e-8&&u>=-1e-8&&u<=1+1e-8)add([a[0]+t*r[0],a[1]+t*r[1]])
}
const on=(p,e)=>Math.abs(U.distance(e[0],p)+U.distance(p,e[1])-U.distance(...e))<.001;
const connected=(a,b)=>edges.some(e=>on(a,e)&&on(b,e));let triangles=0;
for(let i=0;i<vertices.length;i++)for(let j=i+1;j<vertices.length;j++)for(let k=j+1;k<vertices.length;k++){const a=vertices[i],b=vertices[j],c=vertices[k];if(Math.abs((b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0]))<.01)continue;if(connected(a,b)&&connected(b,c)&&connected(c,a))triangles++;}
assert.equal(triangles,8);
// Reject important misconceptions rather than rewarding them.
for(const [id,attempt] of [['yoga',g=>{g.q.type='Right';g.q.target=90;g.action('range',89);g.action('check')}],['loops',g=>{g.action('peg',0);g.action('peg',1);g.action('check')}],['degrees',g=>{g.action('range',g.q.target===360?0:g.q.target+1);g.action('check')}],['clock',g=>{g.action('range',(g.q.time+60)%720);g.action('set-time')}],['towers',g=>g.action('wind')]]){let scored=0;const g=S.games.create(id,0,1,{stage(){},render(){},tell(){},complete(){scored++},animate(d,f,e){f(1);e()}});attempt(g);assert.equal(scored,0,id+' accepted a misconception')}
console.log(JSON.stringify({modelCases:cases,completionCallbacks:completions,starTriangles:triangles,result:'PASS'},null,2));
