import type { Duel, GameState, Garden } from './types';
import { busy, endAt, multiplier, seasonAt, totalScore } from './rules';
import { questionById } from './questions';
import { log, pickQuestion, random } from './simulation';

// Transfer in DISPLAYED total points, including points from independence.
// Normalize each base separately; never multiply the same transfer twice.
export function transferTotal(from:Garden,to:Garden,requested:number){
 const amount=Math.max(0,Math.min(totalScore(from),Math.floor(requested)));
 const beforeFrom=totalScore(from),beforeTo=totalScore(to);
 from.score=(beforeFrom-amount)/multiplier(from);
 to.score=(beforeTo+amount)/multiplier(to);
 from.lost+=amount;
 return amount;
}
export function raidBlock(s:GameState,attacker:Garden,defender:Garden,now:number):string{
 if(seasonAt(s,now)<2)return 'Trộm mở từ mùa 2.';
 if(attacker.id===defender.id)return 'Không thể thách đấu chính mình.';
 if(now+8000>endAt(s))return 'Không đủ 8 giây trước khi hết ván.';
 if(busy(s,attacker.id)||busy(s,defender.id))return 'Một trong hai vườn đang bận quiz hoặc chọn gỗ.';
 if(attacker.raidSeason===seasonAt(s,now))return 'Bạn đã dùng lượt trộm của mùa này.';
 if(defender.immuneUntil>now)return 'Vườn này vừa đấu xong, đang nghỉ 20 giây.';
 if(totalScore(defender)<5)return 'Cần ít nhất 5 Điểm Tổng để có thể lấy 20%.';
 return '';
}
export function startDuel(s:GameState,a:Garden,d:Garden,at:number){
 const block=raidBlock(s,a,d,at);if(block)return block;
 a.raidSeason=seasonAt(s,at);
 const duel:Duel={id:++s.serial,attacker:a.id,defender:d.id,question:pickQuestion(s),startedAt:at,endsAt:at+8000,botAt:at+4000,answers:{},fence:d.fence,attackerFence:a.fence,trap:d.trap,amount:Math.floor(totalScore(d)*.2),counter:Math.floor(totalScore(a)*.2)};
 d.trap=false;
 s.duels.push(duel);
 log(s,'raid',a.name+' thách đấu '+d.name+'. 8 giây, cược 20% Điểm Tổng.',at);
 return '';
}
export function resolveDuel(s:GameState,d:Duel,at:number){
 if(!s.duels.some(x=>x.id===d.id))return;
 const a=s.gardens.find(g=>g.id===d.attacker)!,v=s.gardens.find(g=>g.id===d.defender)!;
 const q=questionById(d.question),ac=d.answers[a.id]===q.answer,vc=d.answers[v.id]===q.answer;
 let text='',amount=0,result:'none'|'counter'|'steal'='none';
 if(d.trap||(!ac&&vc&&random(s)<.5)){
  result='counter';
  amount=transferTotal(a,v,Math.floor(d.counter*(d.attackerFence>0?.5:1)));
  if(amount&&d.attackerFence>0)a.fence=Math.max(0,a.fence-1);
  text=(d.trap?'Trúng bẫy · ':'Phản đòn · ')+a.name+' mất '+amount+' Điểm Tổng cho '+v.name+'.';
 }else if(ac&&random(s)<(vc?.3:.7)){
  result='steal';
  amount=transferTotal(v,a,Math.floor(d.amount*(d.fence>0?.5:1)));
  if(amount&&d.fence>0)v.fence=Math.max(0,v.fence-1);
  text=a.name+' trộm được '+amount+' Điểm Tổng từ '+v.name+'.'+(d.fence>0?' Rào giảm một nửa thiệt hại.':'');
 }else text='Không chuyển điểm.';
 a.immuneUntil=at+20000;v.immuneUntil=at+20000;
 s.duels=s.duels.filter(x=>x.id!==d.id);
 log(s,'raid',text,at);
 if(a.id==='you'||v.id==='you'){
  const answer=d.answers.you??null;
  const attacking=a.id==='you',won=result==='steal'?attacking:result==='counter'?!attacking:false;
  const title=result==='none'?(attacking?'Trộm thất bại':'Đã giữ được điểm'):result==='steal'?(attacking?'Trộm thành công':'Bị trộm'):(attacking?(d.trap?'Trúng bẫy':'Bị phản đòn'):'Phản đòn thành công');
  const summary=result==='none'?'Không chuyển điểm.':(won?'+':'−')+amount+' điểm.'+(!won&&(result==='steal'?d.fence:d.attackerFence)>0?' Rào đỡ 50%.':'');
  s.outcome={id:++s.serial,title,text:summary,question:q.id,answer,correct:answer===q.answer,at};
 }
}
