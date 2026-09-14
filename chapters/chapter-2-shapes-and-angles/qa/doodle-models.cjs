const assert=require('node:assert/strict');
global.window=global;require('../content.js');require('../learning.js');require('../games.js');require('../doodles.js');
const S=SAFARI,U=S.util;let solved=0,variants=0,misconceptions=0;
const api={render(){},stage(){},tell(){},markSelected(){},complete(){},animate(d,f,end){f(1);end()}};
function stroke(g,a,b){g.pointer(...a,'start');for(let i=1;i<=8;i++)g.pointer(a[0]+(b[0]-a[0])*i/8,a[1]+(b[1]-a[1])*i/8,'move');g.pointer(...b,'end')}
for(const t of S.topics)if(S.doodles.supports(t.id))for(let seed=1;seed<=30;seed++)for(const round of [0,8,16,24,48]){
 let count=0;const g=S.games.create(t.id,round,seed,{...api,complete(){count++}},{mode:'doodle'});
 assert.equal(g.mode,'doodle');assert.equal(g.draw(),g.draw(),'drawing changed without action');
 if(g.id==='doodle'){g.action('reveal');g.action('pen');stroke(g,[140,95],[220,125]);assert.ok(g.s.drawn.length);g.action('bank')}
 else{
  g.action('check');assert.equal(count,0,'empty sketch passed');
  stroke(g,[10,10],[50,10]);assert.equal(g.s.accepted.length,0,'off-board line accepted');
  if(g.id==='loops'){for(let i=0;i<g.q.n;i++)stroke(g,g.q.points[i],g.q.points[g.q.closed?(i+1)%g.q.n:i+1]);}
  else for(const t of [...g.q.targets])stroke(g,t.a,t.b);
  g.action('check');if(g.id==='clock')g.action('clock-family',U.type(g.q.angle));
 }
 assert.equal(count,1,`failed ${t.id} ${seed} ${round}`);g.success('cannot count twice');assert.equal(count,1);solved++;
}
// Real target geometry must reject incorrect strokes, not just detect any drawing.
for(const id of ['tester','painter','fold','yoga','garden','towers','clock','degrees']){
 const g=S.games.create(id,0,9,api,{mode:'doodle'}),t=g.q.targets[0];
 g.recognize([t.a,[t.a[0]+60,t.a[1]+95],[t.a[0]-80,t.a[1]-45],t.b]);assert.equal(g.s.accepted.length,0,id+' accepted a scribble');
 g.pointer(...t.a,'start');g.pointer(...t.b,'cancel');assert.equal(g.s.active.length,0);assert.equal(g.s.accepted.length,0);
 stroke(g,t.b,t.a);assert.equal(g.s.accepted.length,1,id+' failed reversed line');g.action('undo');assert.equal(g.s.accepted.length,0);
 g.action('input-mode');const a=g.anchors.findIndex(p=>U.distance(p,t.a)<.01),b=g.anchors.findIndex(p=>U.distance(p,t.b)<.01);assert.ok(a>=0&&b>=0,id+' tap targets missing');g.action('anchor',a);g.action('anchor',b);assert.equal(g.s.accepted.length,1,id+' tap mode failed');misconceptions++;
}
// Guard recent screens and the last problem in BOTH modes, including repeated re-entry at one round.
for(const mode of ['arcade','doodle'])for(const t of S.topics)for(const round of [0,8,16]){
 const recent=[];let previous;for(let i=0;i<40;i++){
  const g=S.games.create(t.id,round,(1976+Math.imul(i+1,2654435761))>>>0,api,{mode,recent,previous});
  assert.notEqual(g.problemKey,previous,`${t.id} repeated problem in ${mode}`);
  assert.ok(!recent.some(x=>x.visual===g.visualKey),`${t.id} repeated screen in ${mode}, round ${round}, iteration ${i}`);
  assert.equal(g.draw(),g.draw());previous=g.problemKey;recent.push({visual:g.visualKey});if(recent.length>4)recent.shift();variants++;
 }
}
let faqs=0,checks=0,activities=0;
for(const t of S.topics){const l=S.lessons[t.id];assert.ok(l);assert.equal(l.article.length,3);assert.ok(l.article.every(([h,p])=>h.length>5&&p.length>120));assert.equal(l.worked.steps.length,3);assert.equal(l.faqs.length,3);assert.equal(l.checks.length,2);assert.equal(l.activities.length,2);assert.ok(l.related.every(id=>S.lessons[id]));for(const c of l.checks){assert.ok(c.options[c.answer]);assert.ok(c.why.length>20)}faqs+=l.faqs.length;checks+=l.checks.length;activities+=l.activities.length;}
console.log(JSON.stringify({doodleSolutions:solved,randomizedRounds:variants,misconceptionAndAlternativeInputChecks:misconceptions,articles:16,faqs,checks,activities,result:'PASS'},null,2));
