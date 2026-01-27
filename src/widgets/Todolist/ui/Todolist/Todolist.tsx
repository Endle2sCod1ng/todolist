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
import type { TasksState } from "../../model/types/task";
import { useEffect, useState } from "react";
import {  todolistApi } from "../../model/api/todolistsApi";

import type { FilterValues } from "../../model/types/filter";

interface TodolistProps {
  className?: string;
}
export const Todolist = ({ className }: TodolistProps) => {
  const [tls, setTls] = useState<TodolistTypeExtends[]>([]);

  useEffect(() => {
    todolistApi.getTodolist().then((res) => {
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
    todolistApi.createTodolist(title).then((res) => {
      const filter: FilterValues = "all";
      setTls([...tls, { ...res.data.data.item, filter }]);
    });
  };

  const deleteTodolist = (todolistId: string) => {
    todolistApi
      .deleteTodolist(todolistId)
      .then(() => setTls([...tls.filter((tl) => tl.id !== todolistId)]));
  };

  const chnageTodolistTitle = ({
    todolistId,
    title,
  }: {
    todolistId: string;
    title: string;
  }) => {
    todolistApi
      .changeTodolistTitle({ title, id: todolistId })
      .then(() =>
        setTls(tls.map((tl) => (tl.id === todolistId ? { ...tl, title } : tl))),
      );
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
