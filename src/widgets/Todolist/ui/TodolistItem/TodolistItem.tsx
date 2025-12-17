import { AppButton } from "@/shared/ui/AppButton/AppButton";
import type { FilterType, Task } from "../../model/tasks";
import { useRef, useState, type ChangeEvent, type KeyboardEvent } from "react";

interface TodolistItemProps {
  title: string;
  tasks: Task[];
  createTask: (title: string) => void;
  deleteTask: (taksId: string) => void;
  changeFilter: (filter: FilterType) => void;
  className?: string;
}
export const TodolistItem = ({
  title,
  tasks,
  className,
  createTask,
  deleteTask,
  changeFilter,
}: TodolistItemProps) => {
  // const inputRef = useRef<HTMLInputElement>(null);
  const [taskTitle, setTaskTitle] = useState<string>("");

  const createTaskHandler = () => {
    if (taskTitle) {
      createTask(taskTitle);
      setTaskTitle("");
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
              //  ref={inputRef}
              value={taskTitle}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTaskTitle(e.currentTarget.value)
              }
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
          </div>
          <ul>
            {tasks.map((t) => {
              // <li key={crypto.randomUUID()}>
              const deleteTaskhandler = (taskId: string) => {
                deleteTask(taskId);
              };
              return (
                <li key={crypto.randomUUID()}>
                  <input
                    type="checkbox"
                    checked={t.isDone}
                    onChange={() => {}}
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
            <AppButton onClick={() => changeFilter("all")}>All</AppButton>
            <AppButton onClick={() => changeFilter("active")}>Active</AppButton>
            <AppButton onClick={() => changeFilter("completed")}>
              Completed
            </AppButton>
          </div>
        </div>
      )}
    </>
  );
};
