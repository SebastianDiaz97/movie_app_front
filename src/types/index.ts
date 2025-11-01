export type JsonData = {
  page: number;
  results: MediaData[];
  total_pages: number;
  total_results: number;
};

export type MediaData = {
  poster_path: string;
  id: number;
  vote_average: number;
  title?: string;
  name?: string; // Optional for TV shows
  key?: string; // Optional for videos
  type?: string;
};

export type MediaType = "movie" | "tv";

export type MediaDetail = {
  id: number;
  title?: string; // For movies
  name?: string; // For TV shows
  overview: string;
  poster_path: string;
  release_date?: string; // For movies
  first_air_date?: string; // For TV shows
  genres: { id: number; name: string }[];
  vote_average: number;
  number_of_seasons?: number; // For TV shows
};

export type CreditsDetail = {
  cast: CastMember[];
};

export type CastMember = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  roles?: [
    {
      character: string;
    }
  ];
  order: number;
};

export type MediaLists =
  | "popular" //serie and movie
  | "top_rated" //serie and movie
  | "upcoming" //only movie
  | "now_playing" //only movie
  | "on_the_air" //only serie
  | "airing_today"; //only serie

export type Media = {
  poster_path: string;
  title: string;
  tmbdId: number;
  type: MediaType;
};

export type Season = {
  air_date: string;
  episodes: SeasonDetail[];
  name: string;
  vote_average: number;
  poster_path: string;
};

export type SeasonDetail = {
  air_date: string;
  episode_number: number;
  name: string;
  overview: string;
  runtime: number;
  still_path: string;
  vote_average: number;
};


export type FormData = {
  email: string;
  password: string;
};