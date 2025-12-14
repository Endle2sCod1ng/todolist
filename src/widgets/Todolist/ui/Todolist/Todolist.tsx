import { useState } from "react";
import type { FilterType, Task } from "../../model/tasks";
import { TodolistItem } from "../TodolistItem/TodolistItem";

interface TodolistProps {
  className?: string;
}
export const Todolist = ({ className }: TodolistProps) => {
  const [filter, setFilter] = useState<FilterType>("all");
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "HTML&CSS", isDone: true },
    { id: "2", title: "JS", isDone: true },
    { id: "3", title: "ReactJS", isDone: false },
  ]);

  // const tasks2 = [
  //   { id: "1", title: "Hello world", isDone: true },
  //   { id: "2", title: "I am Happy", isDone: false },
  //   { id: "3", title: "Yo", isDone: false },
  // ];
  // const tasks3: Task[] = [];

  const deleteTask = (taksId: string) => {
    setTasks([...tasks.filter((t) => t.id !== taksId)]);
    console.log(tasks);
  };

  const changeFilter = (filter: FilterType) => {
    setFilter(filter);
  };
  let filtredTasks = tasks;

  if (filter === "active") {
    filtredTasks = tasks.filter((t) => !t.isDone);
  }
  if (filter === "completed") {
    filtredTasks = tasks.filter((t) => t.isDone);
  }

  return (
    <div className={`${className ? className : ""}`}>
      <TodolistItem
        title="What to learn"
        tasks={filtredTasks}
        deleteTask={deleteTask}
        changeFilter={changeFilter}
      />
      {/* <TodolistItem
        title="Songs"
        tasks={tasks2}
        deleteTask={deleteTask}
      />
      <TodolistItem
        title="Films"
        tasks={tasks3}
        deleteTask={deleteTask}
      /> */}
    </div>
  );
};
