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
  setItems: React.Dispatch<React.SetStateAction<NoteType[]>>
) =>
  useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over!.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
    setActiveId(null);
  }, []);

const handleDragCancel = (
  setActiveId: React.Dispatch<React.SetStateAction<string | null>>
) =>
  useCallback(() => {
    setActiveId(null);
  }, []);

export { handleDragStart, handleDragEnd, handleDragCancel };
