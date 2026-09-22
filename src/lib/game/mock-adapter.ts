import type { GameState } from './types';
import { QUESTIONS } from './questions';
const KEY='steal-a-happiness:mock:v3';
const finite=(n:unknown):n is number=>typeof n==='number'&&Number.isFinite(n);
const positive=(n:unknown)=>finite(n)&&n>=0;
const qids=new Set(QUESTIONS.map(q=>q.id));
export function isGameSave(value:unknown):value is GameState{
 if(!value||typeof value!=='object')return false;
 const s=value as GameState;
 try{
  return s.version===3&&['standard','showcase'].includes(s.mode)&&s.duration===480&&typeof s.room==='string'&&finite(s.startedAt)&&finite(s.lastTick)&&s.lastTick>=s.startedAt&&s.lastTick<=s.startedAt+480000&&positive(s.seed)&&positive(s.serial)&&[s.nextWaveAt,s.nextBotAt,s.nextBotRaidAt].every(finite)&&Number.isInteger(s.seasonNotice)&&s.seasonNotice>=0&&s.seasonNotice<=4&&
  Array.isArray(s.gardens)&&s.gardens.length===4&&s.gardens[0].id==='you'&&new Set(s.gardens.map(g=>g.id)).size===4&&s.gardens.every(g=>typeof g.id==='string'&&typeof g.name==='string'&&typeof g.bot==='boolean'&&positive(g.score)&&positive(g.lost)&&Number.isInteger(g.fence)&&g.fence>=0&&g.fence<=3&&Number.isInteger(g.wood)&&g.wood>=0&&g.wood<=6&&positive(g.cards.growth)&&positive(g.cards.trap)&&typeof g.trap==='boolean'&&positive(g.raidSeason)&&finite(g.immuneUntil)&&Object.values(g.harvests).length===3&&['doc-lap','tu-do','hanh-phuc'].every(t=>Number.isInteger(g.harvests[t as keyof typeof g.harvests])&&g.harvests[t as keyof typeof g.harvests]>=0)&&Array.isArray(g.plots)&&g.plots.length===9&&g.plots.every(p=>p===null||(['doc-lap','tu-do','hanh-phuc'].includes(p.type)&&finite(p.plantedAt)&&finite(p.readyAt)&&p.readyAt>=p.plantedAt&&positive(p.remaining)&&typeof p.woodOffer==='boolean')))&&
  Array.isArray(s.events)&&s.events.every(e=>finite(e.at)&&typeof e.text==='string')&&Array.isArray(s.seenQuestions)&&s.seenQuestions.every(q=>qids.has(q))&&
  Array.isArray(s.monsters)&&s.monsters.every(m=>positive(m.id)&&s.gardens.some(g=>g.id===m.garden)&&['doi','dot','boss'].includes(m.kind)&&qids.has(m.question)&&finite(m.arrivesAt)&&finite(m.endsAt)&&finite(m.botAt)&&m.endsAt-m.arrivesAt===12000&&(m.slot===null||Number.isInteger(m.slot)&&m.slot>=0&&m.slot<9))&&
  Array.isArray(s.duels)&&s.duels.every(d=>positive(d.id)&&qids.has(d.question)&&s.gardens.some(g=>g.id===d.attacker)&&s.gardens.some(g=>g.id===d.defender)&&d.attacker!==d.defender&&finite(d.endsAt)&&finite(d.startedAt)&&d.endsAt-d.startedAt===8000&&finite(d.botAt)&&positive(d.amount)&&positive(d.counter)&&positive(d.fence)&&positive(d.attackerFence)&&typeof d.trap==='boolean'&&d.answers&&Object.values(d.answers).every(a=>Number.isInteger(a)&&a>=0&&a<=3))&&
  (s.woodChoice===null||Number.isInteger(s.woodChoice.slot)&&s.woodChoice.slot>=0&&s.woodChoice.slot<9&&finite(s.woodChoice.endsAt)&&!!s.gardens[0].plots[s.woodChoice.slot])&&
  (s.outcome===null||typeof s.outcome.text==='string'&&typeof s.outcome.title==='string'&&finite(s.outcome.at)&&(s.outcome.question===null||qids.has(s.outcome.question)));
 }catch{return false;}
}
// Each tab owns its simulation. Reload resumes it; another tab cannot overwrite
// its clocks or roll back a submitted answer through shared localStorage.
export const mockPersistence={
 load():GameState|null{const raw=sessionStorage.getItem(KEY);if(!raw)return null;const parsed:unknown=JSON.parse(raw);if(!isGameSave(parsed))throw new Error('Invalid save');return parsed;},
 save(s:GameState){sessionStorage.setItem(KEY,JSON.stringify(s));},
 clear(){sessionStorage.removeItem(KEY);}
};
