import type { Task } from "../../model/types/task";
import s from "./TodolistItem.module.scss";
import { CreateItemForm } from "@/feature/CreateItemForm";
import { TodolistTitle } from "./ui/TodolistTitle";
import ListItem from "@mui/material/ListItem";
import { useAppDispatch } from "@/shared/hooks/hooks";
import { createTaskAC } from "../../model/reducers/tasksReducer";
import { TasksList } from "./ui/TasksList";

import type { FilterValues } from "../../model/types/filter";

interface TodolistItemProps {
  title: string;
  filter: FilterValues;
  tasks: Task[];
  todolistId: string;
  className?: string;
}
export const TodolistItem = ({
  title,
  filter,
  tasks,
  todolistId,
  className,
}: TodolistItemProps) => {
  const dispatch = useAppDispatch();

  const createTask = ({
    todolistId,
    title,
  }: {
    todolistId: string;
    title: string;
  }) => {
    dispatch(createTaskAC({ todolistId, title }));
  };
  const createTaskHandler = (title: string) => {
    createTask({ todolistId, title });
  };
  return (
    <ListItem className={`${s.todolistItem} ${className ? className : ""}`}>
      <TodolistTitle
        title={title}
        todolistId={todolistId}
      />
      <CreateItemForm createItem={createTaskHandler} />

      <TasksList
        todolistId={todolistId}
        filter={filter}
        tasks={tasks}
      />
    </ListItem>
  );
};
