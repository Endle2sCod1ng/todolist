import { CreateItemForm } from "@/feature/CreateItemForm";
import List from "@mui/material/List";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { TodolistItem } from "../TodolistItem/TodolistItem";
import Paper from "@mui/material/Paper";
import { createTodolistAC } from "../../model/reducers/todolistsReducer";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hooks";
import { selectTodolists } from "../../model/selectors/todolistsSelectors";
import { selectTasks } from "../../model/selectors/tasksSelectors";
import type { RootState } from "@/app/providers/StoreProvider/store/store";
import type {
  TodolistType,
  TodolistTypeExtends,
} from "../../model/types/todolist";
import type { TodolistApiType } from "../../model/types/todolist";
import type { TasksState } from "../../model/types/task";
import { useEffect, useState } from "react";
import { apiKey, deleteTodolistApi, token } from "../../model/api/api";
import axios from "axios";
import type { FilterValues } from "../../model/types/filter";
import type {
  BaseResponse,
} from "../../model/types/api";

interface TodolistProps {
  className?: string;
}
export const Todolist = ({ className }: TodolistProps) => {
  const [tls, setTls] = useState<TodolistTypeExtends[]>([]);

  useEffect(() => {
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
        const filter: FilterValues = "all";
        setTls([
          ...res.data.map((tl) =>
            tl === tl ? { ...tl, filter } : { ...tl, filter },
          ),
        ]);
      });
  }, []);

  const dispatch = useAppDispatch();

  const todolists = useAppSelector<RootState, TodolistType[]>(selectTodolists);
  const tasks = useAppSelector<RootState, TasksState>(selectTasks);

  const createTodolist = (title: string) => {
    const action = createTodolistAC(title);
    dispatch(action);
    axios
      .post<BaseResponse<{ item: TodolistApiType }>>(
        "https://social-network.samuraijs.com/api/1.1/todo-lists",
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "API-KEY": apiKey,
          },
        },
      )
      .then((res) => {
        console.log(res.data);
        const filter: FilterValues = "all";
        setTls([...tls, { ...res.data.data.item, filter }]);
      });
  };

  const deleteTodolist = (todolistId: string) => {
    deleteTodolistApi(todolistId);
    setTls([...tls.filter((tl) => tl.id !== todolistId)]);
  };

  const chnageTodolistTitle = ({
    todolistId,
    title,
  }: {
    todolistId: string;
    title: string;
  }) => {
    axios
      .put<BaseResponse>(
        `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "API-KEY": apiKey,
          },
        },
      )
      .then((res) => console.log(res.data));
  };

  return (
    <Container maxWidth={"lg"}>
      <Grid
        container
        sx={{ mb: "30px" }}
      >
        <CreateItemForm createItem={createTodolist} />
      </Grid>
      <List className={`${className ? className : ""}`}>
        <Grid
          container
          spacing={4}
        >
          {tls?.map((tl) => {
            let filtredTasks = tasks[tl.id] || [];

            if (tl.filter === "active") {
              filtredTasks = tasks[tl.id].filter((t) => !t.isDone);
            }
            if (tl.filter === "completed") {
              filtredTasks = tasks[tl.id].filter((t) => t.isDone);
            }
            return (
              <Grid key={tl.id}>
                <Paper sx={{ mb: "0 20px 20px 20px" }}>
                  <TodolistItem
                    key={tl.id}
                    todolistId={tl.id}
                    title={tl.title}
                    tasks={filtredTasks}
                    deleteTodolist={deleteTodolist}
                    chnageTodolistTitle={chnageTodolistTitle}
                    filter={tl.filter}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </List>
    </Container>
  );
};
