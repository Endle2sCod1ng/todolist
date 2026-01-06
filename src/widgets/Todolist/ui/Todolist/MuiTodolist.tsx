import { useState } from "react";
import type { Task } from "../../model/task";
import type { FilterValues, TodolistType } from "../../model/todolist";

import { CreateItemForm } from "@/feature/CreateItemForm";

import List from "@mui/material/List";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { MuiTodolistItem } from "../TodolistItem/MuiTodolistItem";
import Paper from "@mui/material/Paper";
import { v1 } from "uuid";

interface TodolistProps {
  className?: string;
}
export const MuiTodolist = ({ className }: TodolistProps) => {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const [todolists, setTodolists] = useState<TodolistType[]>([
    { id: todolistId1, title: "What to learns", filter: "all" },
    { id: todolistId2, title: "What to read", filter: "all" },
  ]);

  const [tasks, setTasks] = useState<{ [key: string]: Task[] }>({
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
    setTodolists([
      ...todolists.map((tl) => (tl.id === todolistId ? { ...tl, filter } : tl)),
    ]);
  };

  const deleteTodolist = (todolistId: string) => {
    setTodolists([...todolists.filter((tl) => tl.id !== todolistId)]);
    const updateTasks = { ...tasks };
    delete updateTasks[todolistId];
    setTasks({ ...updateTasks });
  };

  const createTodolist = (title: string) => {
    const newTodolistId = v1();
    const newTodolist: TodolistType = {
      id: newTodolistId,
      title,
      filter: "all",
    };
    setTodolists([newTodolist, ...todolists]);
    setTasks({ [newTodolistId]: [], ...tasks });
  };

  const chnageTodolistTitle = ({
    todolistId,
    title,
  }: {
    todolistId: string;
    title: string;
  }) => {
    setTodolists([
      ...todolists.map((tl) => (tl.id === todolistId ? { ...tl, title } : tl)),
    ]);
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
