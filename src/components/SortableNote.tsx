import { FC } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { Note } from "./Note";
import { NoteProps } from "../types/types";

const SortableNote: FC<NoteProps> = (props) => {
  const { isOver, attributes, listeners, setNodeRef } = useSortable({
    id: props.id,
  });

  const style = {
    opacity: isOver ? 0.5 : 1,
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

export { SortableNote };
