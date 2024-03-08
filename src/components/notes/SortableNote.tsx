import { FC } from "react";
// Drag and drop
import { useSortable } from "@dnd-kit/sortable";
// Components
import { Note } from "./Note";
// Types
import { NoteProps } from "../../types";

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
