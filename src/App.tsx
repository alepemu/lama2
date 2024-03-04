import {
  closestCorners,
  DndContext,
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
import { useState } from "react";
import { Masonry } from "./components/Masonry";
import { Cell } from "./components/Cell";
import { range } from "./services/range";

// Data
import strings from "./assets/strings.json";

export const initialItems = range(12).map((id) => ({
  id: id + 1,
  text: strings[id],
}));

export function App() {
  const [items, setItems] = useState(initialItems);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={(event) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
          setItems((items) => {
            const oldIndex = items.findIndex((item) => item.id === active.id);
            const newIndex = items.findIndex((item) => item.id === over.id);
            return arraySwap(items, oldIndex, newIndex);
          });
        }
      }}
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
