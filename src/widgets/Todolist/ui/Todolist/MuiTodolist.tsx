import { useReducer, useState } from "react";
import type { Task, TasksState } from "../../model/types/task";
import type { FilterValues } from "../../model/types/todolist";

import { CreateItemForm } from "@/feature/CreateItemForm";

import List from "@mui/material/List";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { MuiTodolistItem } from "../TodolistItem/MuiTodolistItem";
import Paper from "@mui/material/Paper";
import { v1 } from "uuid";
import {
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  createTodolistAC,
  deleteTodolistAC,
  todolistsReducer,
} from "../../model/reducers/todolistsReducer";

interface TodolistProps {
  className?: string;
}
export const MuiTodolist = ({ className }: TodolistProps) => {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const [todolists, dispatchToTodolists] = useReducer(todolistsReducer, []);

  const [tasks, setTasks] = useState<TasksState>({
    [todolistId1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: "Rest API", isDone: true },
      { id: v1(), title: "GraphQL", isDone: false },
    ],
  });

  const deleteTask = ({
    todolistId,
    taskId,
  }: {
    todolistId: string;
    taskId: string;
  }) => {
    setTasks({
      ...tasks,
      [todolistId]: [...tasks[todolistId].filter((t) => t.id !== taskId)],
    });
  };

  const createTask = ({
    todolistId,
    title,
  }: {
    todolistId: string;
    title: string;
  }) => {
    const newTask: Task = {
      id: v1(),
      title: title,
      isDone: false,
    };
    setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] });
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
    setTasks({
      ...tasks,
      [todolistId]: [
        ...tasks[todolistId].map((t) =>
          t.id === taskId ? { ...t, isDone } : t
        ),
      ],
    });
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
    setTasks({
      ...tasks,
      [todolistId]: [
        ...tasks[todolistId].map((t) =>
          t.id === taskId ? { ...t, title } : t
        ),
      ],
    });
  };

  const changeFilter = ({
    todolistId,
    filter,
  }: {
    todolistId: string;
    filter: FilterValues;
  }) => {
    dispatchToTodolists(changeTodolistFilterAC({ id: todolistId, filter }));
  };

  const deleteTodolist = (todolistId: string) => {
    dispatchToTodolists(deleteTodolistAC(todolistId));
    const updateTasks = { ...tasks };
    delete updateTasks[todolistId];
    setTasks({ ...updateTasks });
  };

  const createTodolist = (title: string) => {
    const action = createTodolistAC(title);
    dispatchToTodolists(action);
    setTasks({ ...tasks, [action.payload.id]: [] });
  };

  const chnageTodolistTitle = ({
    todolistId,
    title,
  }: {
    todolistId: string;
    title: string;
  }) => {
    dispatchToTodolists(changeTodolistTitleAC({ id: todolistId, title }));
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
          {todolists.map((tl) => {
            let filtredTasks = tasks[tl.id];

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
