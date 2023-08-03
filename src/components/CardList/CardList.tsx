"use client"
import React, { useEffect, useRef, useState } from "react";

import { apiBase } from '@/api';
import { useAudioRefList } from "@/app/store";

import { CardMusic } from "@/components/CardMusic";

export const CardList = (): React.ReactElement => {
  const [playlist, setPlayList] = useState<IMusicPlayer.Playlist>({ tracks: { items: [] } });
  const { setAudioRefList } = useAudioRefList((state) => state);

  const audioRef = useRef<HTMLAudioElement[]>([]);
  
  const handleList = () => {
    apiBase.get(`playlists/5VhUPmOwSNuj1ZShpIdKbK`).then(response => {
      const itemsValid = response.data.tracks.items.filter((item: IMusicPlayer.Track) => item.track.preview_url);
      setPlayList({ tracks: { items: itemsValid } });
    }).catch(error => {
      throw new Error(error);
    })
  }

  useEffect(() => {
    handleList();
  }, []);

  useEffect(() => {
    if(audioRef.current.length > 0){
      setAudioRefList(audioRef.current, playlist?.tracks.items)
    }
  }, [playlist]);

  return (
    <div className="flex flex-col items-center h-[442px] w-[750px] max-sm:w-full max-w-[750px] max-sm:h-full md:order-1 order-2 rounded-[40px] max-sm:rounded-[15px] overflow-hidden">
      <header className="sticky top-0 z-30 h-[80px] max-sm:h-[60px] w-full rounded-t-[40px] max-sm:rounded-t-[15px] bg-[#FDFEFF] dark:bg-dark-black-30 flex-shrink-0 p-[32px] max-sm:p-[15px] shadow-[2px_0px_25px_2px_rgba(0,0,0,0.02)]">
        <h2 className="text-light-title-main font-bold text-xl traking-[1px] dark:text-dark-title-main">{playlist?.name}</h2>
      </header>
      <main className="flex flex-col items-center h-full w-full bg-[rgba(255,255,255,0.80)] dark:bg-[rgba(57,42,56,0.80)] overflow-y-scroll rounded-b-[40px] max-sm:rounded-b-[15px]">
      {playlist && playlist.tracks.items.length > 0 && playlist?.tracks.items.map(({ track }, idx) => {
        return (
          <CardMusic key={track.id} track={track} idx={idx} ref={element => audioRef.current[idx] = element}  />
        )
      })}
      </main>
    </div>
  )
}