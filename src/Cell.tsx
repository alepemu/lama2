import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { range } from "./range";

const initialItems = range(15).map((id) => ({
  id: id + 1,
  height: 100 + Math.random() * 200,
}));

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
    if (sortable.isOver && sortable.active)
      return sortable.active.rect.current.initial?.height;
    if (sortable.isDragging && sortable.over) return sortable.over.rect.height;
    return item.height;
  };

  return (
    <div style={{ height: getPlaceholderHeight(), transition: "0.2s height" }}>
      <div
        ref={sortable.setNodeRef}
        style={{
          height: item.height,
          lineHeight: item.height + "px",
          transform: CSS.Translate.toString(sortable.transform),
          transition: sortable.transition,
        }}
        {...sortable.attributes}
        {...sortable.listeners}
        className="bg-blue-700 rounded-xl text-white font-bold text-center text-6xl"
      >
        {item.id}
      </div>
    </div>
  );
}
