const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),ts=require('typescript');
require.extensions['.ts']=(module,file)=>module._compile(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,file);
const {createGame,act,advanceGame}=require('../src/lib/game/engine.ts');
const {PLANTS,seasonAt,progress,multiplier,balanceScore,canBuild,formatTime,totalScore,remainingSeconds}=require('../src/lib/game/rules.ts');
const {startDuel,resolveDuel,transferTotal,raidBlock}=require('../src/lib/game/pvp.ts');
const {spawnWave,resolveMonster}=require('../src/lib/game/pve.ts');
const {questionById}=require('../src/lib/game/questions.ts');
const {isGameSave}=require('../src/lib/game/mock-adapter.ts');
const now=1_800_000_000_000;
const make=()=>createGame('Minh','standard','ROOM',now);
function ripe(type,woodOffer=false){return {type,plantedAt:now-PLANTS[type].seconds*1000,readyAt:now,remaining:PLANTS[type].points,woodOffer};}
function isolated(){const s=make();s.nextWaveAt=now+1e7;s.nextBotAt=now+1e7;s.nextBotRaidAt=now+1e7;return s;}
function funded(){const s=isolated();s.startedAt=now-120000;s.gardens.forEach(g=>{g.score=1000;});return s;}
test('8 minutes, four exact seasons, all seeds available immediately',()=>{
 const s=make();assert.equal(s.duration,480);
 assert.equal(seasonAt(s,now+119999),1);assert.equal(seasonAt(s,now+120000),2);
 assert.equal(seasonAt(s,now+240000),3);assert.equal(seasonAt(s,now+360000),4);
 assert.equal(act(s,{type:'plant',slot:5,plant:'hanh-phuc'},now).state.gardens[0].plots[5].readyAt,now+16000);
});
test('countdown boundaries never show 60 seconds',()=>{assert.equal(formatTime(119.9),'02:00');assert.equal(formatTime(59.2),'01:00');assert.equal(formatTime(-1),'00:00');});
test('invalid slots, existing plants, immature harvests do not mutate state',()=>{
 const s=make(),copy=structuredClone(s);
 for(const action of [{type:'plant',slot:0,plant:'tu-do'},{type:'plant',slot:9,plant:'tu-do'},{type:'harvest',slot:0}])assert.deepEqual(act(s,action,now).state,s);
 assert.deepEqual(s,copy);
});
test('growth is monotonic and does not freeze with only independence',()=>{
 let s=isolated();s.gardens[0].plots=[{...ripe('doc-lap'),plantedAt:now,readyAt:now+45000},...Array(8).fill(null)];
 s=advanceGame(s,now+40000);assert.equal(remainingSeconds(s,s.gardens[0].plots[0],now+40000),5);
 s=advanceGame(s,now+50000);assert.equal(progress(s,s.gardens[0].plots[0],now+50000),1);
});
test('balance uses harvested fruit counts, not live plants or point values',()=>{
 const s=make(),g=s.gardens[0];assert.equal(balanceScore(g),0);assert.equal(multiplier(g),.5);
 g.harvests={'doc-lap':10,'tu-do':10,'hanh-phuc':10};assert.equal(balanceScore(g),100);assert.equal(multiplier(g),2);
 g.plots=Array(9).fill(null);assert.equal(multiplier(g),2);
 g.harvests={'doc-lap':5,'tu-do':10,'hanh-phuc':10};assert.equal(multiplier(g),1.25);
});
test('harvest is raw points, no obsolete x3; duplicate harvesting cannot pay twice',()=>{
 const s=isolated(),g=s.gardens[0];g.plots=[ripe('doc-lap'),ripe('tu-do'),ripe('hanh-phuc'),...Array(6).fill(null)];
 const r=act(s,{type:'harvest-all'},now).state;assert.equal(r.gardens[0].score,190);assert.equal(totalScore(r.gardens[0]),380);
 assert.equal(act(r,{type:'harvest-all'},now).state.gardens[0].score,190);
});
test('total score transfers include independence and conserve displayed totals for different multipliers',()=>{
 const s=funded(),a=s.gardens[0],b=s.gardens[1];a.harvests={'doc-lap':10,'tu-do':10,'hanh-phuc':10};
 b.harvests={'doc-lap':10,'tu-do':0,'hanh-phuc':0};
 const x=totalScore(a),y=totalScore(b);assert.equal(transferTotal(b,a,100),100);
 assert.equal(totalScore(a),x+100);assert.equal(totalScore(b),y-100);
 assert.equal(transferTotal(b,a,999999),y-100);assert.equal(totalScore(b),0);
});
test('wood offer works without a plant balance condition; giving up fruit grants no points/count',()=>{
 let s=isolated();s.gardens[0].plots=[ripe('doc-lap'),ripe('tu-do',true),ripe('hanh-phuc'),...Array(6).fill(null)];
 s=act(s,{type:'harvest',slot:1},now).state;assert.equal(s.woodChoice.slot,1);
 s=act(s,{type:'wood-choice',wood:true},now+100).state;assert.equal(s.gardens[0].wood,1);assert.equal(s.gardens[0].score,0);assert.equal(s.gardens[0].harvests['tu-do'],0);
 assert.equal(act(s,{type:'wood-choice',wood:true},now+100).state.gardens[0].wood,1);
});
test('wood choice times out once to points and does not lock garden forever',()=>{
 let s=isolated();s.gardens[0].plots[1]=ripe('tu-do',true);s=act(s,{type:'harvest',slot:1},now).state;
 s=advanceGame(s,now+8000);assert.equal(s.woodChoice,null);assert.equal(s.gardens[0].score,50);
 assert.equal(advanceGame(s,now+16000).gardens[0].score,50);
});
test('fence needs only 3 wood, consumes wood, cannot build twice',()=>{
 let s=isolated();assert.equal(canBuild(s.gardens[0]),false);s.gardens[0].wood=3;
 s=act(s,{type:'build'},now).state;assert.equal(s.gardens[0].fence,3);assert.equal(s.gardens[0].wood,0);
 assert.equal(act(s,{type:'build'},now).state.gardens[0].fence,3);
});
test('duel starts in season 2 without ripe fruit and locks each participant; one attempt per season',()=>{
 const s=funded();s.gardens.forEach(g=>g.plots=Array(9).fill(null));
 assert.equal(startDuel(s,s.gardens[0],s.gardens[1],now),'');
 assert.ok(startDuel(s,s.gardens[2],s.gardens[1],now));assert.ok(startDuel(s,s.gardens[0],s.gardens[3],now));
 resolveDuel(s,s.duels[0],now+8000);
 assert.ok(startDuel(s,s.gardens[0],s.gardens[3],now+30000));
 assert.equal(startDuel(s,s.gardens[0],s.gardens[3],now+120000),'');
});
test('zero-score victim blocked without consuming an attempt',()=>{
 const s=make();assert.ok(raidBlock(s,s.gardens[0],s.gardens[1],now));
 const r=act(s,{type:'start-raid',target:'may'},now).state;assert.equal(r.gardens[0].raidSeason,0);
});
test('correct attacker/wrong defender: one 20% total transfer, not fruit damage',()=>{
 const s=funded();startDuel(s,s.gardens[0],s.gardens[1],now);const d=s.duels[0],q=questionById(d.question);
 d.answers={you:q.answer,may:(q.answer+1)%4};s.seed=0;const before=s.gardens[1].plots[0].remaining;
 resolveDuel(s,d,now+8000);assert.equal(totalScore(s.gardens[0]),600);assert.equal(totalScore(s.gardens[1]),400);assert.equal(s.gardens[1].plots[0].remaining,before);
});
test('fence snapshot halves loss, consumes one durability only on actual damage',()=>{
 const s=funded();s.gardens[1].fence=1;startDuel(s,s.gardens[0],s.gardens[1],now);const d=s.duels[0];d.answers={you:questionById(d.question).answer};s.seed=0;
 s.gardens[1].fence=0;resolveDuel(s,d,now+8000);assert.equal(totalScore(s.gardens[1]),450);assert.equal(s.gardens[1].fence,0);
});
test('wrong attacker/correct defender can counter total score, including independence points',()=>{
 const s=funded();startDuel(s,s.gardens[0],s.gardens[1],now);const d=s.duels[0],q=questionById(d.question);d.answers={you:(q.answer+1)%4,may:q.answer};s.seed=0;
 resolveDuel(s,d,now+8000);assert.equal(totalScore(s.gardens[0]),400);assert.equal(totalScore(s.gardens[1]),600);
});
test('both wrong causes no transfer and preserves fence durability',()=>{
 const s=funded();s.gardens[1].fence=3;startDuel(s,s.gardens[0],s.gardens[1],now);resolveDuel(s,s.duels[0],now+8000);
 assert.equal(totalScore(s.gardens[0]),500);assert.equal(s.gardens[1].fence,3);
});
test('trap is consumed once and forces counter regardless of answers',()=>{
 const s=funded();s.gardens[1].trap=true;startDuel(s,s.gardens[0],s.gardens[1],now);const d=s.duels[0];assert.equal(s.gardens[1].trap,false);d.answers.you=questionById(d.question).answer;
 resolveDuel(s,d,now+8000);assert.equal(totalScore(s.gardens[0]),400);
});
test('answer ID, timeout, and duplicate answer guards prevent stale or repeated submissions',()=>{
 let s=funded();s=act(s,{type:'start-raid',target:'may'},now).state;const d=s.duels[0],answer=questionById(d.question).answer;
 s=act(s,{type:'answer-duel',id:d.id,answer},now+7999).state;assert.equal(s.duels[0].answers.you,answer);
 assert.equal(act(s,{type:'answer-duel',id:d.id,answer:(answer+1)%4},now+7999).state.duels[0].answers.you,answer);
 s=act(s,{type:'answer-duel',id:d.id,answer},now+8000).state;assert.equal(s.duels.length,0);
 const score=totalScore(s.gardens[0]);assert.equal(totalScore(act(s,{type:'answer-duel',id:d.id,answer},now+9000).state.gardens[0]),score);
});
test('monster warnings last 5s, quiz lasts 12s; damage never resets plant timestamps',()=>{
 let s=isolated();spawnWave(s,now);const m=s.monsters.find(m=>m.garden==='you');
 assert.equal(m.arrivesAt,now+5000);assert.equal(m.endsAt,now+17000);
 m.slot=1;const p=s.gardens[0].plots[1],start=p.plantedAt,end=p.readyAt,remaining=p.remaining;
 s=advanceGame(s,now+17000);assert.equal(s.monsters.length,0);assert.equal(s.gardens[0].plots[1].plantedAt,start);assert.equal(s.gardens[0].plots[1].readyAt,end);assert.equal(s.gardens[0].plots[1].remaining,remaining-Math.ceil(remaining*.4));
});
test('correct monster answer does not damage; stale ID cannot get another card',()=>{
 let s=isolated();spawnWave(s,now);const m=s.monsters.find(m=>m.garden==='you'),answer=questionById(m.question).answer;
 s=act(s,{type:'answer-monster',id:m.id,answer},now+5000).state;assert.equal(s.gardens[0].lost,0);
 const cards=structuredClone(s.gardens[0].cards);assert.deepEqual(act(s,{type:'answer-monster',id:m.id,answer},now+5000).state.gardens[0].cards,cards);
});
test('PvE and PvP do not overlap for the same player',()=>{
 const s=funded();startDuel(s,s.gardens[0],s.gardens[1],now);spawnWave(s,now+1000);
 assert.ok(!s.monsters.some(m=>['you','may'].includes(m.garden)));
 const t=funded();spawnWave(t,now);assert.ok(startDuel(t,t.gardens[0],t.gardens[1],now));
});
test('growth card shortens remaining time by 30%, never consumes on all-ripe garden',()=>{
 let s=isolated();s.gardens[0].cards.growth=1;s=act(s,{type:'card',card:'growth'},now+10000).state;
 assert.equal(s.gardens[0].plots[0].readyAt,now+34500);assert.equal(s.gardens[0].cards.growth,0);
 s.gardens[0].cards.growth=1;s.gardens[0].plots=[ripe('doc-lap'),...Array(8).fill(null)];
 assert.equal(act(s,{type:'card',card:'growth'},now+10000).state.gardens[0].cards.growth,1);
});
test('no new encounter can spill past final deadline',()=>{
 const s=funded();assert.ok(startDuel(s,s.gardens[0],s.gardens[1],now+473000));spawnWave(s,now+464000);assert.equal(s.monsters.length,0);
});
test('offline catch-up matches repeated ticks for entire 8-minute match',()=>{
 const s=make();const one=advanceGame(s,now+480000);let many=s;
 for(let t=now+250;t<=now+480000;t+=250)many=advanceGame(many,t);
 assert.deepEqual(one,many);assert.equal(one.lastTick,now+480000);assert.equal(one.duels.length,0);assert.equal(one.monsters.length,0);
 assert.deepEqual(advanceGame(one,now+9999999),one);
 assert.equal(act(one,{type:'harvest-all'},now+480001).state.gardens[0].score,one.gardens[0].score);
});
test('backward clock cannot rewind growth or duplicate events',()=>{
 const s=advanceGame(make(),now+10000);assert.equal(advanceGame(s,now+5000),s);
 const r=act(s,{type:'plant',slot:8,plant:'hanh-phuc'},now+5000).state;assert.equal(r.gardens[0].plots[8].plantedAt,now+10000);
});
test('saved state rejects old version, bad clocks, unknown questions and malformed crops',()=>{
 const s=make();assert.equal(isGameSave(s),true);assert.equal(isGameSave({...s,version:1}),false);
 const bad=structuredClone(s);bad.gardens[0].plots[0].readyAt=NaN;assert.equal(isGameSave(bad),false);
 const encounter=isolated();spawnWave(encounter,now);assert.equal(isGameSave(encounter),true);encounter.monsters[0].question='invalid';assert.equal(isGameSave(encounter),false);
});

