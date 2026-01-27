import type { FilterValues } from "./filter";
import type { TodolistApiType } from "./todolistsApi.types";

export interface TodolistType {
  id: string;
  title: string;
  filter: FilterValues;
}

export interface TodolistTypeExtends extends TodolistApiType {
  filter: FilterValues;
}