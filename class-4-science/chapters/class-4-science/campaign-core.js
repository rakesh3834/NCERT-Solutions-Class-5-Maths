'use strict';
(() => {
const S=SAFARI,A=S.art,{svg,text,line,rect,dot,poly,hit,btn,C}=A;
const {words,icon}=S.scienceArt;
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x)),dist=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1]);
const knob=(label,key,value,min,max,step=1)=>`<label class="lab-knob"><span>${S.util.escape(label)} <b>${value}</b></span><input type="range" aria-label="${S.util.escape(label)}" data-adjust="${key}" value="${value}" min="${min}" max="${max}" step="${step}"></label>`;
const caption=s=>words(300,330,s,57,17);
const badge=(x,y,label,color=C[1])=>rect(x-58,y-19,116,35,color)+text(x,y+5,label,17,'#fff');
const meter=(x,y,w,value,max,label,color=C[2])=>rect(x,y,w,12,'#e3e7d5')+rect(x,y,Math.max(1,w*clamp(value/max,0,1)),12,color)+text(x+w/2,y+34,label,18);
const floor=()=>rect(18,291,564,41,'#e6d6b8')+line([18,293],[582,293],'#b1ad88',3);
function run(g,pass,good,bad,frame=()=>{},duration=1100){if(g.s.testing||g.done)return;g.s.testing=true;g.s.attempts++;g.api.animate(duration,t=>{g.s.time=t;frame(t);g.scene()},()=>{g.s.testing=false;if(pass()){g.success(good)}else{g.s.failed=true;g.say(typeof bad==='function'?bad():bad);g.refresh()}})}
function drag(g,handles,update){g.pointerOnTargets=true;g.s.input='draw';g.pointer=(x,y,type)=>{if(g.s.testing||g.done)return;if(type==='start'){const all=handles();let best=all.map((h,i)=>[i,Math.hypot(x-h.x,y-h.y)]).sort((a,b)=>a[1]-b[1])[0];g.s.grab=best&&best[1]<55?best[0]:null;if(g.s.grab!==null){g.s.selected=g.s.grab;g.scene()}}if((type==='move'||type==='end')&&g.s.grab!==null&&g.s.grab!==undefined){update(g.s.grab,clamp(x,25,575),clamp(y,60,305));g.s.changed=true;g.scene()}if(type==='end'||type==='cancel')g.s.grab=null}}
function handle(x,y,label,selected=false,color=C[0],id=0){return hit(label,'select',id,dot(x,y,27,selected?'#fff4ba':color,'stroke="#375e52" stroke-width="3"')+text(x,y+7,label,20))}
function polygonInfo(points){let cross=0,x=0,y=0;for(let i=0;i<points.length;i++){let a=points[i],b=points[(i+1)%points.length],k=a[0]*b[1]-b[0]*a[1];cross+=k;x+=(a[0]+b[0])*k;y+=(a[1]+b[1])*k}return{area:Math.abs(cross/2),x:x/(3*cross),y:y/(3*cross)}}
function drawInk(g,finish){g.mode='doodle';g.drawingGame=true;g.s.ink=[];g.pointer=(x,y,type)=>{if(g.done||g.s.testing)return;if(type==='start')g.s.ink=[[x,y]];if(type==='move')g.s.ink.push([x,y]);if(type==='cancel')g.s.ink=[];if(type==='end'){g.s.ink.push([x,y]);finish?.(g.s.ink)}g.scene()}}
const ink=g=>g.s.ink?.length?`<polyline points="${g.s.ink.map(p=>p.join(',')).join(' ')}" stroke="#805a9f" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`:'';
S.campaigns={};
function register(id,levels){S.campaigns[id]=levels;S.constructors[id]=g=>{if(g.round<0||g.round>=levels.length)throw new RangeError('Campaign complete; choose a level explicitly.');const d=levels[g.round];g.campaign=true;g.title=d.name;g.phaseKey=d.key;g.mechanic=d.mechanic;g.q={level:d.key};g.s={attempts:0,time:0,testing:false,selected:0};g.prompt=d.goal;g.hint=d.help;g.feedback=d.intro||'Move the objects, try your idea and watch what happens.';d.build(g);const draw=g.draw;g.draw=()=>svg(text(300,27,`${String(g.round+1).padStart(2,'0')} / ${levels.length} · ${d.skill}`,17)+draw(),d.name);const action=g.action;g.action=(k,v)=>{if(!g.done&&!g.s.testing)action(k,v)};}}
S.lab={...A,words,icon,clamp,dist,knob,caption,badge,meter,floor,run,drag,handle,polygonInfo,drawInk,ink,register};
})();
