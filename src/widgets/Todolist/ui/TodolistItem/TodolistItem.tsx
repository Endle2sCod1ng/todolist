import { AppButton } from "@/shared/ui/AppButton/AppButton";
import type { FilterType, Task } from "../../model/tasks";
import { useState, type ChangeEvent, type KeyboardEvent } from "react";
import s from "./TodolistItem.module.scss";

interface TodolistItemProps {
  title: string;
  filter: string;
  tasks: Task[];
  createTask: (title: string) => void;
  deleteTask: (taksId: string) => void;
  changeTaskStatus: ({
    taskId,
    isDone,
  }: {
    taskId: string;
    isDone: boolean;
  }) => void;
  changeFilter: (filter: FilterType) => void;
  className?: string;
}
export const TodolistItem = ({
  title,
  filter,
  tasks,
  className,
  createTask,
  deleteTask,
  changeTaskStatus,
  changeFilter,
}: TodolistItemProps) => {
  // const inputRef = useRef<HTMLInputElement>(null);
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const createTaskHandler = () => {
    const trimTitle = taskTitle.trim();
    if (trimTitle !== "") {
      createTask(trimTitle);
      setTaskTitle("");
    } else {
      setError("Title is requred");
    }
  };

  return (
    <>
      {tasks.length === 0 ? (
        <p>{"Tasks not found"}</p>
      ) : (
        <div className={`${className ? className : ""}`}>
          <h3>{title}</h3>
          <div>
            <input
              className={`${error && s.error}`}
              //  ref={inputRef}
              value={taskTitle}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setTaskTitle(e.currentTarget.value);
                setError(null);
              }}
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter") {
                  createTaskHandler();
                }
              }}
            />
            <AppButton
              onClick={() => {
                createTaskHandler();
                // if (inputRef.current && inputRef.current.value !== "") {
                //   createTask(inputRef.current.value);
                //   inputRef.current.value = "";
                // }
              }}
            >
              +
            </AppButton>
            {error && <div className={s.errorMessage}>{error}</div>}
          </div>
          <ul>
            {tasks.map((t) => {
              // <li key={crypto.randomUUID()}>
              const deleteTaskhandler = (taskId: string) => {
                deleteTask(taskId);
              };

              const changeTaskStatusHandler = (
                e: ChangeEvent<HTMLInputElement>
              ) => {
                changeTaskStatus({
                  taskId: t.id,
                  isDone: e.currentTarget.checked,
                });
              };
              return (
                <li
                  key={crypto.randomUUID()}
                  className={`${t.isDone ? s.isDone : ""}`}
                >
                  <input
                    type="checkbox"
                    checked={t.isDone}
                    onChange={changeTaskStatusHandler}
                  />
                  <span>{t.title}</span>
                  <AppButton onClick={() => deleteTaskhandler(t.id)}>
                    x
                  </AppButton>
                </li>
              );
            })}
          </ul>
          <div>
            <AppButton
              onClick={() => changeFilter("all")}
              className={filter === "all" ? s.activeFilter : ""}
            >
              All
            </AppButton>
            <AppButton
              onClick={() => changeFilter("active")}
              className={filter === "active" ? s.activeFilter : ""}
            >
              Active
            </AppButton>
            <AppButton
              onClick={() => changeFilter("completed")}
              className={filter === "completed" ? s.activeFilter : ""}
            >
              Completed
            </AppButton>
          </div>
        </div>
      )}
    </>
  );
};
