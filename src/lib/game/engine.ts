import type { GameAction, GameState, Garden, Mode, PlantType } from './types';
import { PLANTS, PLANT_TYPES, SEASONS, busy, canBuild, endAt, hasWoodBalance, isFinished, progress, seasonAt } from './rules';
import { questionById } from './questions';
import { log, random } from './simulation';
import { spawnWave, resolveMonster } from './pve';
import { startDuel, resolveDuel } from './pvp';

function garden(id:string,name:string,bot:boolean,avatar:Garden['avatar']):Garden{
 return {id,name,bot,avatar,plots:Array(9).fill(null),score:0,harvests:{'doc-lap':0,'tu-do':0,'hanh-phuc':0},wood:0,fence:0,cards:{growth:0,trap:0},trap:false,raidSeason:0,immuneUntil:0,lost:0};
}
function plant(s:GameState,g:Garden,slot:number,type:PlantType,at:number){
 g.plots[slot]={type,plantedAt:at,readyAt:at+PLANTS[type].seconds*1000,remaining:PLANTS[type].points,woodOffer:random(s)<.25};
}
export function createGame(name:string,mode:Mode,room:string,now=Date.now()):GameState{
 const s:GameState={version:3,mode,room:room.trim().toUpperCase().slice(0,16)||'VUON-202',startedAt:now,lastTick:now,duration:480,seed:20260922,
 gardens:[garden('you',name.trim().slice(0,24)||'Người gieo mầm',false,'gardener'),garden('may','Mây Trắng',true,'scholar'),garden('nang','Nắng Sớm',true,'farmer'),garden('sen','Sen Hồng',true,'harvester')],
 events:[],serial:0,monsters:[],duels:[],nextWaveAt:now+40000,nextBotAt:now+5000,nextBotRaidAt:now+45000,woodChoice:null,outcome:null,seenQuestions:[],seasonNotice:1};
 for(const g of s.gardens){
  PLANT_TYPES.forEach((type,i)=>plant(s,g,i,type,mode==='showcase'?now-PLANTS[type].seconds*1000:now));
  if(mode==='showcase'){g.score=190;g.harvests={'doc-lap':1,'tu-do':1,'hanh-phuc':1};g.wood=3;g.cards={growth:1,trap:1};}
 }
 log(s,'season','Ván 8 phút bắt đầu. Trộm mở từ mùa 2.',now);
 return s;
}
function collect(s:GameState,g:Garden,slot:number,at:number,wood=false){
 const p=g.plots[slot];if(!p||progress(s,p,at)<1)return;
 if(wood){g.wood++;}else{g.score+=p.remaining;if(p.remaining>0)g.harvests[p.type]++;}
 g.plots[slot]=null;
 if(!g.bot)log(s,'harvest',wood?'Đổi cả quả lấy 1 gỗ; không cộng điểm hoặc số quả đã hái.':'Hái '+PLANTS[p.type].name+' +'+p.remaining+' điểm gốc.',at);
}
function offerOrCollect(s:GameState,g:Garden,slot:number,at:number){
 const p=g.plots[slot];if(!p||progress(s,p,at)<1)return false;
 if(p.woodOffer&&g.wood<6&&p.remaining>0){s.woodChoice={slot,endsAt:at+8000};return true;}
 collect(s,g,slot,at);return true;
}
function botStep(s:GameState,at:number){
 for(const g of s.gardens.filter(g=>g.bot)){
  if(busy(s,g.id))continue;
  for(let i=0;i<9;i++){
   const p=g.plots[i];
   if(p&&progress(s,p,at)>=1&&random(s)<.6)collect(s,g,i,at,p.woodOffer&&g.wood<3&&g.fence===0);
   if(!g.plots[i])plant(s,g,i,PLANT_TYPES[(i+(g.id==='nang'?1:0))%3],at);
  }
  if(canBuild(g)){g.wood-=3;g.fence=3;}
  if(g.cards.trap>0&&!g.trap){g.cards.trap--;g.trap=true;}
  if(g.cards.growth>0){g.cards.growth--;g.plots.forEach(p=>{if(p&&p.readyAt>at)p.readyAt=at+(p.readyAt-at)*.7;});}
 }
}
function botRaid(s:GameState,at:number){
 for(const a of s.gardens.filter(g=>g.bot)){
  if(a.raidSeason===seasonAt(s,at)||random(s)>.55)continue;
  const targets=s.gardens.filter(g=>g.id!==a.id);
  const start=Math.floor(random(s)*targets.length);
  for(let i=0;i<targets.length;i++)if(!startDuel(s,a,targets[(start+i)%targets.length],at))break;
 }
}
/** Event-driven simulation: deadlines are processed chronologically, even after
 * tab suspension. No per-tick growth mutation or timer reset is permitted. */
