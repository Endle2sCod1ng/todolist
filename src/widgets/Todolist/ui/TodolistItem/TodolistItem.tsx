import { useState, type ChangeEvent, type KeyboardEvent } from "react";
import { AppButton } from "@/shared/ui/AppButton/AppButton";
import type { Task } from "../../model/task";
import type { FilterValues } from "../../model/todolist";
import s from "./TodolistItem.module.scss";


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
  changeFilter: ({
    todolistId,
    filter,
  }: {
    todolistId: string;
    filter: FilterValues;
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
  changeFilter,
  className,
}: TodolistItemProps) => {
  // const inputRef = useRef<HTMLInputElement>(null);
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const createTaskHandler = () => {
    const trimTitle = taskTitle.trim();
    if (trimTitle !== "") {
      createTask({ todolistId, title: trimTitle });
      setTaskTitle("");
    } else {
      setError("Title is requred");
    }
  };

  return (
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
            }}
          >
            +
          </AppButton>
          {error && <div className={s.errorMessage}>{error}</div>}
        </div>
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
