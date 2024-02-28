import {
  closestCorners,
  DndContext,
  KeyboardSensor,
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
import { Masonry } from "./Masonry";
import { Cell } from "./Cell";
import { range } from "./range";

// Data
import strings from "./assets/strings.json";

const initialItems = range(15).map((id) => ({
  id: id + 1,
  height: 100 + Math.random() * 200,
}));

export function App() {
  const [items, setItems] = useState(initialItems);

  const sensors = useSensors(
    useSensor(MouseSensor)
    // useSensor(TouchSensor),
    // useSensor(KeyboardSensor, {
    //   coordinateGetter: sortableKeyboardCoordinates,
    // })
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
      <div className="p-4 overflow-clip">
        <SortableContext items={items} strategy={rectSwappingStrategy}>
          <Masonry
            items={items}
            itemKey={(item) => item.id}
            columnWidth={300}
            gap={8}
            renderItem={(item) => <Cell item={item} />}
          />
        </SortableContext>
      </div>
    </DndContext>
  );
}
