const fs=require('fs'),vm=require('vm'),assert=require('assert');
const files=[...require('./missions-qa.cjs').files,'campaign-core.js','campaign-spin.js','campaign-light.js','campaign-paper.js','campaign-content.js'];
function load(){const c={console,window:{}};vm.createContext(c);for(const f of files)vm.runInContext(fs.readFileSync(__dirname+'/chapters/class-4-science/'+f,'utf8').replace('window.SAFARI={};','var SAFARI=window.SAFARI={};'),c);return c.SAFARI}
function solve(g){const a=(k,v='')=>g.action(k,String(v));switch(g.phaseKey){
case 'beam-rescue':a('place',420);a('test');break;
case 'launch-lane':a('power',7);a('launch');break;
case 'cargo-carousel':a('select',0);for(let i=0;i<4;i++)a('socket');a('select',1);for(let i=0;i<3;i++)a('socket');a('test');break;
case 'odd-shape-pivot':a('x',266);a('y',201);a('test');break;
case 'storm-tower':a('swap');a('test');break;
case 'colour-speed-studio':a('speed',2);a('capture');a('speed',10);a('capture');break;
case 'coasting-ring':a('radius',95);a('test');break;
case 'rolling-delivery':a('shape');a('shape');a('test');break;
case 'rotor-doodle':a('template','square');a('test');break;
case 'championship-top':a('offset',0);a('balance',0);a('push',7);a('test');break;
case 'opposite-direction':a('ly',230);a('test');break;
case 'source-distance':a('lx',135);a('test');break;
case 'object-distance':for(let i=0;i<13;i++)a('walk',15);a('test');break;
case 'puppet-lift':a('oy',147);a('test');break;
case 'two-source-stage':a('select',0);a('lamp',235);a('select',1);a('lamp',125);a('test');break;
case 'sun-record':for(const n of [0,4,8]){a('hour',n);a('record')}break;
case 'blackout-puzzle':a('show');a('switch');a('oy',215);a('switch');a('show');break;
case 'cutout-doodle':a('width',80);a('height',60);a('template');a('test');break;
case 'moving-screen':a('sx',425);a('ly',195);a('test');break;
case 'shadow-finale':a('lx',145);a('cue');a('oy',156);a('cue');a('sx',440);a('cue');break;
case 'feedstock-sort':g.q.items.forEach((v,i)=>{a('select',i);a('bin',v[1]?'paper':'other')});a('test');break;
case 'tear-workshop':a('tear','across');a('tear','down');a('test');break;
case 'water-valve':a('pour',20);a('pour',20);a('pour',20);a('test');break;
case 'pulp-whirlpool':for(let i=0;i<9;i++)a('turn');a('test');break;
case 'even-sheet':for(const [from,to]of [[0,3],[0,4],[1,5]]){a('select',from);a('scoop');a('select',to);a('scoop')}a('test');break;
case 'press-roller':a('pressure',2);a('roller',105);a('roller',495);a('test');break;
case 'drying-weather':a('rack');a('cover');a('air',1);a('test');break;
case 'reuse-cutting':a('cut',2);a('cut',3);a('cut',18);a('test');break;
case 'factory-routing':for(const n of [1,2,3,4])a('connect',n);a('test');break;
case 'resource-orders':for(let i=0;i<6;i++)a('reuse');a('recycle');a('test');break;
default:throw Error('Unknown level '+g.phaseKey);
}if(!g.done)throw Error(g.phaseKey+' did not complete')}
function run(){const S=load();let n=0,frames=0,mechanics=new Set();for(const[id,levels]of Object.entries(S.campaigns)){assert.equal(levels.length,10);let previous;for(let round=0;round<10;round++)for(const seed of [11,278,9021,132005]){let awards=0;let g;const api={render(){},stage(){},tell(){},complete(){awards++},animate(t,f,end){for(const value of [0,.25,.5,.75,1]){f(value);assert(!/NaN|undefined/.test(g.draw()),g.phaseKey+' invalid intermediate frame');frames++}end()}};g=S.games.create(id,round,seed,api);const picture=g.draw(),fingerprint=g.mechanic+'|'+g.prompt+'|'+g.controls();assert(!/NaN|undefined/.test(picture));if(seed===11){assert.notEqual(fingerprint,previous,'Same consecutive level');previous=fingerprint;mechanics.add(g.mechanic)}g.action('test');assert(!g.done,'Unsolved initial setup must not pass');assert.equal(awards,0);solve(g);assert.equal(awards,1);g.action('test');assert.equal(awards,1);n++}assert.throws(()=>S.games.create(id,10,1,{render(){},stage(){}}),/Campaign complete/)}
const api={render(){},stage(){},tell(){},complete(){},animate(t,f,e){f(1);e()}};
let p=S.games.create('paper',4,1,api);p.action('select','0');p.action('scoop');p.action('select','3');p.action('scoop');assert.equal(p.s.cells.reduce((a,b)=>a+b,0),12);assert(!p.done);
let press=S.games.create('paper',5,1,api);press.action('pressure','3');press.action('roller','495');press.action('test');assert(!press.done&&press.s.torn);press.action('reset');solve(press);
let black=S.games.create('shadows',6,1,api);black.action('show');black.action('oy','215');assert(black.s.alarm&&black.s.seen.length===0);black.action('switch');black.action('oy','155');black.action('switch');solve(black);
let paper=S.games.create('paper',9,1,api);paper.action('recycle');paper.action('recycle');assert.equal(paper.s.water,0);paper.action('undo');assert.equal(paper.s.water,3);
let rotor=S.games.create('spinner',8,1,api);rotor.pointer(100,100,'start');rotor.pointer(101,102,'end');rotor.action('test');assert(!rotor.done);
const report={campaigns:3,authoredLevels:30,distinctMechanics:mechanics.size,completeLevelRuns:n,animationFrames:frames,negativePaths:'passed',noAutomaticLoop:'passed'};fs.writeFileSync('/tmp/science-campaign-qa.json',JSON.stringify(report,null,2));console.log(report)}
module.exports={load,solve,files,run};if(require.main===module)run();
