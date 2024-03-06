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
import {
  handleDragStart,
  handleDragEnd,
  handleDragCancel,
} from "./services/dndActions";
import { mouseActivation, touchActivation } from "./utils/dndSensors";

// Components
import { Grid } from "./components/Grid";
import { Note } from "./components/Note";
import { SortableNote } from "./components/SortableNote";

// State
import { useAppSelector, useAppDispatch } from "./hooks/store";
import { addNote, updateNotesOrder } from "./store/notes/slice";

// Types
import { NoteType } from "./types/types";

export function Dashboard() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const items = useAppSelector((state) => state.notes);

  const sensors = useSensors(
    useSensor(MouseSensor, mouseActivation),
    useSensor(TouchSensor, touchActivation)
  );

  const dispatch = useAppDispatch();

  const handleRearrangeNotes = (items: NoteType[]) => {
    dispatch(updateNotesOrder(items));
  };

  const handleNewNote = () => {
    // @ts-ignore
    dispatch(addNote({ data: { title: "New note", text: "New note text" } }));
  };

  return (
    <>
      <button onClick={handleNewNote}>New</button>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart(setActiveId)}
        onDragEnd={handleDragEnd(setActiveId, handleRearrangeNotes, items)}
        onDragCancel={handleDragCancel(setActiveId)}
      >
        <div className="overflow-clip bg-zinc-900 min-h-[calc(100vh-64px)]">
          <SortableContext items={items} strategy={rectSortingStrategy}>
            <Grid>
              {items.map((item) => (
                <SortableNote key={item.id} id={item.id} data={item.data} />
              ))}
            </Grid>
          </SortableContext>

          <DragOverlay style={{ transformOrigin: "0 0 " }}>
            {activeId ? (
              <Note
                id={activeId}
                data={
                  items.find((item) => item.id == activeId)?.data || {
                    title: "",
                    text: "",
                  }
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
