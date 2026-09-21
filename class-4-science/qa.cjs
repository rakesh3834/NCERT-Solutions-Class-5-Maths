// Current campaigns plus regression coverage for the 17 retained games.
const assert=require('assert'),campaign=require('./campaign-qa.cjs'),old=require('./missions-qa.cjs');
campaign.run();const S=campaign.load();let runs=0;
for(const t of S.topics.filter(t=>!t.campaign))for(const round of [0,1,7,8,15,16,23,24,47])for(let seed=1;seed<=20;seed++){
let awards=0;const g=S.games.create(t.id,round,seed*7919,{render(){},stage(){},tell(){},complete(){awards++},animate(t,f,e){f(1);e()}});
assert(!/NaN|undefined/.test(g.draw()));old.solve(g);assert.equal(awards,1);assert(!/NaN|undefined/.test(g.draw()));runs++;
}console.log({retainedGames:17,regressionRuns:runs});
