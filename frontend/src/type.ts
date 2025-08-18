// src/types.ts
export interface Member {
  id: string;
  name: string;
  email: string;
  avatar?: string; // keep optional (safe for both cases)
}

export interface Trainer {
  id: string;
  name: string;
  email: string;
  avatar?: string; // optional, if you want to show an avatar later
}