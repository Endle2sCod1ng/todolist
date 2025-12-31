import { useState, type ChangeEvent, type KeyboardEvent } from "react";
import s from "./EditableSpan.module.scss";
import { TextField } from "@mui/material";
interface EditableSpanProps {
  value: string;
  onChange: (title: string) => void;
  className?: string;
}
export const EditableSpan = ({
  value,
  onChange,
  className,
}: EditableSpanProps) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(value);

  return (
    <div className={`${s.editableSpan} ${className ? className : ""}`}>
      {!isEdit ? (
        <span
          onDoubleClick={() => {
            setIsEdit(true);
          }}
        >
          {value}
        </span>
      ) : (
          <TextField
            variant={"outlined"}
            value={title}
            size={"small"}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setTitle(e.currentTarget.value);
            }}
            onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                setIsEdit(false);
                onChange(title);
              }
            }}
            onBlur={() => {
              setIsEdit(false);
              onChange(title);
            }}
            autoFocus
          />
      )}
    </div>
  );
};
