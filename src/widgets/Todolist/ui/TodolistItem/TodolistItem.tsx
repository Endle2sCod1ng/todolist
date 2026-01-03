import { type ChangeEvent } from "react";

import type { Task } from "../../model/task";
import type { FilterValues } from "../../model/todolist";
import s from "./TodolistItem.module.scss";
import { CreateItemForm } from "@/feature/CreateItemForm";
import { EditableSpan } from "@/feature/EditableSpan/inex";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import MuiButton from "@mui/material/Button";
import { Checkbox } from "@mui/material";

import ListItem from "@mui/material/ListItem";

interface TodolistItemProps {
  title: string;
  filter: string;
  todolistId: string;
  tasks: Task[];
  createTask: ({
    todolistId,
    title,
  }: {
    todolistId: string;
    title: string;
  }) => void;
  deleteTask: ({
    todolistId,
    taskId,
  }: {
    todolistId: string;
    taskId: string;
  }) => void;
  changeTaskStatus: ({
    todolistId,
    taskId,
    isDone,
  }: {
    todolistId: string;
    taskId: string;
    isDone: boolean;
  }) => void;
  changeTaskTitle: ({
    todolistId,
    taskId,
    title,
  }: {
    todolistId: string;
    taskId: string;
    title: string;
  }) => void;
  changeFilter: ({
    todolistId,
    filter,
  }: {
    todolistId: string;
    filter: FilterValues;
  }) => void;
  deleteTodolist: (todolistId: string) => void;
  chnageTodolistTitle: ({
    todolistId,
    title,
  }: {
    todolistId: string;
    title: string;
  }) => void;
  className?: string;
}
export const TodolistItem = ({
  title,
  filter,
  tasks,
  todolistId,
  createTask,
  deleteTask,
  changeTaskStatus,
  changeTaskTitle,
  changeFilter,
  deleteTodolist,
  chnageTodolistTitle,
  className,
}: TodolistItemProps) => {
  // const inputRef = useRef<HTMLInputElement>(null);

  const createTaskHandler = (title: string) => {
    createTask({ todolistId, title });
  };
  const chnageTodolistTitleHandler = (title: string) => {
    chnageTodolistTitle({ todolistId, title });
  };

  return (
    <ListItem className={`${s.todolistItem} ${className ? className : ""}`}>
      <div className={s.titleWrapper}>
        <>
          <EditableSpan
            value={title}
            onChange={chnageTodolistTitleHandler}
          />
        </>
        <IconButton onClick={() => deleteTodolist(todolistId)}>
          <DeleteIcon />
        </IconButton>
      </div>
      <CreateItemForm createItem={createTaskHandler} />

      {tasks.length === 0 ? (
        <p>{"Tasks not found"}</p>
      ) : (
        <>
          <ul>
            {tasks.map((t) => {
              const changeTaskStatusHandler = (
                e: ChangeEvent<HTMLInputElement>
              ) => {
                changeTaskStatus({
                  todolistId,
                  taskId: t.id,
                  isDone: e.currentTarget.checked,
                });
              };
              const chnageTaskTitleHandler = (title: string) => {
                changeTaskTitle({ todolistId, taskId: t.id, title });
              };
              return (
                <li
                  key={crypto.randomUUID()}
                  className={`${s.taskItem} ${t.isDone ? s.isDone : ""}`}
                >
                  <Checkbox
                    checked={t.isDone}
                    onChange={changeTaskStatusHandler}
                  />
                  <EditableSpan
                    value={t.title}
                    onChange={chnageTaskTitleHandler}
                  />

                  <IconButton
                    onClick={() => deleteTask({ todolistId, taskId: t.id })}
                  >
                    <DeleteIcon />
                  </IconButton>
                </li>
              );
            })}
          </ul>
          <div>
            <MuiButton
              color="inherit"
              onClick={() =>
                changeFilter({ todolistId: todolistId, filter: "all" })
              }
              className={filter === "all" ? s.activeFilter : ""}
            >
              All
            </MuiButton>
            <MuiButton
              color="primary"
              onClick={() =>
                changeFilter({ todolistId: todolistId, filter: "active" })
              }
              className={filter === "active" ? s.activeFilter : ""}
            >
              Active
            </MuiButton>
            <MuiButton
              color="secondary"
              onClick={() =>
                changeFilter({ todolistId: todolistId, filter: "completed" })
              }
              className={filter === "completed" ? s.activeFilter : ""}
            >
              Completed
            </MuiButton>
          </div>
        </>
      )}
    </ListItem>
  );
};
