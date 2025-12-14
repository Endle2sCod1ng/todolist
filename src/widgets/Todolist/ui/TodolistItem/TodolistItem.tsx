import { AppButton } from "@/shared/ui/AppButton/AppButton";
import type { FilterType, Task } from "../../model/tasks";

interface TodolistItemProps {
  title: string;
  tasks: Task[];
  deleteTask: (taksId: string) => void;
  changeFilter: (filter: FilterType) => void;
  className?: string;
}
export const TodolistItem = ({
  title,
  tasks,
  className,
  deleteTask,
  changeFilter,
}: TodolistItemProps) => {
  return (
    <>
      {tasks.length === 0 ? (
        <p>{"Tasks not found"}</p>
      ) : (
        <div className={`${className ? className : ""}`}>
          <h3>{title}</h3>
          <div>
            <input />
            <button>+</button>
          </div>
          <ul>
            {tasks.map((t) => {
              // <li key={crypto.randomUUID()}>
              return (
                <li key={crypto.randomUUID()}>
                  <input
                    type="checkbox"
                    checked={t.isDone}
                    onChange={() => {}}
                  />
                  <span>{t.title}</span>
                  <AppButton onClick={() => deleteTask(t.id)}>x</AppButton>
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
