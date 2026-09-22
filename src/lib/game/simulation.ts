import type { GameState, Question } from './types';
import { QUESTIONS } from './questions';
export function random(s:GameState){s.seed=(Math.imul(s.seed,1664525)+1013904223)>>>0;return s.seed/4294967296;}
export function log(s:GameState,kind:GameState['events'][number]['kind'],text:string,at:number){s.events.unshift({id:++s.serial,kind,text,at});s.events=s.events.slice(0,80);}
export function pickQuestion(s:GameState,topic?:Question['topic']){
 const pool=QUESTIONS.filter(q=>!topic||q.topic===topic);
 let fresh=pool.filter(q=>!s.seenQuestions.includes(q.id));
 if(!fresh.length){s.seenQuestions=s.seenQuestions.filter(id=>!pool.some(q=>q.id===id));fresh=pool;}
 const q=fresh[Math.floor(random(s)*fresh.length)];s.seenQuestions.push(q.id);return q.id;
}
