export interface ICat {
  id: string;
  url: string;
  score: number;
  votes: IVote[];
  favorite: boolean;
}

export interface IVote {
  id: number;
  image_id: string;
  value: number;
  created_at: string;
}

export interface IFavorite {
  id: number;
  image_id: string;
  created_at: string;
}
