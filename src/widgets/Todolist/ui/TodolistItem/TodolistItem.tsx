import { type ChangeEvent } from "react";
import { AppButton } from "@/shared/ui/AppButton/AppButton";
import type { Task } from "../../model/task";
import type { FilterValues } from "../../model/todolist";
import s from "./TodolistItem.module.scss";
import { CreateItemForm } from "@/feature/CreateItemForm";
import { EditableSpan } from "@/feature/EditableSpan/inex";

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
    <div className={`${className ? className : ""}`}>
      <div className={s.titleWrapper}>
        <>
          <EditableSpan
            value={title}
            onChange={chnageTodolistTitleHandler}
          />
        </>
        <AppButton onClick={() => deleteTodolist(todolistId)}>{"x"}</AppButton>
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
                  <input
                    type="checkbox"
                    checked={t.isDone}
                    onChange={changeTaskStatusHandler}
                  />
                  <EditableSpan
                    value={t.title}
                    onChange={chnageTaskTitleHandler}
                  />
                  <AppButton
                    onClick={() => deleteTask({ todolistId, taskId: t.id })}
                  >
                    x
                  </AppButton>
                </li>
              );
            })}
          </ul>
          <div>
            <AppButton
              onClick={() =>
                changeFilter({ todolistId: todolistId, filter: "all" })
              }
              className={filter === "all" ? s.activeFilter : ""}
            >
              All
            </AppButton>
            <AppButton
              onClick={() =>
                changeFilter({ todolistId: todolistId, filter: "active" })
              }
              className={filter === "active" ? s.activeFilter : ""}
            >
              Active
            </AppButton>
            <AppButton
              onClick={() =>
                changeFilter({ todolistId: todolistId, filter: "completed" })
              }
              className={filter === "completed" ? s.activeFilter : ""}
            >
              Completed
            </AppButton>
          </div>
        </>
      )}
    </div>
  );
};
