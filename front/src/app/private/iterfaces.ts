import { UserI } from '../public/public.interfaces';

export type Status = 'BACKLOG' | 'TODO' | 'DONE';

export type Complexity = 'EASY' | 'MEDIUM' | 'HARD';

export interface TodoI {
  id?: number;
  createdBy?: UserI;
  updatedBy?: UserI;
  createdAt?: Date;
  updatedAt?: Date;

  status: Status;
  title: string;
  subTitle: string;
  text: string;

  complexity: Complexity;
}
