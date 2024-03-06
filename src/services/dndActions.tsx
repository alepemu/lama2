import { useCallback } from "react";
import { DragStartEvent, DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { NoteType } from "../types/types";

const handleDragStart = (
  setActiveId: React.Dispatch<React.SetStateAction<string | null>>
) =>
  useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id.toString());
  }, []);

const handleDragEnd = (
  setActiveId: React.Dispatch<React.SetStateAction<string | null>>,
  handleRearrangeNotes: (items: NoteType[]) => void,
  items: NoteType[]
) =>
  useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (active.id !== over?.id) {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over!.id);
        handleRearrangeNotes(arrayMove(items, oldIndex, newIndex));
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