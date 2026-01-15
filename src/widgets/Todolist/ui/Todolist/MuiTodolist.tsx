import type { FilterValues, TodolistType } from "../../model/types/todolist";

import { CreateItemForm } from "@/feature/CreateItemForm";

import List from "@mui/material/List";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { MuiTodolistItem } from "../TodolistItem/MuiTodolistItem";
import Paper from "@mui/material/Paper";

import {
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  createTodolistAC,
  deleteTodolistAC,
} from "../../model/reducers/todolistsReducer";
import {
  changeTaskStatusAC,
  changeTaskTitleAC,
  createTaskAC,
  deleteTaskAC,
} from "../../model/reducers/tasks-reducer";
import type { RootState } from "@/app/providers/StoreProvider/store/store";
import type { TasksState } from "../../model/types/task";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hooks";

interface TodolistProps {
  className?: string;
}
export const MuiTodolist = ({ className }: TodolistProps) => {
  const dispatch = useAppDispatch();

  const todolists = useAppSelector<RootState, TodolistType[]>(
    (state) => state.todolists
  );
  const tasks = useAppSelector<RootState, TasksState>((state) => state.tasks);

  const deleteTask = ({
    todolistId,
    taskId,
  }: {
    todolistId: string;
    taskId: string;
  }) => {
    dispatch(deleteTaskAC({ taskId, todolistId }));
  };

  const createTask = ({
    todolistId,
    title,
  }: {
    todolistId: string;
    title: string;
  }) => {
    dispatch(createTaskAC({ todolistId, title }));
  };

  const changeTaskStatus = ({
    todolistId,
    taskId,
    isDone,
  }: {
    todolistId: string;
    taskId: string;
    isDone: boolean;
  }) => {
    dispatch(changeTaskStatusAC({ todolistId, taskId, isDone }));
  };

  const changeTaskTitle = ({
    todolistId,
    taskId,
    title,
  }: {
    todolistId: string;
    taskId: string;
    title: string;
  }) => {
    dispatch(changeTaskTitleAC({ todolistId, taskId, title }));
  };

  const changeFilter = ({
    todolistId,
    filter,
  }: {
    todolistId: string;
    filter: FilterValues;
  }) => {
    dispatch(changeTodolistFilterAC({ id: todolistId, filter }));
  };

  const deleteTodolist = (todolistId: string) => {
    dispatch(deleteTodolistAC(todolistId));
    const updateTasks = { ...tasks };
    delete updateTasks[todolistId];
    // setTasks({ ...updateTasks });
  };

  const createTodolist = (title: string) => {
    const action = createTodolistAC(title);
    dispatch(action);
    dispatch(createTodolistAC(title));
    // setTasks({ ...tasks, [action.payload.id]: [] });
  };

  const chnageTodolistTitle = ({
    todolistId,
    title,
  }: {
    todolistId: string;
    title: string;
  }) => {
    dispatch(changeTodolistTitleAC({ id: todolistId, title }));
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
                    createTask={createTask}
                    deleteTask={deleteTask}
                    changeTaskStatus={changeTaskStatus}
                    changeTaskTitle={changeTaskTitle}
                    changeFilter={changeFilter}
                    filter={tl.filter}
                    deleteTodolist={deleteTodolist}
                    chnageTodolistTitle={chnageTodolistTitle}
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
