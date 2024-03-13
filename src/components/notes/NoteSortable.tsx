import { FC } from "react";
// Drag and drop
import { useSortable } from "@dnd-kit/sortable";
// Components
import { Note } from "./Note";
// Types
import { NoteProps } from "../../types";

const NoteSortable: FC<NoteProps> = (props) => {
  const { isOver, attributes, listeners, setNodeRef } = useSortable({
    id: props.id,
  });

  const style = {
    opacity: isOver ? 0.5 : 1,
    transition: "opacity 0.5s",
  };

  return (
    <Note
      ref={setNodeRef}
      style={style}
      {...props}
      {...attributes}
      {...listeners}
    />
  );
};

export { NoteSortable };
