import type { Task } from "../../model/tasks";
import { TodolistItem } from "../TodolistItem/TodolistItem";

interface TodolistProps {
  className?: string;
}
export const Todolist = ({ className }: TodolistProps) => {
  const tasks1 = [
    { id: "1", title: "HTML&CSS", isDone: true },
    { id: "2", title: "JS", isDone: true },
    { id: "3", title: "ReactJS", isDone: false },
  ];

  const tasks2 = [
    { id: "1", title: "Hello world", isDone: true },
    { id: "2", title: "I am Happy", isDone: false },
    { id: "3", title: "Yo", isDone: false },
  ];
  const tasks3: Task[] = [];
  return (
    <div className={`${className ? className : ""}`}>
      <TodolistItem
        title="What to learn"
        tasks={tasks1}
      />
      <TodolistItem
        title="Songs"
        tasks={tasks2}
      />
      <TodolistItem
        title="Films"
        tasks={tasks3}
      />
    </div>
  );
};
