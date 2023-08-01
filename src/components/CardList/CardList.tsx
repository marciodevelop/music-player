"use client"
import React, { useEffect, useState } from "react";
import { useCurrentTrack } from "@/app/store/store";

import { apiBase } from '@/api';

import { CardMusic } from "@/components/CardMusic";

export const CardList = (): React.ReactElement => {
  const [playlist, setPlayList] = useState<IMusicPlayer.Playlist>();

  const currentTrack = useCurrentTrack(state => state.currentTrack);
  
  const handleList = () => {
    apiBase.get(`playlists/5VhUPmOwSNuj1ZShpIdKbK`).then(response => {
      setPlayList(response.data)
    });
  }

  useEffect(() => {
    handleList();
  }, []);

  return (
    <div className="flex flex-col items-center h-[442px] md:w-[750px] md:max-w-[750px] rounded-[40px] order-2 md:order-1 md:min-w-[100px] overflow-hidden">
      <header className="sticky top-0 z-30 h-[80px] w-full bg-[#FDFEFF] dark:bg-dark-black-30 rounded-t-[40px] flex-shrink-0 p-[32px] shadow-[2px_0px_25px_2px_rgba(0,0,0,0.02)]">
        <h2 className="text-light-title-main font-bold text-xl traking-[1px] dark:text-dark-title-main">{playlist?.name}</h2>
      </header>
      <main className="flex flex-col items-center h-full w-full bg-[rgba(255,255,255,0.80)] dark:bg-[rgba(57,42,56,0.80)] overflow-y-scroll rounded-b-[40px]">
      {playlist && playlist.tracks.items.length > 0 && playlist?.tracks.items.map(({ track }) => {
        return (
          <CardMusic key={track.id} track={track} />
        )
      })}
      </main>
    </div>
  )
}