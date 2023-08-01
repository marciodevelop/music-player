"use client"
import { create } from "zustand"

export const useCurrentTrack = create<IMusicPlayer.CurrentTrackStore>((set) => ({
  currentTrack: "",
  setCurrentTrack: (newTrack: string): void => set({ currentTrack:  newTrack})
}))

