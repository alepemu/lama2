import React, { FC, useState, useCallback } from "react";

// Drag and drop
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

// Components
import { Grid } from "./Grid";
import SortableItem from "./SortableItem";
import Item from "./Item";

// Data
import strings from "./assets/strings.json";

type ItemType = { id: string; text: string };

export function App() {
  const [items, setItems] = useState<ItemType[]>(strings);
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

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id.toString());
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
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

  const handleDragCancel = useCallback(() => {
    setActiveId(null);
  }, []);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="overflow-clip bg-zinc-900 min-h-[100vh]">
        <SortableContext items={items} strategy={rectSortingStrategy}>
          <Grid>
            {items.map((item) => (
              <SortableItem key={item.id} id={item.id} text={item.text} />
            ))}
          </Grid>
        </SortableContext>

        <DragOverlay style={{ transformOrigin: "0 0 " }}>
          {activeId ? (
            <Item
              id={activeId}
              text={items.find((item) => item.id == activeId)?.text}
              isDragging
            />
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
}
