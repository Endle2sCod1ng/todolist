import { EditableSpan } from "@/feature/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  changeTodolistTitleAC,
  deleteTodolistAC,
} from "@/widgets/Todolist/model/reducers/todolistsReducer";
import { useAppDispatch } from "@/shared/hooks/hooks";
import s from "../TodolistItem.module.scss";

interface TodolistTitleProps {
  todolistId: string;
  title: string;
  className?: string;
}
export const TodolistTitle = ({
  todolistId,
  title,
  className,
}: TodolistTitleProps) => {
  const dispatch = useAppDispatch();

  const chnageTodolistTitle = ({
    todolistId,
    title,
  }: {
    todolistId: string;
    title: string;
  }) => {
    dispatch(changeTodolistTitleAC({ id: todolistId, title }));
  };

  const deleteTodolist = (todolistId: string) => {
    dispatch(deleteTodolistAC({ id: todolistId }));
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
        <IconButton onClick={() => deleteTodolist(todolistId)}>
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};
