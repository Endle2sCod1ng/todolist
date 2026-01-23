import axios from "axios";

export const token = "";
export const apiKey = '';

export const getTodolistApi = () => {

};

export const createTodolistApi = (title: string) => {
  axios
    .post(
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