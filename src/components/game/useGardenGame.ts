'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { act, advanceGame, createGame } from '@/lib/game/engine';
import { mockPersistence } from '@/lib/game/mock-adapter';
import type { GameAction, GameState, Mode } from '@/lib/game/types';

export function useGardenGame(enabled=true){
 const [state,setState]=useState<GameState|null>(null),[ready,setReady]=useState(false),[now,setNow]=useState(0),[error,setError]=useState(''),[notice,setNotice]=useState<{text:string;id:number}|null>(null);
 const ref=useRef<GameState|null>(null),lastSave=useRef(0),clock=useRef(0);
 const timeNow=useCallback(()=>{clock.current=Math.max(clock.current,Date.now(),ref.current?.lastTick||0);return clock.current;},[]);
 const commit=useCallback((next:GameState,force=true)=>{
  ref.current=next;setState(next);
  if(force||next.lastTick-lastSave.current>=1000){
   try{mockPersistence.save(next);lastSave.current=next.lastTick;}catch{setError('Không lưu được trong tab. Bạn vẫn có thể chơi, nhưng tải lại có thể mất tiến độ.');}
  }
 },[]);
 useEffect(()=>{
  if(!enabled)return;
  let saved:GameState|null=null;
  try{saved=mockPersistence.load();}catch{setError('Ván lưu không hợp lệ. Hãy bắt đầu ván 8 phút mới.');}
  if(saved){ref.current=saved;commit(advanceGame(saved,timeNow()));}
  setNow(timeNow());setReady(true);
 },[commit,timeNow,enabled]);
 useEffect(()=>{
  if(!ready||!enabled)return;
  const tick=()=>{const time=timeNow();setNow(time);if(ref.current){const next=advanceGame(ref.current,time);if(next!==ref.current)commit(next,false);}};
  const flush=()=>{tick();if(ref.current)commit(ref.current);};
  const id=window.setInterval(tick,250);document.addEventListener('visibilitychange',flush);window.addEventListener('pagehide',flush);
  return()=>{clearInterval(id);document.removeEventListener('visibilitychange',flush);window.removeEventListener('pagehide',flush);};
 },[ready,commit,timeNow,enabled]);
 useEffect(()=>{if(!notice)return;const id=setTimeout(()=>setNotice(null),4500);return()=>clearTimeout(id);},[notice]);
 const dispatch=useCallback((action:GameAction)=>{
  if(!ref.current)return;
  const time=timeNow(),result=act(ref.current,action,time);commit(result.state);setNow(time);
  if(result.message)setNotice({text:result.message,id:time});
 },[commit,timeNow]);
 const start=useCallback((name:string,mode:Mode,room:string)=>{const time=timeNow();setNow(time);setError('');setNotice(null);commit(createGame(name,mode,room,time));},[commit,timeNow]);
 const reset=useCallback(()=>{ref.current=null;lastSave.current=0;setState(null);setNotice(null);try{mockPersistence.clear();}catch{setError('Không xóa được bản lưu trong tab.');}},[]);
 return {state,ready,now,error,notice,start,dispatch,reset};
}
