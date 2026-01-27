import type { BaseResponse } from "../types/api";
import type { TodolistApiType } from "../types/todolistsApi.types";
import { instance } from "./instance";

export const todolistApi = {
  getTodolist() {
    return instance
      .get<TodolistApiType[]>("/todo-lists");
  },

  changeTodolistTitle(payload: { id: string, title: string; }) {
    const { title, id } = payload;
    return instance
      .put<BaseResponse>(
        `/todo-lists/${id}`,
        { title }
      );
  },
  createTodolist(title: string) {
    return instance
      .post<BaseResponse<{ item: TodolistApiType; }>>(
        '/todo-lists',
        { title }
      );
  },
  deleteTodolist(id: string) {
    return instance
      .delete<BaseResponse>(`/todo-lists/${id}`);
  }
}








