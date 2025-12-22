import { useState, type ChangeEvent, type KeyboardEvent } from "react";
import s from "./CreateItemForm.module.scss";
import { AppButton } from "@/shared/ui/AppButton/AppButton";
interface CreateItemFormProps {
  createItem: (title: string) => void;
  className?: string;
}
export const CreateItemForm = ({
  createItem,
  className,
}: CreateItemFormProps) => {
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const createItemHandler = () => {
    const trimTitle = taskTitle.trim();
    if (trimTitle !== "") {
      createItem(trimTitle);
      setTaskTitle("");
    } else {
      setError("Title is requred");
    }
  };
  return (
    <div className={`${className ? className : ""}`}>
      <input
        className={`${error && s.error}`}
        //  ref={inputRef}
        value={taskTitle}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setTaskTitle(e.currentTarget.value);
          setError(null);
        }}
        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            createItemHandler();
          }
        }}
      />
      <AppButton
        onClick={() => {
          createItemHandler();
        }}
      >
        +
      </AppButton>
      {error && <div className={s.errorMessage}>{error}</div>}{" "}
    </div>
  );
};
