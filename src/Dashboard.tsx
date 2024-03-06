import { useState, useCallback } from "react";

// Drag and drop
import {
  DndContext,
  closestCenter,
  DragOverlay,
  useSensors,
  useSensor,
  MouseSensor,
  TouchSensor,
  DragStartEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
// import {
//   handleDragStart,
//   handleDragEnd,
//   handleDragCancel,
// } from "./services/dndActions";

// Components
import { Grid } from "./components/Grid";
import { Note } from "./components/Note";
import { SortableNote } from "./components/SortableNote";

// Redux
import { useAppSelector, useAppDispatch } from "./hooks/store";
import { addNote, updateNotesOrder } from "./store/notes/slice";
import { arrayMove } from "@dnd-kit/sortable";
import { NoteType } from "./types/types";

export function Dashboard() {
  const items = useAppSelector((state) => state.notes);

  const dispatch = useAppDispatch();
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleRearrangeNotes = (items: NoteType[]) => {
    dispatch(updateNotesOrder(items));
  };

  const handleNewNote = () => {
    const title = "New note";
    const text = "New note text";
    const data = { title, text };
    // @ts-ignore
    dispatch(addNote({ data }));
  };

  const handleDragStart = (
    setActiveId: React.Dispatch<React.SetStateAction<string | null>>
  ) =>
    useCallback((event: DragStartEvent) => {
      setActiveId(event.active.id.toString());
    }, []);

  const handleDragEnd = (
    setActiveId: React.Dispatch<React.SetStateAction<string | null>>
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

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  return (
    <>
      <button onClick={handleNewNote}>New</button>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart(setActiveId)}
        onDragEnd={handleDragEnd(setActiveId)}
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
