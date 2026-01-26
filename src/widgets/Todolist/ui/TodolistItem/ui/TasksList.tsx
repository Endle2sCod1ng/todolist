import type { FilterValues } from "@/widgets/Todolist/model/types/filter";
import { List } from "@mui/material";

import type { Task } from "@/widgets/Todolist/model/types/task";

import { FilterButtons } from "./FilterButtons";
import { TaskItem } from "./TaskItem";

interface TasksListProps {
  todolistId: string;
  filter: FilterValues;
  tasks: Task[];
  className?: string;
}
export const TasksList = ({
  todolistId,
  filter,
  tasks,
  className,
}: TasksListProps) => {
  return (
    <div className={`${className ? className : ""}`}>
      {tasks.length === 0 ? (
        <p>{"Tasks not found"}</p>
      ) : (
        <>
          <List>
            {tasks?.map((t) => {
              return (
                <TaskItem
                  key={crypto.randomUUID()}
                  todolistId={todolistId}
                  t={t}
                />
              );
            })}
          </List>
          <FilterButtons
            todolistId={todolistId}
            filter={filter}
          />
        </>
      )}
    </div>
  );
};
