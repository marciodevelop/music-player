"use client"
import { useCurrentTrack } from "@/app/store";
import React, { useEffect, useRef, useState } from "react";
import Play from '@/assets/play.svg';
import Pause from '@/assets/pause.svg';

export const CardMusic = (props: IMusicPlayer.Track): React.ReactElement => {
  const { track } = props;
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const setCurrentTrack = useCurrentTrack((state: IMusicPlayer.CurrentTrackStore) => state.setCurrentTrack);
  const currentTrack = useCurrentTrack((state: IMusicPlayer.CurrentTrackStore) => state.currentTrackRef);


  const handlePlayPause = (): void => {
    const audioIsEqualCurrentTrack = currentTrack?.currentSrc === audioRef.current?.currentSrc;
    if (audioIsEqualCurrentTrack || !currentTrack?.currentSrc) {
      
      if (isPlaying) {
        audioRef.current?.pause();
      } else {
        audioRef.current?.play();
      }
    } else {
      if (!isPlaying) {
        currentTrack.pause();
        audioRef.current?.play();
      } else {
        audioRef.current?.pause();
        currentTrack.play();
      }
    }
    
    setIsPlaying(!isPlaying);
  }

  useEffect(() => {
    if (isPlaying) {
      setCurrentTrack(audioRef.current, track);
    }
  }, [isPlaying]);

  useEffect(() => {
    if(currentTrack.currentSrc !== audioRef.current?.currentSrc){
      setIsPlaying(false);
    }
  }, [currentTrack])

  return (
    <div className="flex items-center justify-between w-[85.9%] max-sm:w-[98%] min-h-[100px] shadow-[0px_25px_40px_0px_rgba(0,0,0,0.02)] rounded-3xl bg-light-white dark:bg-dark-black-30 mt-[45px] ml-[42px] max-sm:ml-[0px]">
      <div className="min-w-[84px] h-[84px] sticky max-sm:ml-[8px] ml-[-32px] my-[8px] rounded-[20px] bg-cover bg-no-repeat shadow-[0px_15px_30px_0px_rgba(0,0,0,0.16)]" style={{ backgroundImage: `url(${track.album.images[2].url})` }} />
      <div className="flex flex-col mr-auto ml-[30px]" >
        <label className="text-light-title-main dark:text-dark-title-main font-normal text-base traking-[0.16px]">{track.name}</label>
        <label className="text-[rgba(124,141,181,0.72)] dark:text-dark-title-main font-normal text-sm traking-[0.14px]">{track.artists[0].name}</label>
      </div>
      <button onClick={handlePlayPause} className="flex items-center justify-center w-[78px] h-[44px] rounded-[14px] mr-[10px] lg:mr-[48px] md:mr-[10px] dark:bg-dark-black-40 bg-light-white shadow-[0px_15px_30px_0px_rgba(0,0,0,0.06)]">
        {isPlaying ? <Pause /> : <Play />}
        <span className="font-extralight text-xs ml-[10px] text-[rgba(49,61,88,1)] dark:text-light-white">{track.duration_ms}</span>
        <audio ref={audioRef}>
          <source src={track.preview_url} />
        </audio>
      </button>
    </div>
  );
};