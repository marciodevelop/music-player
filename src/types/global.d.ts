
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
    currentTrackInfos: Track;
    setCurrentTrack: (ref: HTMLAudioElement | null, info: objectTrack) => void
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