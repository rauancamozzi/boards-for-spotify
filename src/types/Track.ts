interface Album {
  images: {
    url: string;
  }[];
}

interface Artist {
  name: string;
}

export interface Track {
  id: string;
  name: string;
  album: Album;
  artists: Artist[];
}

export interface RecentTrack {
  id: string;
  name: string;
  album: Album;
  artists: Artist[];
  track: Track;
}