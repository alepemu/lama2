import { FC } from "react";
import { useSortable } from "@dnd-kit/sortable";
import Item, { ItemProps } from "./Item";

const SortableItem: FC<ItemProps> = (props) => {
  const { isDragging, isOver, attributes, listeners, setNodeRef } = useSortable(
    { id: props.id }
  );

  const style = {
    opacity: isOver ? 0.5 : 1,
  };

  return (
    <Item
      ref={setNodeRef}
      style={style}
      withOpacity={isDragging}
      {...props}
      {...attributes}
      {...listeners}
    />
  );
};

export default SortableItem;
