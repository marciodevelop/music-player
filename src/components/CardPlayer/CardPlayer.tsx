"use client"
import { useCurrentTrack } from "@/app/store";

export const CardPlayer = () => {
  const currentTrackInfos = useCurrentTrack((state: IMusicPlayer.objectTrack) => state.currentTrackInfos);

  console.log(currentTrackInfos);
  return (
    <div className="flex flex-col max-sm:flex-row items-center max-sm:justify-between py-4 max-sm:px-4 h-[442px] lg:w-[280px] md:min-w-[240px] max-sm:h-40 max-sm:sticky max-sm:z-50 max-sm:top-0 max-sm:w-full md:max-w-[280px] sm:w-full max-sm:rounded-[15px] rounded-[40px] bg-[rgba(255,255,255,0.80)] dark:bg-[rgba(57,42,56,0.80)] order-1 md:order-2">
      <div className="h-[213px] w-[248px] max-sm:h-[120px] max-sm:w-[120px] rounded-[20px] shadow-[0px_20p_60px_0px_rgba(0,0,0,0.15)] bg-cover bg-no-repeat" style={{ backgroundImage: `url(${currentTrackInfos.album.images[0].url})` }} />
      <div className="flex flex-col items-center mt-[19px] max-sm:mt-0 max-sm:justify-start max-sm:mr-auto max-sm:ml-4">
        <h2 className="text-lg font-normal tracking-[1px] text-light-title-main dark:text-light-white">{currentTrackInfos.name}</h2>
        <h3 className="text-xs font-normal text-[rgba(124,141,181,0.72)]">{currentTrackInfos.artists[0].name}</h3>
      </div>
    </div>
  )
}