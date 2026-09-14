const assert=require('node:assert/strict');
const fs=require('node:fs');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const executablePath=process.env.CHROMIUM_PATH||undefined;
const base=process.env.BASE_URL||'http://127.0.0.1:8765';
const root=__dirname;
const errors=[],layout=[],flows=[];let navigation=0;
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath});
 const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce',hasTouch:true});
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base);const ids=await page.evaluate(()=>SAFARI.topics.map(t=>t.id));
 async function seed(id,round=0,mode='arcade'){
  await page.evaluate(({id,round,mode})=>localStorage.setItem('gokurious-shape-safari-v1',JSON.stringify({version:1,xp:0,mode,world:0,games:{[id]:{round,seed:712,assisted:0,error:0,estimated:0}}})),{id,round,mode});
  await page.goto(base+'/?qa='+(++navigation)+'#'+id);await page.locator('#stage svg').waitFor();
  return page.evaluate(({id,round})=>{const p=JSON.parse(localStorage.getItem('gokurious-shape-safari-v1')).games[id];const g=SAFARI.games.create(id,round,p.currentSeed,{stage(){},render(){},tell(){},complete(){},markSelected(){},animate(){}},{mode:p.currentMode});return {q:g.q,s:g.s,drawing:!!g.drawingGame}}, {id,round});
 }
 async function draw(a,b){const points=await page.evaluate(([a,b])=>{const svg=document.querySelector('#stage svg'),offset=+(svg.dataset.offsetY||0);return [a,b].map(p=>{const v=new DOMPoint(p[0],p[1]+offset).matrixTransform(svg.getScreenCTM());return [v.x,v.y]})},[a,b]);await page.mouse.move(...points[0]);await page.mouse.down();await page.mouse.move(...points[1],{steps:9});await page.mouse.up();}
 const click=(action,value)=>page.locator(`[data-action="${action}"]${value===undefined?'':`[data-value="${value}"]`}`).first().click();
 async function slide(value){const r=page.locator('[data-range="main"]');await r.fill(String(value));await r.dispatchEvent('input');}
 async function fit(label){const data=await page.evaluate(()=>{const all=[...document.querySelectorAll('.game-box,.stage,.controls,.feedback,.game-card,.journey-nav,.play-top,.restart-button,.mode-switch,.mobile-tip')];const issues=[];for(const el of all){const r=el.getBoundingClientRect();if(!r.width||!r.height)continue;if(r.left<-.5||r.right>innerWidth+.5||r.top<-.5||r.bottom>innerHeight+.5)issues.push({element:el.className,rect:{x:r.x,y:r.y,w:r.width,h:r.height}})}return {width:innerWidth,height:innerHeight,scrollW:document.documentElement.scrollWidth,scrollH:document.documentElement.scrollHeight,issues,stageHeight:document.querySelector('.stage')?.getBoundingClientRect().height}});layout.push({label,...data});assert.equal(data.scrollW,data.width,`${label}: horizontal overflow`);assert.ok(data.scrollH<=data.height+1,`${label}: vertical overflow ${data.scrollH}/${data.height}`);assert.deepEqual(data.issues,[],label+' clipping');if(data.stageHeight)assert.ok(data.stageHeight>=95,label+' tiny stage');}
 // Every concept and every island at each supported viewport, with controls in the same view.
 for(const [w,h] of [[320,568],[360,640],[390,844],[430,932],[768,1024],[820,1180],[1024,768],[844,390],[1366,850]]){
  await page.setViewportSize({width:w,height:h});await page.goto(base);for(let i=0;i<4;i++){if(i)await click('world-index',i);await fit(`home world ${i} ${w}x${h}`)}
  for(const id of ids){await seed(id,16);await fit(`${id} ${w}x${h}`)}
 }
 // Real DOM controls complete every game in each difficulty and both visual modes.
 await page.setViewportSize({width:390,height:844});
 for(const mode of ['arcade','doodle'])for(const round of [0,8,16])for(const id of ids){const {q,s,drawing}=await seed(id,round,mode);
  if(drawing){if(id==='loops'){for(let i=0;i<q.n;i++)await draw(q.points[i],q.points[q.closed?(i+1)%q.n:i+1]);}else for(const t of q.targets)await draw(t.a,t.b);await click('check');if(id==='clock')await click('clock-family',q.angle===90?'Right':q.angle===180?'Straight':q.angle<90?'Acute':'Obtuse');}
  else switch(id){
   case 'loops':for(let i=0;i<(q.closed?q.n:q.n+1);i++)await click('peg',i);if(q.closed)await click('peg',0);await click('check');break;
   case 'shifter':case 'tester':case 'yoga':case 'degrees':await slide(q.target);await click('check');break;
   case 'match':await click('pick',q.angles.indexOf(q.biggest?Math.max(...q.angles):q.target));break;
   case 'sticks':{
    const key=e=>e.map(p=>p.map(v=>Math.round(v*100)/100).join(',')).sort().join('|');
    for(let i=0;i<s.sticks.length;i++){if(q.target.some(t=>key(t)===key(s.sticks[i])))continue;const j=q.target.findIndex(t=>!s.sticks.some(e=>key(e)===key(t)));await click('stick',i);await click('slot',j);s.sticks[i]=q.target[j];}break;
   }
   case 'painter':for(let i=0;i<q.angles.length;i++){await click('brush',q.angles[i]===90?'Right':q.angles[i]<90?'Acute':'Obtuse');await click('paint',i)}break;
   case 'fold':for(let i=0;i<3;i++)await click('fold');await click('fold-angle',q.target);break;
   case 'garden':if(q.observe)await click('garden-pick',q.angles.indexOf(Math.max(...q.angles)));else{await slide(q.target);await click('check')}break;
   case 'names':for(const i of q.answers)await click('corner',i);break;
   case 'ramps':await slide(q.other+(q.relation==='steeper'?10:-10));await click('race');break;
   case 'towers':for(let i=0;i<q.bays;i++)if(!q.prebraced.includes(i))await click('brace',i);await click('wind');break;
   case 'clock':await slide(q.time);await click('set-time');await click('family',q.angle===90?'Right':q.angle===180?'Straight':q.angle<90?'Acute':'Obtuse');break;
   case 'carrom':await slide(Math.round(q.ideal));await click('strike');break;
   case 'doodle':await slide(q.target-5);await click('reveal');await click('pen');{const r=await page.locator('#stage').boundingBox();await page.mouse.move(r.x+r.width*.4,r.y+r.height*.4);await page.mouse.down();await page.mouse.move(r.x+r.width*.5,r.y+r.height*.5,{steps:4});await page.mouse.up()}await click('clear');await click('bank');break;
  }
  await page.locator('.feedback.success').waitFor();await fit(`${id} success ${mode} ${round}`);await page.setViewportSize({width:320,height:568});await fit(`${id} success small ${mode} ${round}`);await page.setViewportSize({width:390,height:844});
  const p=await page.evaluate(id=>JSON.parse(localStorage.getItem('gokurious-shape-safari-v1')).games[id],id);assert.equal(p.round,round+1,id+' progress not saved');
  if(mode==='arcade'&&round===0)await page.screenshot({path:`${root}/${id}-phone-success.png`});
  await click('next');await page.locator('#stage svg').waitFor();flows.push({id,mode,stage:round/8+1,result:'PASS'});
 }
 // Completing the last round yields a real summary and can continue indefinitely.
 const q24=await seed('degrees',23);await slide(q24.q.target);await click('check');await click('next');await page.locator('.done-screen').waitFor();await click('play','degrees');await page.locator('#stage').waitFor();assert.ok((await page.locator('.mission-stats').textContent()).includes('FREE PLAY'));
 // Saved progress survives reload; hints and chapter map remain accessible.
 await page.reload();assert.ok((await page.locator('.mission-stats').textContent()).includes('FREE PLAY'));await click('hint');await page.locator('#modal[open]').waitFor();await click('close');await click('learn');await page.locator('#close-modal').click();await page.locator('#guide').click();await page.locator('#modal [data-action="modal-play"][data-value="loops"]').click();await page.locator('#stage').waitFor();
 // Corrupt saves are retained and do not stop play.
 await page.evaluate(()=>localStorage.setItem('gokurious-shape-safari-v1','not-json-preserve-me'));await page.reload();await page.locator('#stage').waitFor();assert.equal(await page.evaluate(()=>localStorage.getItem('gokurious-shape-safari-v1')),'not-json-preserve-me');
 // Final screenshots from clean progress.
 await page.evaluate(()=>localStorage.removeItem('gokurious-shape-safari-v1'));
 await page.setViewportSize({width:1366,height:850});await page.goto(base);await page.screenshot({path:root+'/home-desktop.png'});
 await page.setViewportSize({width:390,height:844});await page.goto(base);await page.screenshot({path:root+'/home-phone.png'});await seed('loops');await page.screenshot({path:root+'/loop-phone.png'});
 await seed('doodle',8,'doodle');await click('reveal');await click('pen');await page.screenshot({path:root+'/doodle-phone.png'});
 await page.setViewportSize({width:820,height:1180});await seed('carrom',8);await page.screenshot({path:root+'/carrom-tablet.png'});
 await page.setViewportSize({width:844,height:390});await seed('clock',8);await page.screenshot({path:root+'/clock-landscape.png'});
 assert.deepEqual(errors,[]);fs.writeFileSync(root+'/browser-results.json',JSON.stringify({result:'PASS',layoutChecks:layout.length,interactionFlows:flows.length,errors,layout,flows},null,2));console.log(JSON.stringify({result:'PASS',layoutChecks:layout.length,interactionFlows:flows.length,errors}));await browser.close();
})().catch(e=>{console.error(e);fs.writeFileSync(root+'/browser-failure.json',JSON.stringify({message:e.message,errors,lastChecks:layout.slice(-6),flows},null,2));process.exit(1)});
