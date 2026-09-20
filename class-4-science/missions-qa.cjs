const fs=require('fs'),vm=require('vm'),assert=require('assert');
const files=['content.js','learning.js','games.js','science-games.js','missions.js','missions-life.js','missions-lab.js','missions-world.js','missions-content.js'];
function load(){const c={console,window:{}};vm.createContext(c);for(const f of files)vm.runInContext(fs.readFileSync(__dirname+'/chapters/class-4-science/'+f,'utf8').replace('window.SAFARI={};','var SAFARI=window.SAFARI={};'),c);return c.SAFARI}
function step(g){
const a=(k,v='')=>g.action(k,String(v)),seq=(k,values)=>values.forEach(v=>a(k,v));
const route=(goal,blocked)=>{let queue=[[g.s.pos,[]]],seen=new Set([g.s.pos]);while(queue.length){let[p,path]=queue.shift();if(p===goal){seq('walk',path);return}for(const d of [-1,1,-5,5]){const n=p+d;if(n<0||n>24||(Math.abs(d)===1&&Math.floor(n/5)!==Math.floor(p/5))||blocked.includes(n)||seen.has(n))continue;seen.add(n);queue.push([n,[...path,d]])}}throw Error('No route')};
const actions={
'helpers:service':()=>a('place',g.q.visitor[1]),
'helpers:teams':()=>{a('clear');seq('assign',Array(g.q.crowd>3?2:1).fill('welcome'));seq('assign',['garden','garden']);a('open')},
'helpers:repair':()=>{seq('safe',['Keep people away','Call trained adult']);a('act')},
'helpers:followup':()=>a('plan','Watering rota + checks'),
'park:plant-site':()=>{a('site',0);a('plant')},
'park:cleanup':()=>{a('waste','Dry leaves');a('destination','Compost pile');a('waste','Plastic wrapper');a('destination','Litter bin')},
'park:soil':()=>a('soil',g.q.dry?'Water the soil':'Wait; check tomorrow'),
'park:access':()=>route(24,[g.q.blocked,12]),
'journey:mode':()=>a('transport','Walk: no fuel'),
'journey:navigate':()=>route(g.q.goal,[g.q.block]),
'journey:message':()=>a('send',g.q.parcel?'Post the letter':'Phone call'),
'journey:directions':()=>a('direction',g.q.goal<20?'One street south':'One street north'),
'savings:shop':()=>{seq('buy',[0,1]);a('pay')},
'savings:deposit':()=>{seq('deposit',Array(g.q.goal/10).fill(10));a('bank')},
'savings:atm':()=>a('balance',g.s.bank-10),
'savings:surprise':()=>a('respond','Use the spare at home'),
'observe:inspect':()=>{a('lens');a('legs',g.q.legs)},
'observe:classify':()=>a('group',g.q.legs===6?'Insect':'Spider (not an insect)'),
'observe:leaf-sketch':()=>{seq('vein',[g.q.leaf,g.q.leaf]);a('sketch')},
'observe:habitat':()=>a('plan','Watch quietly; leave it here'),
'web:connections':()=>seq('node',[0,1,2,3,4,5]),
'web:disturbance':()=>a('loss',g.q.removed==='Flowers'?'Bee: nectar food':'Bird: nesting shelter'),
'web:restore':()=>{seq('support',g.q.removed==='Flowers'?['Grow suitable flowers','Keep a patch unsprayed']:['Protect nesting tree','Plant future shelter']);a('restore')},
'web:follow-evidence':()=>a('claim','Visits increased in this journal'),
'village:home':()=>{a('wall');a('roof');a('weather')},
'village:weather-evidence':()=>{seq('drain',['Left ground channel','Right ground channel']);a('draincheck')},
'village:solar':()=>{while(g.s.panel!==g.q.clear)a('panel',Math.sign(g.q.clear-g.s.panel));a('test');a('use')},
'village:natural-colour':()=>a('pigment',g.q.dye[1]),
'storage:dry':()=>{a('spread');seq('dry',Array(g.q.wet).fill(''));a('store')},
'storage:container':()=>{a('jar',1);a('fill')},
'storage:inspection':()=>a('inspect',g.q.leak),
'storage:prevention':()=>{seq('repair',g.q.leak==='Cracked lid'?['Replace the damaged lid','Keep checking for pests']:['Move onto a dry raised base','Check for dampness regularly']);a('protect')},
'plate:variety':()=>{seq('food',[g.q.protein[0],g.q.veg[0]]);a('serve')},
'plate:water':()=>a('drink','Clean drinking water'),
'plate:portions':()=>{while(g.s.servings<g.q.guests)a('portion',1);a('send')},
'plate:food-journey':()=>seq('chain',['Farmer','Transporter','Market','Cook']),
'cooking:method':()=>{a('position',{Steam:1,Boil:0,Roast:2}[g.q.recipe[1]]);a('setup')},
'cooking:heat-test':()=>{if(g.s.position!==2)a('water');a('heat');a('record')},
'cooking:taste':()=>a('taste',g.q.taste[1]),
'cooking:label':()=>a('serve','Ask an adult; do not serve'),
'routine:day-plan':()=>{['Move / play','Quiet rest','Bedtime routine'].forEach((v,i)=>{a('activity',v);a('slot',i)});a('plan')},
'routine:hygiene':()=>{seq('rub',['Palms','Backs','Between fingers']);a('rinse')},
'routine:body-cue':()=>a('adapt',g.q.tired?'Water + a rest break':'Move to a safe indoor game'),
'routine:reflection':()=>{seq('habit',['Movement suited to me','Time to rest and sleep']);a('journal')},
'feelings:notice':()=>a('notice','Ask how they feel'),
'feelings:listen':()=>a('reply','I hear you. What would help?'),
'feelings:cooperate':()=>{seq('turn',Array.from({length:g.q.players},(_,i)=>i));a('fair')},
'feelings:trusted-help':()=>{seq('help',['Move to a safer place','Tell a trusted adult']);a('safe')},
'spinner:predict':()=>a('predict','More wobble'),
'spinner:baseline':()=>{a('spin');a('record')},
'spinner:change-one':()=>{while(Math.abs(g.s.pivot)>5)a('pivot',-Math.sign(g.s.pivot)*10);a('design')},
'spinner:compare-test':()=>{a('spin');a('evidence')},
'spinner:explain':()=>a('claim','Less wobble in this model'),
'boat-pen:material':()=>a('predict','Yes, shape may change floating'),
'boat-pen:draw-hull':()=>{a('template');a('hull')},
'boat-pen:load-test':()=>{seq('load',Array.from({length:g.q.load},(_,i)=>i%2));a('test');a('inspect')},
'boat-pen:diagnose':()=>a('diagnose',g.s.trials[0].afloat?'Hollow hull + balanced load':!g.s.trials[0].balance?'Load is too one-sided':'Hull capacity is too small'),
'boat-pen:improve':()=>{seq('widen',Array(6).fill(''));a('balance');a('launch')},
'paper:collect':()=>{seq('scrap',Array.from({length:g.q.scraps},(_,i)=>i));a('shred')},
'paper:pulp':()=>{a('soak');a('mash');a('pulp')},
'paper:spread':()=>{seq('patch',[0,1,2,3,4,5]);a('lift')},
'paper:finish':()=>{a('press');a('dry');a('colour')},
'paper-test:fair-test':()=>{a('size');a('drops');a('begin')},
'paper-test:measure':()=>{seq('test',[0,1,2]);a('compare')},
'paper-test:choose-use':()=>a('paper',g.q.job.startsWith('Mop')?'Tissue':'Cardboard'),
'paper-test:resource':()=>{for(const[v,w]of [['Blank-backed sheet','Use the other side'],['Torn paper scraps','Make new pulp'],['Loose book cover','Repair the cover']]){a('item',v);a('reuse',w)}},
'lands:land-observe':()=>a('feature',g.q.region.feature),
'lands:home-adapt':()=>{a('design',g.q.region.roof);a('build')},
'lands:weather-event':()=>{seq('safety',['Follow local adult guidance','Move plans to a safe place']);a('update')},
'lands:postcard':()=>a('caption','This is one local example'),
'pack:pack':()=>{seq('bag',['Water bottle',g.q.cold?'Warm layer':'Sun hat']);a('depart')},
'pack:forecast-change':()=>{a('rain');a('ready')},
'pack:share':()=>{seq('share',Array.from({length:g.q.supply},(_,i)=>i));a('group')},
'pack:local-knowledge':()=>{seq('response',['Follow the open marked route','Ask the adult guide for help']);a('finish')},
'shadows:draw-prediction':()=>{a('predict',-g.q.side);a('shine')},
'shadows:compare':()=>a('relation','Away from the light'),
'shadows:height-test':()=>{a('height',-15);a('keep')},
'shadows:shade-transfer':()=>{a('picnic',-g.q.side*20);a('shade')},
'moon:sky-observation':()=>{while(g.s.phaseIndex!==g.q.start)a('wheel',1);a('match')},
'moon:calendar':()=>a('nextphase',(g.q.start+2)%8),
'moon:day-night':()=>{while(Math.cos(g.s.earth*Math.PI/180)<=.5)a('rotate');a('night')},
'moon:moon-reason':()=>a('reason','Different views of the sunlit half'),
'moon:lunar-mission':()=>seq('event',['Launch','Lunar orbit','Vikram lands'])
};const f=actions[g.id+':'+g.phaseKey];if(!f)throw Error('No solver for '+g.id+':'+g.phaseKey);f();
}
function solve(g){for(let i=0;i<8&&!g.done;i++)step(g);if(!g.done)throw Error('Not complete '+g.id+':'+g.phaseKey)}
function run(){const S=load();let completed=0,stages=0,signatures=new Set(),transitions=0;assert.equal(S.topics.length,20);for(let c=0;c<10;c++)assert.equal(S.topics.filter(t=>t.chapter===c).length,2);
for(const t of S.topics)for(const round of [0,1,7,8,15,16,23,24,47])for(let seed=1;seed<=20;seed++){
let awarded=0;const api={stage(){},render(){},tell(){},complete(){awarded++},animate(t,f,e){f(1);e()}};
const g=S.games.create(t.id,round,seed*7919,api),seen=[];
for(let i=0;i<8&&!g.done;i++){const before=g.draw(),key=g.phaseKey,kind=g.mechanic;assert(!/NaN|undefined/.test(before),t.id+' invalid SVG');assert(!seen.some(p=>p.key===key),t.id+' repeated stage');if(seen.length){assert.notEqual(kind,seen.at(-1).kind,t.id+' repeated interaction');assert.notEqual(before,seen.at(-1).svg,t.id+' repeated scene');transitions++}g.action('not-a-real-action','ignore');assert.equal(g.phaseKey,key);assert.equal(awarded,0);seen.push({key,kind,svg:before});stages++;signatures.add(t.id+':'+key);step(g);assert(g.done||g.phaseKey!==key,t.id+':'+key+' did not advance');assert(!/NaN|undefined/.test(g.draw()),t.id+' invalid next SVG')}
assert(g.done,t.id);assert.equal(awarded,1);g.action('launch');assert.equal(awarded,1);completed++;
}
const api={stage(){},render(){},tell(){},complete(){},animate(t,f,e){f(1);e()}};
let b=S.games.create('boat-pen',16,82,api);step(b);b.pointer(200,150,'start');b.pointer(201,151,'move');b.pointer(202,151,'end');b.action('hull');assert.equal(b.phaseKey,'draw-hull');b.action('template');b.action('hull');for(let i=0;i<b.q.load;i++)b.action('load','0');b.action('test');assert(!b.s.trials[0].balance);b.action('inspect');step(b);b.action('launch');assert(!b.done);step(b);assert(b.done);
let p=S.games.create('paper-test',0,8,api);p.action('begin');assert.equal(p.phaseKey,'fair-test');p.action('size');p.action('begin');assert.equal(p.phaseKey,'fair-test');step(p);p.action('compare');assert.equal(p.phaseKey,'measure');
let n=S.games.create('observe',0,10,api);step(n);step(n);n.action('vein',n.q.leaf==='parallel'?'branching':'parallel');n.action('sketch');assert.equal(n.phaseKey,'leaf-sketch');
let s=S.games.create('shadows',0,10,api);s.action('shine');assert.equal(s.phaseKey,'draw-prediction');s.action('predict',String(s.q.side));s.action('shine');assert.equal(s.phaseKey,'compare','Predictions must be recorded even when wrong');
const report={games:20,missionsCompleted:completed,stagesVisited:stages,distinctStages:signatures.size,semanticTransitions:transitions,negativeAndRevisionPaths:'passed'};fs.writeFileSync('/tmp/class4-science-qa.json',JSON.stringify(report,null,2));console.log(report)}
module.exports={load,step,solve,files,run};if(require.main===module)run();
