'use strict';
(() => {
const S=SAFARI,{text,line,rect,dot,poly,C}=S.art,E=S.util.escape;
function words(x,y,s,max=19,size=20){const lines=[];let line='';String(s).split(' ').forEach(w=>{if((line+' '+w).trim().length>max&&line){lines.push(line);line=w}else line=(line+' '+w).trim()});if(line)lines.push(line);return lines.map((s,i)=>text(x,y+i*(size+4),s,size)).join('')}
function icon(kind,x,y,size=45){const icons={school:'🏫',market:'🧺',health:'🏥',park:'🌳',library:'📚',post:'✉',bank:'🏦',tree:'🌳',flower:'🌼',bee:'🐝',bird:'🐦',fish:'🐟',frog:'🐸',leaf:'🍃',seed:'🌱',butterfly:'🦋',spider:'🕷',boat:'⛵',walk:'🚶',bus:'🚌',train:'🚆',phone:'☎',letter:'✉',video:'▣',parcel:'📦',water:'💧',grain:'🌾',dal:'🥣',fruit:'🍎',vegetable:'🥕',soap:'🫧',hands:'👐',sleep:'☾',play:'⚽',coat:'🧥',umbrella:'☂',sun:'☀',moon:'☾',paper:'▤',box:'📦',tissue:'▱',pencil:'✎',tools:'⚒',money:'₹',star:'✦'};return text(x,y,icons[kind]||kind,size).replace('<text ','<text class="scene-icon" ')}
function person(x,y,c=C[0]){return dot(x,y-35,17,'#e7b88b')+rect(x-21,y-14,42,57,c)+line([x-11,y+43],[x-15,y+72],C[2],10)+line([x+11,y+43],[x+15,y+72],C[2],10)}
function tree(x,y,s=1){return `<g transform="translate(${x} ${y}) scale(${s})">${rect(-9,0,18,78,'#b8895e')}${dot(-20,-5,39,'#a2c486')}${dot(20,-8,42,'#8bb27a')}${dot(0,-37,36,'#bbd99b')}</g>`}
function building(label,type,x,y,w=142){return rect(x-w/2,y,w,104,'#fff9',`stroke="#90ad8f" stroke-width="2"`)+poly([[x-w/2-8,y],[x,y-38],[x+w/2+8,y]],'#b8cf9d')+icon(type,x,y+47,37)+words(x,y+78,label,19,16)}
function terrain(type){return type==='Mountains'?poly([[35,265],[153,78],[245,222],[357,50],[562,265]],'#9ab9a7'):type==='Desert'?`<path d="M30 258Q135 85 273 202Q425 104 571 258Z" fill="#e5c58e"/>`:type==='Coast'?rect(32,151,538,128,'#9ecdd7')+poly([[30,129],[298,165],[364,215],[280,286],[30,286]],'#dfcc9d'):rect(35,210,528,70,'#b9d595')+line([35,210],[563,210],'#7fa679',4)}
const phases=['New Moon','Waxing crescent','First quarter','Waxing gibbous','Full Moon','Waning gibbous','Last quarter','Waning crescent'];
function moon(index,x=300,y=168,r=90){const angle=index*Math.PI/4,k=Math.cos(angle),wax=index<=4;let body=dot(x,y,r,'#52647c');if(index===4)return body+dot(x,y,r,'#ffedbb');if(index===0)return body;const side=wax?1:-1;let pts=[];for(let j=0;j<=50;j++){const t=-Math.PI/2+j*Math.PI/50;pts.push([x+side*r*Math.cos(t),y+r*Math.sin(t)])}for(let j=50;j>=0;j--){const t=-Math.PI/2+j*Math.PI/50;pts.push([x+side*k*r*Math.cos(t),y+r*Math.sin(t)])}return body+poly(pts,'#ffedbb','stroke-width="0"')}
S.scienceArt={words,icon,person,tree,building,terrain,moon,phases};
})();
