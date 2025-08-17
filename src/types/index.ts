export type Cat = {
  id: number;
  name: string;
  url: string;
};

export type CatsResponse = {
  images: Cat[];
};

export type Score = {
  id: number;
  name: string;
  wins: number;
  played: number;
};

export type Pair = {
  left: Cat;
  right: Cat;
};