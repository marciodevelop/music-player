"use client"
import { create } from "zustand"

export const useCurrentTrack = create<IMusicPlayer.CurrentTrackStore>((set) => ({
  currentTrackRef: "",
  currentTrackInfos: {},
  setCurrentTrack: (newTrackRef: string, newTrackInfos: IMusicPlayer.objectTrack) => set({ currentTrackRef:  newTrackRef, currentTrackInfos: newTrackInfos })
}))

