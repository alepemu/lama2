// Drag and drop
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { ItemType } from "../types/types";

export function Cell({ item }: { item: ItemType }) {
  const sortable = useSortable({ id: item.id });

  return (
    <div
      ref={sortable.setNodeRef}
      style={{
        transform: sortable.isDragging
          ? CSS.Translate.toString(sortable.transform)
          : undefined,
        opacity:
          sortable.isOver && sortable.over?.id !== sortable.active?.id
            ? 0.5
            : 1,
      }}
      {...sortable.attributes}
      {...sortable.listeners}
      className="bg-stone-700 p-4 rounded-xl text-sm font-bold text-white border border-white/25"
    >
      {item.text}
    </div>
  );
}
