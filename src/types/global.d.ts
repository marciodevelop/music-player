
declare module IMusicPlayer {

  type imagesAlbum = {
    url: string;
  }

  type albumTrack = {
    images: imagesAlbum[];
  }

  type Artists = {
    name: string;
  }

  type itemsTracks = {
    items: Track[];
  };

  type objectTrack = {
    id: string;
    duration_ms: number;
    name: string;
    preview_url: string;
    artists: Artists[];
    album: albumTrack;
  }

  interface CurrentTrackStore {
    currentTrackRef: HTMLAudioElement | string;
    currentTrackInfos: objectTrack;
    setCurrentTrack: (ref: HTMLAudioElement | string, info: objectTrack) => void;
    paused: boolean;
    setPaused: (paused: boolean) => void;
    action: string;
    setAction: (action: string) => void
  }

  interface Track {
    track: objectTrack;
  }

  interface Playlist {
    name: string;
    id: string;
    tracks: itemsTracks;
  }


}