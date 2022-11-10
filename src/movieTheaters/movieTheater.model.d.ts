export interface movieTheaterDTO {
  id: number;
  name: string;
  latitude?: number;
  longitude?: number;
}


export interface movieTheaterCreateDTO {
  name: string;
  latitude?: number;
  longitude?: number;
}
