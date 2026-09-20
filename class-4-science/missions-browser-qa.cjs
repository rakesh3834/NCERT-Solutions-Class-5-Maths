const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const {step}=require('./missions-qa.cjs');
const assert=require('assert'),fs=require('fs');
const base=process.env.BASE_URL||'http://127.0.0.1:8768/';
(async()=>{
const b=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{})});
const p=await b.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'}),errors=[],layout=[],assets=[],svgBounds=[];
p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.status()>=400)assets.push([r.status(),r.url()])});
await p.goto(base+'chapters/class-4-science/#ch1');await p.evaluate(()=>document.fonts.ready);
await p.evaluate(()=>{const create=SAFARI.games.create;SAFARI.games.create=function(...args){const g=create(...args);window.qaGame=g;return g}});
await p.evaluate('window.stepGame = '+step.toString());
const topics=await p.evaluate(()=>SAFARI.topics.map(t=>({id:t.id,name:t.name})));let scenes=0;
const inspect=async(id,viewport)=>{const result=await p.evaluate(()=>{const bad=[...document.querySelectorAll('.play button,.play input,.stage,.feedback')].filter(e=>e.getClientRects().length&&getComputedStyle(e).visibility!=='hidden').flatMap(e=>{const r=e.getBoundingClientRect();return r.x<-.5||r.y<-.5||r.right>innerWidth+.5||r.bottom>innerHeight+.5?[{text:(e.textContent||'').slice(0,55),box:[r.x,r.y,r.width,r.height]}]:[]});const svgText=[...document.querySelectorAll('#stage svg text')].flatMap(e=>{const r=e.getBBox();return r.x<0||r.x+r.width>600||r.y<0||r.y+r.height>365?[e.textContent]:[]});return{phase:qaGame.phaseKey,bad,svgText,overflow:document.documentElement.scrollWidth>innerWidth,stageHeight:document.querySelector('.stage').getBoundingClientRect().height}});if(result.bad.length||result.overflow||result.stageHeight<70)layout.push({id,viewport,...result});if(result.svgText.length)svgBounds.push({id,phase:result.phase,text:result.svgText});scenes++};
for(const viewport of [{width:320,height:568},{width:390,height:844},{width:768,height:1024},{width:1024,height:768},{width:844,height:390}]){
await p.setViewportSize(viewport);
for(const {id,name}of topics){await p.evaluate(id=>location.hash=id,id);await p.locator('.play-heading h1').filter({hasText:name}).waitFor();
for(let i=0;i<8;i++){await inspect(id,viewport);if(await p.evaluate(()=>qaGame.done))break;await p.evaluate(()=>stepGame(qaGame));}
assert(await p.evaluate(()=>qaGame.done),id+' complete');}
}
await p.setViewportSize({width:390,height:844});
// Real pointer: an invalid scribble cannot produce a hull; a free U is measured.
await p.evaluate(()=>location.hash='boat-pen');await p.locator('.play-heading h1').filter({hasText:'Doodle Boat Lab'}).waitFor();await p.locator('[data-action="predict"]').first().click();
async function stroke(points){const xy=await p.evaluate(points=>{const m=document.querySelector('#stage svg').getScreenCTM();return points.map(([x,y])=>{const q=new DOMPoint(x,y).matrixTransform(m);return[q.x,q.y]})},points);await p.mouse.move(...xy[0]);await p.mouse.down();for(const q of xy.slice(1))await p.mouse.move(...q,{steps:12});await p.mouse.up()}
await stroke([[200,150],[201,151],[204,154]]);await p.locator('[data-action="hull"]').click();assert.equal(await p.evaluate(()=>qaGame.phaseKey),'draw-hull');
await stroke([[150,145],[185,240],[412,240],[451,145]]);assert(await p.evaluate(()=>qaGame.s.hull?.width>290));await p.screenshot({path:'/tmp/science-v2-boat-phone.png'});await p.locator('[data-action="hull"]').click();assert.equal(await p.evaluate(()=>qaGame.phaseKey),'load-test');
for(let i=0;i<5&&!await p.evaluate(()=>qaGame.done);i++)await p.evaluate(()=>stepGame(qaGame));assert(await p.evaluate(()=>qaGame.done));
const key='gokurious-wondrous-world-4-missions-v2',before=await p.evaluate(k=>JSON.parse(localStorage.getItem(k)),key);await p.locator('[data-action="restart"]').click();const after=await p.evaluate(k=>JSON.parse(localStorage.getItem(k)),key);assert.equal(after.games['boat-pen'].round,0);assert.equal(after.games.helpers.round,before.games.helpers.round);assert.equal(await p.evaluate(()=>qaGame.phaseKey),'material');
// Article opening must preserve the current investigation state.
for(const {id,name}of topics){await p.evaluate(id=>location.hash=id,id);await p.locator('.play-heading h1').filter({hasText:name}).waitFor();await p.evaluate(()=>stepGame(qaGame));const state=await p.evaluate(()=>JSON.stringify(qaGame.s));await p.locator('[data-action="learn"]').first().click();assert.equal(await p.locator('article').getAttribute('data-topic'),id);assert.equal(await p.locator('.gk-faqs details').count(),3);await p.locator('.gk-options button').first().click();assert.equal(await p.locator('.gk-feedback').count(),1);await p.locator('#close-modal').click();assert.equal(await p.evaluate(()=>JSON.stringify(qaGame.s)),state)}
// Bookmarks from retired drills continue to open the relevant new game.
await p.evaluate(()=>location.hash='boats');await p.locator('.play-heading h1').filter({hasText:'Doodle Boat Lab'}).waitFor();
await p.evaluate(()=>location.hash='ch7');await p.locator('.home').waitFor();assert.equal(await p.locator('.game-card').count(),2);await p.screenshot({path:'/tmp/science-v2-home-phone.png'});
await p.setViewportSize({width:768,height:1024});await p.evaluate(()=>location.hash='paper-test');await p.locator('.play-heading h1').filter({hasText:'Materials Mission'}).waitFor();await p.evaluate(()=>stepGame(qaGame));await p.screenshot({path:'/tmp/science-v2-tablet.png'});
await p.goto(base);assert.equal(await p.locator('.class4-card').count(),10);await p.locator('.class4-card').nth(9).click();await p.locator('.world-title h2').filter({hasText:'Our Sky'}).waitFor();
const result={games:20,viewports:5,scenes,articles:20,layout,svgBounds,errors,assets,drawing:'passed',restart:'passed',legacyBookmarks:'passed',chapters:10};fs.writeFileSync('/tmp/science-v2-browser-results.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result));await b.close();if(layout.length||errors.length||assets.length||svgBounds.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1});
