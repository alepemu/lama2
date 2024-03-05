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

// Components
import { Grid } from "./components/Grid";
import { Note } from "./components/Note";
import { SortableNote } from "./components/SortableNote";

// Data
import strings from "./assets/strings.json";

import { NoteType } from "./types/types";

export function Dashboard() {
  const [items, setItems] = useState<NoteType[]>(strings);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        delay: 0,
        tolerance: 0,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 0,
      },
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart(setActiveId)}
      onDragEnd={handleDragEnd(setActiveId, setItems)}
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
  );
}
