import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { initialItems } from "../App";

type Item = (typeof initialItems)[number];

export function Cell({ item }: { item: Item }) {
  const sortable = useSortable({
    id: item.id,
    animateLayoutChanges: (args) => {
      // return false;
      // return args.isSorting
      return !args.wasDragging;
    },
  });

  const getPlaceholderHeight = () => {
    if (sortable.isOver && sortable.active) {
      // console.log('1', sortable);
      return sortable.active.rect.current.initial?.height;
    }
    if (sortable.isDragging && sortable.over) {
      // console.log('2', sortable);
      return sortable.over.rect.height;
    }
  };

  return (
    <div style={{ height: getPlaceholderHeight(), transition: "0.5s height" }}>
      <div
        ref={sortable.setNodeRef}
        style={{
          transform: CSS.Translate.toString(sortable.transform),
          transition: sortable.transition,
        }}
        {...sortable.attributes}
        {...sortable.listeners}
        className="bg-blue-700 p-4 rounded-xl text-sm text-white"
      >
        {item.text}
      </div>
    </div>
  );
}
