export type FilterValues = "all" | "active" | "completed";

export interface TodolistType {
  id: string;
  title: string;
  filter: FilterValues;
}

export type Todolist = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};