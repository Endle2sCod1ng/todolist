import { CreateItemForm } from "@/feature/CreateItemForm";
import List from "@mui/material/List";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { MuiTodolistItem } from "../TodolistItem/MuiTodolistItem";
import Paper from "@mui/material/Paper";
import {createTodolistAC} from "../../model/reducers/todolistsReducer";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hooks";
import { selectTodolists } from "../../model/selectors/todolistsSelectors";
import { selectTasks } from "../../model/selectors/tasksSelectors";
import type { RootState } from "@/app/providers/StoreProvider/store/store";
import type { TodolistType } from "../../model/types/todolist";
import type { TasksState } from "../../model/types/task";

interface TodolistProps {
  className?: string;
}
export const MuiTodolist = ({ className }: TodolistProps) => {
  const dispatch = useAppDispatch();

  const todolists = useAppSelector<RootState, TodolistType[]>(selectTodolists);
  const tasks = useAppSelector<RootState, TasksState>(selectTasks);

  const createTodolist = (title: string) => {
    const action = createTodolistAC(title);
    dispatch(action);
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
          {todolists?.map((tl) => {
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
                  <MuiTodolistItem
                    key={tl.id}
                    todolistId={tl.id}
                    title={tl.title}
                    tasks={filtredTasks}
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
