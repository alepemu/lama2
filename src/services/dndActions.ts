import { useCallback } from "react";
import { DragStartEvent, DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { NoteType } from "@/types";

const handleDragStart = (
  setActiveId: React.Dispatch<React.SetStateAction<string | null>>
) =>
  useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id.toString());
  }, []);

const handleDragEnd = (
  setActiveId: React.Dispatch<React.SetStateAction<string | null>>,
  arrangeNotes: (items: NoteType[]) => void,
  deleteNote: (id: string) => void,
  items: NoteType[]
) =>
  useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (event.over?.id === "bin") {
        deleteNote(active.id.toString());
      } else if (over && active.id !== over?.id) {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over!.id);
        arrangeNotes(arrayMove(items, oldIndex, newIndex));
      }
      setActiveId(null);
    },
    [items]
  );

const handleDragCancel = (
  setActiveId: React.Dispatch<React.SetStateAction<string | null>>
) =>
  useCallback(() => {
    setActiveId(null);
  }, []);

export { handleDragStart, handleDragEnd, handleDragCancel };
