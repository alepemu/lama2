import { useState } from "react";

// Drag and drop
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arraySwap,
  rectSwappingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";

// Components
import { Masonry } from "./components/Masonry";
import { Cell } from "./components/Cell";

// Data
import strings from "./assets/strings.json";
import { ItemType } from "./types/types";

export function Dashboard() {
  const [items, setItems] = useState<ItemType[]>(strings);
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );
  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arraySwap(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={onDragEnd}
    >
      <div className="p-4 overflow-clip bg-yellow-100 h-screen">
        <SortableContext items={items} strategy={rectSwappingStrategy}>
          <Masonry
            items={items}
            itemKey={(item) => item.id}
            renderItem={(item) => <Cell item={item} />}
          />
        </SortableContext>
      </div>
    </DndContext>
  );
}
