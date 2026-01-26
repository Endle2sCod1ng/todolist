import axios from "axios";
import type { TodolistApiType } from "../types/todolist";
import type { BaseResponse } from "../types/api";

export const token = "";
export const apiKey = '';

export const getTodolistApi = () => {
  axios
    .get<TodolistApiType[]>(
      "https://social-network.samuraijs.com/api/1.1/todo-lists",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then((res) => {
      console.log(res.data);
    });
};

export const createTodolistApi = (title: string) => {
  axios
    .post<BaseResponse<{ item: TodolistApiType; }>>(
      'https://social-network.samuraijs.com/api/1.1/todo-lists',
      { title },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'API-KEY': apiKey,
        },
      }
    )
    .then(res => console.log(res.data));
};

export const deleteTodolistApi = (id: string) => {
  axios
    .delete<BaseResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'API-KEY': apiKey,
      },
    })
    .then(res => console.log(res.data));
};

export const changeTodolistTitleApi = (id: string, title: string) => {
  axios
    .put<BaseResponse>(
      `https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
      { title },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'API-KEY': apiKey,
        },
      }
    )
    .then(res => console.log(res.data));
};