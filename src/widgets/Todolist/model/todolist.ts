export type FilterValues = "all" | "active" | "completed";

export interface TodolistType {
  id: string;
  title: string;
  filter: FilterValues;
}
