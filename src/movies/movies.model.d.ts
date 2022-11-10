export interface movieDTO {
  id: number;
  title: string;
  poster: string;
}

export interface movieCreateDTO {
  title: string;
  inTheaters: boolean;
  trailer: string;
  releaseDate?: Date;
  poster?: File;
  posterURL?: string;
}

export interface landingPageDTO {
  inTheaters?: movieDTO[];
  upcomingReleases?: movieDTO[];
}
