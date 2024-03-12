import { useState } from "react";
// Drag and drop
import {
  DndContext,
  closestCenter,
  DragOverlay,
  useSensors,
  useSensor,
  MouseSensor,
  TouchSensor,
} from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { mouseActivation, touchActivation } from "@/utils/dndSensors";
import {
  handleDragStart,
  handleDragEnd,
  handleDragCancel,
} from "@/services/dndActions";
// Components
import { Grid } from "./Grid";
import { Note } from "../notes/Note";
import { SortableNote } from "../notes/SortableNote";
import { NoteLoading } from "../notes/NoteLoading";
// State
import { useAppSelector, useAppDispatch } from "@/hooks/store";
import { updateNotesOrder } from "@/store/notes.slice";
// Types
import { NoteType } from "@/types";
import { missingNote } from "@/utils/placeholders";

export function Dashboard() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const loading = useAppSelector((state) => state.loading);
  const notes = useAppSelector((state) => state.notes);

  const sensors = useSensors(
    useSensor(MouseSensor, mouseActivation),
    useSensor(TouchSensor, touchActivation)
  );

  const dispatch = useAppDispatch();
  const arrangeNotes = (notes: NoteType[]) => dispatch(updateNotesOrder(notes));

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart(setActiveId)}
        onDragEnd={handleDragEnd(setActiveId, arrangeNotes, notes)}
        onDragCancel={handleDragCancel(setActiveId)}
      >
        <div className="overflow-clip min-h-[calc(100vh-160px)] lg:min-h-[calc(100vh-112px)]">
          <SortableContext items={notes} strategy={rectSortingStrategy}>
            <Grid>
              {loading && <NoteLoading />}
              {notes.map((note) => (
                <SortableNote key={note.id} id={note.id} data={note.data} />
              ))}
            </Grid>
          </SortableContext>

          <DragOverlay>
            {activeId ? (
              <Note
                id={activeId}
                data={
                  notes.find((note) => note.id == activeId)?.data || missingNote
                }
                isDragging
              />
            ) : null}
          </DragOverlay>
        </div>
      </DndContext>
    </>
  );
}
