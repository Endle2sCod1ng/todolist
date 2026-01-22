import MuiButton from "@mui/material/Button";
import Box from "@mui/material/Box";
import { containerSx } from "../TodolistItem.styles";
import type { FilterValues } from "@/widgets/Todolist/model/types/todolist";
import { changeTodolistFilterAC } from "@/widgets/Todolist/model/reducers/todolistsReducer";
import { useAppDispatch } from "@/shared/hooks/hooks";
import s from "../TodolistItem.module.scss";

interface FilterButtonsProps {
  filter: FilterValues;
  todolistId: string;
}
export const FilterButtons = ({ todolistId, filter }: FilterButtonsProps) => {
  const dispatch = useAppDispatch();
  const changeFilter = ({
    todolistId,
    filter,
  }: {
    todolistId: string;
    filter: FilterValues;
  }) => {
    dispatch(changeTodolistFilterAC({ id: todolistId, filter }));
  };
  return (
    <Box sx={containerSx}>
      <MuiButton
        color="inherit"
        onClick={() => changeFilter({ todolistId: todolistId, filter: "all" })}
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
    </Box>
  );
};
