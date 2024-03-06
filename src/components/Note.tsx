import { forwardRef, CSSProperties } from "react";
import { NoteProps } from "../types/types";

import { useAppDispatch } from "../hooks/store";
import { deleteNoteById } from "../store/notes/slice";

const Note = forwardRef<HTMLDivElement, NoteProps>(
  ({ id, data, isDragging, style, ...props }, ref) => {
    const dispatch = useAppDispatch();

    const handleDeleteNote = () => {
      console.log("handleDeleteNote", id);
      dispatch(deleteNoteById(id));
    };

    const inlineStyles: CSSProperties = {
      opacity: isDragging ? "0.75" : "1",
      border: isDragging ? "1px dashed white" : "",
      // transformOrigin: "50% 50%", // ??
      cursor: isDragging ? "move" : "default",
      ...style,
    };

    return (
      <div
        className="min-w-80 bg-stone-700 p-4 rounded-xl text-white border border-white/25"
        ref={ref}
        style={inlineStyles}
        {...props}
      >
        <button
          className="bg-red-100/50 w-full text-red-700 font-bold cursor-pointer z-100"
          onClick={handleDeleteNote}
        >
          DEL
        </button>
        <h1 className="font-bold text-xl">{data.title}</h1>
        <p>{data.text}</p>
        <ul>
          {data.list?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <p className="italic opacity-50">Id: {id}</p>
      </div>
    );
  }
);

export { Note };
