import { AppButton } from "@/shared/ui/AppButton/AppButton";
import type { Task } from "../../model/tasks";

interface TodolistItemProps {
  title: string;
  tasks: Task[];
  className?: string;
}
export const TodolistItem = ({
  title,
  tasks,
  className,
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
                </li>
              );
            })}
          </ul>
          <div>
            <AppButton>All</AppButton>
            <AppButton>Active</AppButton>
            <AppButton>Completed</AppButton>
          </div>
        </div>
      )}
    </>
  );
};
