import type { PlantType } from '@/lib/assets-manifest';
export type { PlantType } from '@/lib/assets-manifest';
export type Mode = 'standard' | 'showcase';
export type Card = 'growth' | 'trap';
export type Plant = { type: PlantType; plantedAt: number; readyAt: number; remaining: number; woodOffer: boolean };
export type Garden = {
  id: string; name: string; avatar: 'gardener' | 'farmer' | 'scholar' | 'harvester'; bot: boolean;
  plots: (Plant | null)[]; score: number; harvests: Record<PlantType, number>;
  wood: number; fence: number; cards: Record<Card, number>; trap: boolean;
  raidSeason: number; immuneUntil: number; lost: number;
};
export type Question = { id: string; topic: 'people' | 'rights'; text: string; options: string[]; answer: number; explanation: string; source: string };
export type Monster = { id: number; garden: string; kind: 'doi' | 'dot' | 'boss'; question: string; slot: number | null; arrivesAt: number; endsAt: number; botAt: number };
export type Duel = { id: number; attacker: string; defender: string; question: string; startedAt: number; endsAt: number; botAt: number; answers: Record<string, number>; fence: number; attackerFence: number; trap: boolean; amount: number; counter: number };
export type GameEvent = { id: number; at: number; kind: 'harvest' | 'plant' | 'raid' | 'monster' | 'defense' | 'season' | 'card'; text: string };
export type Outcome = { id: number; title: string; text: string; question: string | null; answer: number | null; correct: boolean; at: number };
export type GameState = {
  version: 3; mode: Mode; room: string; startedAt: number; lastTick: number; duration: 480; seed: number;
  questions?: Question[]; gardens: Garden[]; events: GameEvent[]; serial: number;
  monsters: Monster[]; duels: Duel[]; nextWaveAt: number; nextBotAt: number; nextBotRaidAt: number;
  woodChoice: { slot: number; endsAt: number } | null; outcome: Outcome | null; seenQuestions: string[]; seasonNotice: number;
};
export type GameAction =
  | { type: 'plant'; slot: number; plant: PlantType }
  | { type: 'harvest'; slot: number } | { type: 'harvest-all' }
  | { type: 'wood-choice'; wood: boolean } | { type: 'build' }
  | { type: 'start-raid'; target: string }
  | { type: 'answer-monster'; id: number; answer: number }
  | { type: 'answer-duel'; id: number; answer: number }
  | { type: 'card'; card: Card }
  | { type: 'dismiss-outcome' } | { type: 'dismiss-season' };

