import { FC } from "react";
// Drag and drop
import { useDroppable } from "@dnd-kit/core";
import { Trash2 } from "lucide-react";

export const NoteDroppableBin: FC = () => {
  const { isOver, setNodeRef } = useDroppable({
    id: "bin",
  });

  const style = {
    opacity: isOver ? 1 : 0.5,
    backgroundImage: isOver
      ? "linear-gradient(transparent 50%, rgb(139, 0, 0, 0.3) 100%)"
      : "none",
    transition: "all 0.5s",
    transformOrigin: "bottom",
    transform: isOver ? "scale(1.5)" : "scale(1)",
    zIndex: 20,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className=" cursor-alias fixed flex justify-center items-center w-full bottom-0 h-16"
    >
      <Trash2 size={35} />
    </div>
  );
};
