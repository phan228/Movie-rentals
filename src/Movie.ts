export enum MovieId {
  F001 = "F001",
  F002 = "F002",
}

export enum MovieCode {
  CHILDRENS = "childrens",
  REGULAR = "regular",
  NEW = "new",
}

export interface Dictionary {
  [MovieType: string]: number;
}

export interface PriceAndPoint {
  price: number;
  point: number;
  deleted: boolean;
}

export const Movies = new Map<string, PriceAndPoint>([
  ["childrens", { price: 1.5, point: 1, deleted: false }],
  ["regular", { price: 1.5, point: 1, deleted: false }],
  ["new", { price: 3, point: 2, deleted: false }],
])

interface MovieDetails {
  title: string;
  code: MovieCode;
}

export type MovieCollection = {
  [MovieID in MovieId]: MovieDetails;
};
