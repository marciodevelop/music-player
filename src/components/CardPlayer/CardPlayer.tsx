"use client"
import { useEffect, useState } from 'react';
import { useCurrentTrack, useAudioRefList } from "@/app/store";
import { MdSkipPrevious, MdSkipNext, MdFastRewind, MdPause, MdPlayArrow, MdFastForward } from 'react-icons/md';
import { formatTime } from '@/utils';

export const CardPlayer = () => {
  const currentTrackInfos = useCurrentTrack((state: IMusicPlayer.objectTrack) => state.currentTrackInfos);
  const { currentTrackRef } = useCurrentTrack((state: IMusicPlayer.CurrentTrackStore) => state);
  const setPaused = useCurrentTrack((state: any) => state.setPaused);
  const paused = useCurrentTrack((state: any) => state.paused);
  const { audioRefList, audioList } = useAudioRefList((state: any) => state);
  const setCurrentTrack = useCurrentTrack((state: any) => state.setCurrentTrack);
  const { setAction, action } = useCurrentTrack((state: any) => state);

  const [progress, setProgress] = useState(0);
  const [decreaseDuration, setDecreaseDuration] = useState(0);
  const [isFastNext, setIsFastNext] = useState<boolean>(false);
  const [isFastPrev, setIsFastPrev] = useState<boolean>(false);

  const styledNotAction = { cursor: `${currentTrackRef?.paused ? 'not-allowed' : 'pointer'}` }

  const updateProgress = () => {
    if (currentTrackRef) {
      const { currentTime, duration } = currentTrackRef;
      const progressPercentage = (currentTime / duration) * 100;
      setProgress(progressPercentage);

      const currentDecrease = duration - currentTime;

      setDecreaseDuration(currentDecrease);
    }
  };

  const handleTimeUpdate = () => {
    updateProgress();
  };

  const handleNextTrack = () => {
    const currentItemIndex = audioList?.findIndex((music: IMusicPlayer.Track) => music.track.id == currentTrackInfos.id);
    
    if(currentItemIndex == audioList.length - 1){
      currentTrackRef.pause();
    }
    if (audioList?.length > 0 && currentItemIndex !== -1) {
        setCurrentTrack(audioRefList[currentItemIndex + 1], audioList[currentItemIndex + 1]?.track);
      }
      
    setAction('next');
  }

  const handlePrevTrack = () => {
    const currentItemIndex = audioList?.findIndex((music: IMusicPlayer.Track) => music.track.id == currentTrackInfos.id);

    if(currentItemIndex == 0){
      currentTrackRef.pause();
    }
    if (audioList?.length > 0 && currentItemIndex !== -1) {
      setCurrentTrack(audioRefList[currentItemIndex - 1], audioList[currentItemIndex - 1]?.track);
    }
    setAction('prev');
  }

  const handlePlayPause = () => {
    if (currentTrackRef.paused) {
      currentTrackRef.play();
    } else {
      currentTrackRef.pause();
    }
    setPaused(!paused);
  }

  useEffect(() => {
    if(isFastNext && currentTrackRef.playbackRate == 1){
      currentTrackRef.playbackRate = 2
    }
    if(!isFastNext && currentTrackRef?.playbackRate == 2){
      currentTrackRef.playbackRate = 1
    }
  }, [isFastNext]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentTrackRef?.currentTime > 1 && isFastPrev) {
        currentTrackRef.currentTime -= 1;
      }
    }, 100);
    return () => clearInterval(interval);
  }, [isFastPrev]);

  useEffect(() => {
    updateProgress();
    const interval = setInterval(updateProgress, 1000);
    return () => clearInterval(interval);
  }, [currentTrackRef]);

  useEffect(() => {
    const currentItemIndex = audioList?.findIndex((music) => music.track.id == currentTrackInfos?.id);

    if(currentTrackInfos?.preview_url){
      if(action == 'next'){
        audioRefList[currentItemIndex - 1]?.pause();
        audioRefList[currentItemIndex]?.play();
      }
      if(action == "prev"){
        audioRefList[currentItemIndex + 1]?.pause();
        audioRefList[currentItemIndex]?.play();
      }
    }else{
      audioRefList[currentItemIndex - 1]?.pause();
      if(action == 'next'){
        setCurrentTrack(audioRefList[currentItemIndex + 1], audioList[currentItemIndex + 1]?.track);
      }
      if(action == "prev"){
        setCurrentTrack(audioRefList[audioList.length -1], audioList[audioList.length -1]?.track);
      }
    }
    
  }, [currentTrackInfos])


  return (
    <div className="flex flex-col max-sm:flex-row items-center max-sm:justify-between py-4 max-sm:px-4 h-[442px] lg:w-[280px] md:min-w-[240px] max-sm:h-40 max-sm:sticky max-sm:z-50 max-sm:top-0 max-sm:w-full md:max-w-[280px] sm:w-full max-sm:rounded-[15px] rounded-[40px] bg-[rgba(255,255,255,0.80)] dark:bg-[rgba(57,42,56,0.80)] order-1 md:order-2">
      <div className="h-[213px] w-[248px] max-sm:h-[80px] max-sm:w-[100px] rounded-[20px] shadow-[0px_20p_60px_0px_rgba(0,0,0,0.15)] bg-cover bg-no-repeat" style={{ backgroundImage: currentTrackInfos && `url(${currentTrackInfos.album?.images[0].url})` }} />
      <div className="flex flex-col items-center mt-[19px] max-sm:mt-0 max-sm:items-start max-sm:w-[200px] max-sm:justify-start max-sm:mr-auto max-sm:ml-4">
        <h2 className="text-lg font-normal tracking-[1px] text-light-title-main dark:text-light-white">{currentTrackInfos?.name}</h2>
        <h3 className="text-xs font-normal text-[rgba(124,141,181,0.72)]">{currentTrackInfos?.artists?.[0].name}</h3>
      </div>
      {currentTrackRef &&
        <audio onTimeUpdate={handleTimeUpdate} ref={currentTrackRef} >
          <source src={currentTrackInfos?.preview_url} />
        </audio>
      }
      <div className="flex items-center w-[85%] h-[4px] max-sm:fixed max-sm:top-0 max-sm:w-full max-sm:h-[10px] bg-[rgba(255,154,69,0.42)] dark:bg-dark-black-10 rounded-lg mt-[24px] max-sm:mt-0">
        <div
          className="h-full bg-[#FF7E3A] dark:bg-dark-main"
          style={{ width: `${progress}%` }}
        />
        <div
          className="h-[8px] w-[8px] bg-[#FF7E3A] dark:bg-dark-main ml-[-4px] max-sm:hidden rounded-lg cursor-pointer"
          style={{ left: `${progress}%` }}
        />
      </div>
      <div className='flex justify-between w-[85%] font-medium text-[10px] mt-[3px] max-sm:hidden dark:text-dark-title-main text-light-title-main'>
        <span>{formatTime(currentTrackRef?.duration)}</span>
        <span>- {formatTime(decreaseDuration)}</span>
      </div>
      <div className='flex justify-around w-[85%] items-center max-sm:w-[200px]'>
        <MdSkipPrevious 
          onClick={handlePrevTrack}  
          size="20px"
          className="cursor-pointer text-[#FF7E3A] dark:text-[rgba(124,141,181,0.72)]" />
        <MdFastRewind 
          onMouseUp={() => setIsFastPrev(false)} 
          onMouseDown={() => setIsFastPrev(true)}
          style={styledNotAction}
          disabled={currentTrackRef?.paused}
          size="20px" 
          className="cursor-pointer max-sm:hidden text-[#FF7E3A] dark:text-[rgba(124,141,181,0.72)]" />
        <button 
          onClick={handlePlayPause} 
          className='flex justify-center items-center w-[56px] h-[56px] rounded-[50%] max-sm:absolute max-sm:bottom-[-28px] max-sm:right-[70px] bg-[#FF7E3A] dark:bg-dark-black-60 shadow-[rgba(0px_15px_30px_rgba(255,133,61,0.16)]'>
          {currentTrackRef?.paused ? <MdPlayArrow className="h-[36px] w-[36px]  text-light-white dark:text-[rgba(124,141,181,0.72)]" /> :
            <MdPause className="h-[36px] w-[36px] text-light-white dark:text-[rgba(124,141,181,0.72)]" />
          }
        </button>
        <MdFastForward 
          onMouseUp={() => setIsFastNext(false)} 
          onMouseDown={() => setIsFastNext(true)} 
          style={styledNotAction}
          disabled={currentTrackRef?.paused}
          size="20px"
          className="cursor-pointer max-sm:hidden text-[#FF7E3A] dark:text-[rgba(124,141,181,0.72)]" />
        <MdSkipNext
          onClick={handleNextTrack}
          size="20px"
          className="cursor-pointer text-[#FF7E3A] dark:text-[rgba(124,141,181,0.72)]" />
      </div>
    </div>
  )
}