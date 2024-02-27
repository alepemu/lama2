// import React, { useState } from "react";
// import {
//   DndContext,
//   closestCenter,
//   KeyboardSensor,
//   PointerSensor,
//   useSensor,
//   useSensors,
//   DragEndEvent,
// } from "@dnd-kit/core";
// import {
//   arrayMove,
//   SortableContext,
//   sortableKeyboardCoordinates,
//   verticalListSortingStrategy,
// } from "@dnd-kit/sortable";

// import { SortableItem } from "./SortableItem";

// function App() {
//   const [items, setItems] = useState([1, 2, 3]);
//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     })
//   );

//   return (
//     <DndContext
//       sensors={sensors}
//       collisionDetection={closestCenter}
//       onDragEnd={handleDragEnd}
//     >
//       <SortableContext items={items} strategy={verticalListSortingStrategy}>
//         {items.map((id) => (
//           <SortableItem key={id} id={id} />
//         ))}
//       </SortableContext>
//     </DndContext>
//   );

//   function handleDragEnd(event: DragEndEvent) {
//     const { active, over } = event;

//     if (over && active.id !== over.id) {
//       setItems((items) => {
//         const oldIndex = items.indexOf(Number(active.id));
//         const newIndex = items.indexOf(Number(over.id));

//         return arrayMove(items, oldIndex, newIndex);
//       });
//     }
//   }
// }

import React, { useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";

// Components
import Post from "./Post";
import { Draggable } from "./Draggable";
import { Droppable } from "./Droppable";

// Data
import strings from "./assets/strings.json";

function App() {
  return (
    <DndContext>
      <div className="bg-stone-800 w-screen h-screen p-10">
        <div className="flex flex-wrap gap-4">
          {strings.map((text, index) => (
            <Post key={index} text={text} />
          ))}
        </div>
      </div>
    </DndContext>
  );
}

// function App() {
//   const [isDropped, setIsDropped] = useState(false);
//   const draggableMarkup = <Draggable>Drag me</Draggable>;

//   return (
//     <DndContext onDragEnd={handleDragEnd}>
//       {!isDropped ? draggableMarkup : null}
//       <Droppable>{isDropped ? draggableMarkup : "Drop here"}</Droppable>
//     </DndContext>
//   );

//   function handleDragEnd(event: DragEndEvent) {
//     if (event.over && event.over.id === "droppable") {
//       setIsDropped(true);
//     }
//   }
// }

// function App() {
//   const containers = ["A", "B", "C"];
//   const [parent, setParent] = useState(null);
//   const draggableMarkup = <Draggable id="draggable">Drag me</Draggable>;

//   return (
//     <DndContext onDragEnd={handleDragEnd}>
//       {parent === null ? draggableMarkup : null}

//       {containers.map((id) => (
//         // We updated the Droppable component so it would accept an `id`
//         // prop and pass it to `useDroppable`
//         <Droppable key={id} id={id}>
//           {parent === id ? draggableMarkup : "Drop here"}
//         </Droppable>
//       ))}
//     </DndContext>
//   );

//   function handleDragEnd(event: DragEndEvent) {
//     const { over } = event;

//     // If the item is dropped over a container, set it as the parent
//     // otherwise reset the parent to `null`
//     setParent(over ? over.id : null);
//   }
// }

export default App;
