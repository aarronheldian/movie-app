export interface DataTrendingAll {
  page: number;
  results: Trending[];
  total_pages: number;
  total_results: number;
}

export interface Trending {
  backdrop_path: string;
  id: number;
  name?: string;
  original_name?: string;
  original_title?: string;
  overview: string;
  poster_path: string;
  media_type: string;
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  first_air_date?: string;
  release_date?: string;
  vote_average: number;
  vote_count: number;
  origin_country: string[];
}
