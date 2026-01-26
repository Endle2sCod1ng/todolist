import type { FilterValues } from "./filter";

export interface TodolistType {
  id: string;
  title: string;
  filter: FilterValues;
}

export type TodolistApiType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};


export interface TodolistTypeExtends extends TodolistApiType {
  filter: FilterValues;
}