import type { Task } from "@/widgets/Todolist/model/types/task";
import { getListItemSx } from "../TodolistItem.styles";
import { Checkbox, ListItem } from "@mui/material";
import { EditableSpan } from "@/feature/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { type ChangeEvent } from "react";

import s from "../TodolistItem.module.scss";
import { useAppDispatch } from "@/shared/hooks/hooks";
import {
  changeTaskStatusAC,
  changeTaskTitleAC,
  deleteTaskAC,
} from "@/widgets/Todolist/model/reducers/tasksReducer";

interface TaskItemProps {
  t: Task;
  todolistId: string;
  className?: string;
}
export const TaskItem = ({ todolistId, t, className }: TaskItemProps) => {
  const dispatch = useAppDispatch();
  const changeTaskStatus = ({
    todolistId,
    taskId,
    isDone,
  }: {
    todolistId: string;
    taskId: string;
    isDone: boolean;
  }) => {
    dispatch(changeTaskStatusAC({ todolistId, taskId, isDone }));
  };

  const changeTaskTitle = ({
    todolistId,
    taskId,
    title,
  }: {
    todolistId: string;
    taskId: string;
    title: string;
  }) => {
    dispatch(changeTaskTitleAC({ todolistId, taskId, title }));
  };
  const deleteTask = ({
    todolistId,
    taskId,
  }: {
    todolistId: string;
    taskId: string;
  }) => {
    dispatch(deleteTaskAC({ taskId, todolistId }));
  };
  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
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
    <div className={`${className ? className : ""}`}>
      <ListItem
        sx={getListItemSx(t.isDone)}
        key={crypto.randomUUID()}
        className={`${s.taskItem} ${t.isDone ? s.isDone : ""}`}
      >
        <div></div>
        <Checkbox
          checked={t.isDone}
          onChange={changeTaskStatusHandler}
        />
        <EditableSpan
          value={t.title}
          onChange={chnageTaskTitleHandler}
        />

        <IconButton onClick={() => deleteTask({ todolistId, taskId: t.id })}>
          <DeleteIcon />
        </IconButton>
      </ListItem>
    </div>
  );
};
