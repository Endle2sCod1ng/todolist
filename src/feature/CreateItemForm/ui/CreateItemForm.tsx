import { useState, type ChangeEvent, type KeyboardEvent } from "react";
import MuiButton from "@mui/material/Button";

import s from "./CreateItemForm.module.scss";
import { TextField } from "@mui/material";

interface CreateItemFormProps {
  createItem: (title: string) => void;
  className?: string;
}
export const CreateItemForm = ({
  createItem,
  className,
}: CreateItemFormProps) => {
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const createItemHandler = () => {
    const trimTitle = title.trim();
    if (trimTitle !== "") {
      createItem(trimTitle);
      setTitle("");
    } else {
      setError("Title is requred");
    }
  };
  return (
    <div className={`${s.createItemForm} ${className ? className : ""}`}>
      <TextField
        error={!!error}
        helperText={error}
        label={"Enter a title"}
        variant={"outlined"}
        className={error ? "error" : ""}
        value={title}
        size={"small"}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setTitle(e.currentTarget.value);
          setError(null);
        }}
        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            createItemHandler();
          }
        }}
      />
      <MuiButton
        variant="contained"
        onClick={() => {
          createItemHandler();
        }}
      >
        +
      </MuiButton>
      {error && <div className={s.errorMessage}>{error}</div>}{" "}
    </div>
  );
};