export function advanceGame(state:GameState,now:number):GameState{
 const end=Math.min(now,endAt(state));
 if(!Number.isFinite(end)||end<=state.lastTick)return state;
 const s=structuredClone(state);
 while(s.lastTick<end){
  const nextSeason=s.startedAt+seasonAt(s,s.lastTick)*120000;
  const times=[s.nextBotAt,s.nextBotRaidAt,s.nextWaveAt,nextSeason>endAt(s)?Infinity:nextSeason];
  if(s.woodChoice)times.push(s.woodChoice.endsAt);
  for(const m of s.monsters){times.push(m.endsAt);if(m.garden!=='you')times.push(m.botAt);}
  for(const d of s.duels){times.push(d.endsAt);if(d.botAt<=d.endsAt)times.push(d.botAt);}
  const at=Math.min(...times.filter(t=>t>s.lastTick));
  if(at>end||!Number.isFinite(at))break;
  s.lastTick=at;
  if(at===nextSeason&&at<endAt(s)){
   const season=seasonAt(s,at);s.seasonNotice=season;
   log(s,'season','MÙA '+season+' · '+SEASONS[season-1].name+'. Bạn có 1 lượt trộm mới.',at);
  }
  if(s.woodChoice&&s.woodChoice.endsAt<=at){collect(s,s.gardens[0],s.woodChoice.slot,at);s.woodChoice=null;}
  for(const m of [...s.monsters]){
   if(m.garden!=='you'&&m.botAt<=at)resolveMonster(s,m,random(s)<.68?questionById(m.question).answer:-1,at);
   else if(m.endsAt<=at)resolveMonster(s,m,null,at);
  }
  for(const d of [...s.duels]){
   if(d.botAt<=at){
    const q=questionById(d.question);
    for(const id of [d.attacker,d.defender])if(id!=='you')d.answers[id]=random(s)<.68?q.answer:(q.answer+1)%4;
    d.botAt=d.endsAt+1;
   }
   if(d.endsAt<=at)resolveDuel(s,d,at);
  }
  if(s.nextBotAt<=at){if(at<endAt(s))botStep(s,at);s.nextBotAt=at+5000;}
  if(s.nextBotRaidAt<=at){if(at<endAt(s))botRaid(s,at);s.nextBotRaidAt=at+20000;}
  if(s.nextWaveAt<=at){spawnWave(s,at);s.nextWaveAt=at+60000;}
 }
 s.lastTick=end;
 if(end===endAt(s)){
  // No unfinished question may survive match completion.
  s.monsters=[];s.duels=[];s.woodChoice=null;s.seasonNotice=0;
 }
 return s;
}
export function act(state:GameState,action:GameAction,now:number):{state:GameState;message:string}{
 now=Math.max(now,state.lastTick);
 const advanced=advanceGame(state,now),s=structuredClone(advanced),g=s.gardens[0];
 const reject=(message:string)=>({state:advanced,message});
 if(action.type==='dismiss-outcome'){s.outcome=null;return {state:s,message:''};}
 if(action.type==='dismiss-season'){s.seasonNotice=0;return {state:s,message:''};}
 if(isFinished(s,now))return reject('Ván đã kết thúc.');
 if('slot' in action&&(!Number.isInteger(action.slot)||action.slot<0||action.slot>8))return reject('Ô đất không hợp lệ.');
 if(action.type==='answer-monster'){
  const m=s.monsters.find(m=>m.id===action.id&&m.garden==='you');
  if(!m||now<m.arrivesAt||now>=m.endsAt||!Number.isInteger(action.answer)||action.answer<0||action.answer>3)return reject('Câu hỏi chưa mở hoặc đã hết hạn.');
  resolveMonster(s,m,action.answer,now);return {state:s,message:''};
 }
 if(action.type==='answer-duel'){
  const d=s.duels.find(d=>d.id===action.id&&(d.attacker==='you'||d.defender==='you'));
  if(!d||now>=d.endsAt||'you' in d.answers||!Number.isInteger(action.answer)||action.answer<0||action.answer>3)return reject('Đáp án đã khóa hoặc hết giờ.');
  d.answers.you=action.answer;return {state:s,message:'Đã chọn. Chờ kết quả.'};
 }
 if(action.type==='wood-choice'){
  if(!s.woodChoice)return reject('Lựa chọn đã kết thúc.');

  collect(s,g,s.woodChoice.slot,now,action.wood);s.woodChoice=null;
  return {state:s,message:s.events[0].text};
 }
 if(busy(s,'you'))return reject('Hãy hoàn thành quiz hoặc lựa chọn đang mở trước.');
 switch(action.type){
  case 'plant':
   if(!PLANT_TYPES.includes(action.plant)||g.plots[action.slot])return reject('Ô đang có cây hoặc loại cây không hợp lệ.');
   plant(s,g,action.slot,action.plant,now);log(s,'plant','Đã gieo '+PLANTS[action.plant].name+' ở ô '+(action.slot+1)+'.',now);break;
  case 'harvest':
   if(!offerOrCollect(s,g,action.slot,now))return reject('Cây chưa chín.');break;
  case 'harvest-all':{
   let found=false;
   for(let i=0;i<9;i++){if(s.woodChoice)break;if(offerOrCollect(s,g,i,now))found=true;}
   if(!found)return reject('Chưa có cây chín.');break;
  }
  case 'build':
   if(!canBuild(g))return reject('Cần 3 gỗ và chưa có rào.');
   g.wood-=3;g.fence=3;log(s,'defense','Đã xây rào · bền 3/3.',now);break;
  case 'start-raid':{
   const target=s.gardens.find(g=>g.id===action.target);
   if(!target)return reject('Không tìm thấy vườn.');
   const reason=startDuel(s,g,target,now);if(reason)return reject(reason);break;
  }
  case 'card':
   if(!['growth','trap'].includes(action.card)||g.cards[action.card]<=0)return reject('Bạn chưa có thẻ này. Trả lời đúng quái có 30% cơ hội nhận thẻ.');
   if(action.card==='trap'){
    if(g.trap)return reject('Bẫy đã sẵn sàng, không thể chồng thêm.');
    g.cards.trap--;g.trap=true;log(s,'card','Bẫy đã gài: kẻ trộm tiếp theo thất bại và bị phản đòn 20% Điểm Tổng.',now);
   }else{
    if(!g.plots.some(p=>p&&p.readyAt>now))return reject('Không có cây đang lớn để tăng tốc.');
    g.cards.growth--;g.plots.forEach(p=>{if(p&&p.readyAt>now)p.readyAt=now+(p.readyAt-now)*.7;});
    log(s,'card','Tăng tốc: giảm ngay 30% thời gian còn lại của các cây đang lớn.',now);
   }break;
 }
 return {state:s,message:s.woodChoice?'Bạn tìm được gỗ. Chọn nhận điểm hoặc đổi cả quả lấy 1 gỗ.':s.events[0]?.text||''};
}

