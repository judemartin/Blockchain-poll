export interface Poll {
  id: number;
  question: string;
  results: number[];
  options: number[];
  thumbnail: string;
}

export interface Voter {
  id: string; //some hash value
  voted: number[];
}
