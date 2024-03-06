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
import { mouseActivation, touchActivation } from "../../utils/dndSensors";
import {
  handleDragStart,
  handleDragEnd,
  handleDragCancel,
} from "../../services/dndActions";

// Components
import { Grid } from "./Grid";
import { Note } from "../notes/Note";
import { SortableNote } from "../notes/SortableNote";

// State
import { useAppSelector, useAppDispatch } from "../../hooks/store";
import { updateNotesOrder } from "../../store/notes.slice";

// Types
import { NoteType } from "../../types";

export function Dashboard() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const notes = useAppSelector((state) => state.notes);

  const sensors = useSensors(
    useSensor(MouseSensor, mouseActivation),
    useSensor(TouchSensor, touchActivation)
  );

  const dispatch = useAppDispatch();
  const arrangeNotes = (notes: NoteType[]) => dispatch(updateNotesOrder(notes));

  const missingNote = {
    title: "Error",
    text: "Missing note and/or data",
  };

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart(setActiveId)}
        onDragEnd={handleDragEnd(setActiveId, arrangeNotes, notes)}
        onDragCancel={handleDragCancel(setActiveId)}
      >
        <div className="overflow-clip min-h-[calc(100vh-176px)] lg:min-h-[calc(100vh-128px)]">
          <SortableContext items={notes} strategy={rectSortingStrategy}>
            <Grid>
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
