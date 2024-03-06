import { forwardRef, CSSProperties } from "react";

// State
import { useAppDispatch } from "../../hooks/store";
import { deleteNoteById } from "../../store/notes.slice";

// Types
import { NoteProps } from "../../types";

const Note = forwardRef<HTMLDivElement, NoteProps>(
  ({ id, data, isDragging, style, ...props }, ref) => {
    const dispatch = useAppDispatch();

    const inlineStyles: CSSProperties = {
      opacity: isDragging ? "0.75" : "1",
      border: isDragging ? "2px dashed white" : "",
      cursor: isDragging ? "move" : "default",
      ...style,
    };

    return (
      <div
        className="relative min-w-80 overflow-hidden bg-stone-700 p-4 rounded-xl text-white border-2 border-white/25"
        ref={ref}
        style={inlineStyles}
        {...props}
      >
        <button
          className="absolute top-1 right-2 text-red-300 opacity-50 cursor-pointer"
          onClick={() => dispatch(deleteNoteById(id))}
        >
          X
        </button>
        <div>
          <h1 className="break-words font-bold text-xl">{data.title}</h1>
          <p>{data.text}</p>
          {/* <ul>
          {data.list?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul> */}
          <p className="italic opacity-50">Id: {id}</p>
        </div>
      </div>
    );
  }
);

export { Note };
