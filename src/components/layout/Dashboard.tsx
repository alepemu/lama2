import { useState } from "react";
// Drag and drop
import {
  DndContext,
  DragOverlay,
  useSensors,
  useSensor,
  MouseSensor,
  TouchSensor,
  rectIntersection,
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
import { NoteSortable } from "../notes/NoteSortable";
import { NoteDroppableBin } from "../notes/NoteDroppableBin";
import { NoteLoading } from "../notes/NoteLoading";
// State
import { useAppSelector, useAppDispatch } from "@/hooks/store";
import { updateNotesOrder, deleteNoteById } from "@/store/notes.slice";
// Types
import { NoteType } from "@/types";
import { missingNote } from "@/utils/placeholders";

export const Dashboard = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const loading = useAppSelector((state) => state.loading);
  const notes = useAppSelector((state) => state.notes);

  const sensors = useSensors(
    useSensor(MouseSensor, mouseActivation),
    useSensor(TouchSensor, touchActivation)
  );

  const dispatch = useAppDispatch();
  const arrangeNotes = (notes: NoteType[]) => dispatch(updateNotesOrder(notes));
  const deleteNote = (id: string) => dispatch(deleteNoteById(id));

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={rectIntersection}
        onDragStart={handleDragStart(setActiveId)}
        onDragEnd={handleDragEnd(setActiveId, arrangeNotes, deleteNote, notes)}
        onDragCancel={handleDragCancel(setActiveId)}
      >
        <div className="overflow-clip animate-dashboard-intro">
          <SortableContext items={notes} strategy={rectSortingStrategy}>
            <Grid>
              {loading && <NoteLoading />}
              {notes.map((note) => (
                <NoteSortable key={note.id} id={note.id} data={note.data} />
              ))}
            </Grid>
          </SortableContext>

          <DragOverlay zIndex={10}>
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
          <div
            style={{ transition: "opacity 0.5s", opacity: activeId ? 1 : 0 }}
          >
            {activeId && <NoteDroppableBin />}
          </div>
        </div>
      </DndContext>
    </>
  );
};
