import type { Metadata } from 'next';
import { GameEntry } from '@/components/game/GameEntry';
import './game.css';
import './viewport.css';
export const metadata: Metadata={ title:'Steal a Happiness | Khu vườn ba giá trị',description:'Gieo mầm, thu hoạch và bảo vệ khu vườn Độc lập, Tự do, Hạnh phúc. Chơi thử với các vườn mô phỏng.' };
export default function GamePage(){return <GameEntry/>;}