test('boss extra independence bite happens only on failure and at the 15% threshold',()=>{
 const s=isolated();spawnWave(s,now);const m=s.monsters.find(m=>m.garden==='you');m.kind='boss';m.slot=1;
 s.seed=1972; // PRNG next draw < .01
 const before=s.gardens[0].plots[0].remaining;resolveMonster(s,m,-1,now+5000);
 assert.equal(s.gardens[0].plots[0].remaining,before-Math.ceil(before*.4));
 const t=isolated();spawnWave(t,now);const n=t.monsters.find(m=>m.garden==='you');n.kind='dot';n.slot=1;t.seed=1972;
 resolveMonster(t,n,-1,now+5000);assert.equal(t.gardens[0].plots[0].remaining,120);
});
test('probability branches remain near 70%, 30%, 50% across seeded duels',()=>{
 for(const [ac,vc,expected] of [[true,false,.7],[true,true,.3],[false,true,.5]]){
  let hits=0;
  for(let i=0;i<2000;i++){
   const s=funded();startDuel(s,s.gardens[0],s.gardens[1],now);const d=s.duels[0],q=questionById(d.question);
   d.answers.you=ac?q.answer:(q.answer+1)%4;d.answers.may=vc?q.answer:(q.answer+1)%4;s.seed=i*7919;
   resolveDuel(s,d,now+8000);if(totalScore(s.gardens[0])!==500)hits++;
  }
  assert.ok(Math.abs(hits/2000-expected)<.035,hits/2000+' vs '+expected);
 }
});
test('terminal growth and zero-value crops cannot generate free balanced harvests',()=>{
 const s=isolated();const p={...ripe('doc-lap'),plantedAt:now+475000,readyAt:now+520000};
 assert.equal(progress(s,p,now+9999999),5/45);
 s.gardens[0].plots[0]={...ripe('doc-lap'),remaining:0};
 const r=act(s,{type:'harvest',slot:0},now).state;assert.equal(r.gardens[0].plots[0],null);assert.equal(r.gardens[0].harvests['doc-lap'],0);
});
test('duplicate resolution is idempotent for both encounter systems',()=>{
 const s=funded();startDuel(s,s.gardens[0],s.gardens[1],now);const d=s.duels[0];d.answers.you=questionById(d.question).answer;s.seed=0;
 resolveDuel(s,d,now+8000);const score=totalScore(s.gardens[0]);resolveDuel(s,d,now+8000);assert.equal(totalScore(s.gardens[0]),score);
 const t=isolated();spawnWave(t,now);const m=t.monsters.find(x=>x.garden==='you');resolveMonster(t,m,-1,now+5000);const loss=t.gardens[0].lost;
 resolveMonster(t,m,-1,now+5000);assert.equal(t.gardens[0].lost,loss);
});
