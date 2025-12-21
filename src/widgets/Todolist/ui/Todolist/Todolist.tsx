import { useState } from "react";
import type { Task } from "../../model/task";
import type { FilterValues, TodolistType } from "../../model/todolist";
import { TodolistItem } from "../TodolistItem/TodolistItem";
import { v1 } from "uuid";
import { Container } from "@/shared/ui/Container/Container";

interface TodolistProps {
  className?: string;
}
export const Todolist = ({ className }: TodolistProps) => {
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

  return (
    <Container className={`${className ? className : ""}`}>
      {todolists.map((tl) => {
        let filtredTasks = tasks[tl.id];

        if (tl.filter === "active") {
          filtredTasks = tasks[tl.id].filter((t) => !t.isDone);
        }
        if (tl.filter === "completed") {
          filtredTasks = tasks[tl.id].filter((t) => t.isDone);
        }

        return (
          <TodolistItem
            key={tl.id}
            todolistId={tl.id}
            title={tl.title}
            tasks={filtredTasks}
            createTask={createTask}
            deleteTask={deleteTask}
            changeTaskStatus={changeTaskStatus}
            changeFilter={changeFilter}
            filter={tl.filter}
          />
        );
      })}
    </Container>
  );
};
