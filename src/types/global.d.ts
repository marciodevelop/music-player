
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

  interface CurrentTrackStore {
    currentTrack: HTMLAudioElement;
    setCurrentTrack: (param: HTMLAudioElement | null) => void
  }

  interface Track {
    track: {
      id: string;
      duration_ms: number;
      name: string;
      preview_url: string;
      artists: Artists[];
      album: albumTrack;
    }
  }

  interface Playlist {
    name: string;
    id: string;
    tracks: itemsTracks;
  }


}