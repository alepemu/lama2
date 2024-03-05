import { FC } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { Item } from "./Item";
import { ItemProps } from "../types/types";

const SortableItem: FC<ItemProps> = (props) => {
  const { isOver, attributes, listeners, setNodeRef } = useSortable({
    id: props.id,
  });

  const style = {
    opacity: isOver ? 0.5 : 1,
  };

  return (
    <Item
      ref={setNodeRef}
      style={style}
      {...props}
      {...attributes}
      {...listeners}
    />
  );
};

export { SortableItem };
