export interface Restaurant {
  name: string;
  genre: string;
  distance: string;
  budget: string;
  recommendation: string;
  notes: string;
  url: string;
}

export interface SearchParams {
  stations: string;
  cuisine: string;
  budget: string;
}