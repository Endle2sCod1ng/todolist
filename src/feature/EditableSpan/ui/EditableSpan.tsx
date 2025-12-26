import { useState, type ChangeEvent, type KeyboardEvent } from "react";
import s from "./EditableSpan.module.scss";
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
  const [text, setText] = useState<string>(value);

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
        <input
          value={text}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setText(e.currentTarget.value);
            onChange(e.currentTarget.value);
          }}
          onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
              setIsEdit(false);
            }
          }}
          onBlur={() => {
            setIsEdit(false);
          }}
          autoFocus
        />
      )}
    </div>
  );
};
