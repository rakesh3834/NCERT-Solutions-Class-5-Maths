const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const fs=require('fs'),assert=require('assert');
(async()=>{
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{})});
const page=await browser.newPage({viewport:{width:390,height:844}}),errors=[],layout=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://127.0.0.1:8767/chapters/class-4-maths/#ch1');await page.evaluate(()=>document.fonts.ready);
const topics=await page.evaluate(()=>SAFARI.topics.map(t=>({id:t.id,name:t.name})));
await page.evaluate(()=>{const create=SAFARI.games.create;SAFARI.games.create=function(...args){const g=create(...args);window.qaGame=g;return g}});
for(const viewport of [{width:320,height:568},{width:390,height:844},{width:768,height:1024},{width:1024,height:768},{width:844,height:390}]){
 await page.setViewportSize(viewport);
 for(const {id,name}of topics){await page.evaluate(id=>{location.hash=id},id);await page.locator('.play-heading h1').filter({hasText:name}).waitFor();const result=await page.evaluate(()=>{const visible=e=>e.getClientRects().length&&getComputedStyle(e).visibility!=='hidden';const bad=[...document.querySelectorAll('.play button,.play input,.stage,.feedback')].filter(visible).flatMap(e=>{const r=e.getBoundingClientRect();return r.x<-.5||r.y<-.5||r.right>innerWidth+.5||r.bottom>innerHeight+.5?[{tag:e.tagName,text:(e.textContent||e.getAttribute('aria-label')||'').slice(0,70),box:[r.x,r.y,r.width,r.height]}]:[]});return {bad,overflow:document.documentElement.scrollWidth>innerWidth,stageHeight:document.querySelector('.stage').getBoundingClientRect().height}});if(result.bad.length||result.overflow||result.stageHeight<70)layout.push({id,viewport,...result});}
 await page.evaluate(()=>location.hash='ch12');await page.locator('.home').waitFor();const home=await page.evaluate(()=>[...document.querySelectorAll('.game-card')].map(e=>e.getBoundingClientRect().bottom).some(y=>y>innerHeight));if(home)layout.push({home:true,viewport});
}
await page.setViewportSize({width:390,height:844});
// Actual pen input through DOM coordinates; a random scribble must not complete a stroke.
await page.evaluate(()=>location.hash='length-pen');await page.locator('.play-heading h1').filter({hasText:'Measure Pencil'}).waitFor();
const points=await page.evaluate(()=>{const s=document.querySelector('#stage svg'),m=s.getScreenCTM();return qaGame.q.paths[0].map(([x,y])=>{const p=new DOMPoint(x,y).matrixTransform(m);return [p.x,p.y]})});
await page.mouse.move(...points[0]);await page.mouse.down();await page.mouse.move(points[0][0]+5,points[0][1]+70,{steps:8});await page.mouse.up();assert.equal(await page.evaluate(()=>qaGame.s.paths.length),0);
await page.mouse.move(...points[0]);await page.mouse.down();await page.mouse.move(...points[1],{steps:24});await page.mouse.up();assert.equal(await page.evaluate(()=>qaGame.s.paths.length),1);await page.locator('[data-action="check"]').click();assert(await page.evaluate(()=>qaGame.done));
const before=await page.evaluate(()=>JSON.parse(localStorage.getItem('gokurious-maths-mela-4-v2')));assert.equal(before.games['length-pen'].round,1);
await page.locator('[data-action="restart"]').click();assert.equal(await page.evaluate(()=>qaGame.round),0);assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('gokurious-maths-mela-4-v2')).xp),before.xp-10);
// Solve one game, another game, and reset the second. The first progress must survive.
await page.evaluate(()=>location.hash='solid');await page.locator('.play-heading h1').filter({hasText:'Solid Detectives'}).waitFor();await page.evaluate(()=>qaGame.action('choice',String(qaGame.q.answer)));assert(await page.evaluate(()=>qaGame.done));
await page.evaluate(()=>location.hash='bonds');await page.locator('.play-heading h1').filter({hasText:'Number-Pair Bridge'}).waitFor();await page.evaluate(()=>qaGame.action('choice',String(qaGame.q.answer)));await page.locator('[data-action="restart"]').click();const after=await page.evaluate(()=>JSON.parse(localStorage.getItem('gokurious-maths-mela-4-v2')));assert.equal(after.games.solid.round,1);assert.equal(after.games.bonds.round,0);assert.equal(after.xp,10);
// Closed outlines can return to the start point in Tap points mode.
await page.evaluate(()=>location.hash='place-pen');await page.locator('.play-heading h1').filter({hasText:'Bundle Pencil'}).waitFor();await page.locator('[data-action="input"]').click();
for(const length of await page.evaluate(()=>qaGame.q.paths.map(p=>p.length)))for(let i=0;i<length;i++)await page.locator('svg [data-action="point"][data-value="'+i+'"]').click();
await page.locator('[data-action="check"]').click();assert(await page.evaluate(()=>qaGame.done));
// Each game opens its own complete article and retains its puzzle on return.
for(const {id,name}of topics){await page.evaluate(id=>location.hash=id,id);await page.locator('.play-heading h1').filter({hasText:name}).waitFor();const seed=await page.evaluate(()=>qaGame.seed);await page.locator('[data-action="learn"]').first().click();assert.equal(await page.locator('article').getAttribute('data-topic'),id);assert.equal(await page.locator('.gk-faqs details').count(),3);assert.equal(await page.locator('.gk-options button').count(),3);await page.locator('#close-modal').click();assert.equal(await page.evaluate(()=>qaGame.seed),seed)}
await page.evaluate(()=>location.hash='ch1');await page.locator('.home').waitFor();await page.screenshot({path:'/tmp/class4-final-phone.png'});
await page.setViewportSize({width:768,height:1024});await page.evaluate(()=>location.hash='mirror');await page.locator('.play-heading h1').filter({hasText:'Mirror Garden'}).waitFor();await page.screenshot({path:'/tmp/class4-final-tablet.png'});
await page.goto('http://127.0.0.1:8767/');assert.equal(await page.locator('.class4-card').count(),14);await page.locator('.class4-card').nth(11).click();await page.locator('.world-title h2').filter({hasText:'Ticking Clocks'}).waitFor();
fs.writeFileSync('/tmp/class4-browser-results.json',JSON.stringify({games:topics.length,viewports:5,layout,errors,drawing:'passed',restartIsolation:'passed',articles:56,chapterLinks:'passed'},null,2));console.log(JSON.stringify({layout,errors}));await browser.close();if(errors.length||layout.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1});
