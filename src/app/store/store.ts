"use client"
import { create } from "zustand"

export const useCurrentTrack = create<IMusicPlayer.CurrentTrackStore>((set) => ({
  currentTrackRef: "",
  paused: false,
  currentTrackInfos: {} as IMusicPlayer.objectTrack,
  action: '',
  setAction: (action: string) => set({ action: action }),
  setPaused: (paused) => set({ paused }),
  setCurrentTrack: (newTrackRef: HTMLAudioElement | string, newTrackInfos: IMusicPlayer.objectTrack) => set({ currentTrackRef:  newTrackRef, currentTrackInfos: newTrackInfos })
}));

export const useAudioRefList = create((set) => ({
  audioRefList: [],
  audioList: [],
  setAudioRefList: (refList: HTMLAudioElement[], listAudio: IMusicPlayer.Track[]) => set({ audioRefList: refList, audioList: listAudio })
}));

