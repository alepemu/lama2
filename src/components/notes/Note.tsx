import { forwardRef, CSSProperties } from "react";
import { NoteProps } from "../../types";

const Note = forwardRef<HTMLDivElement, NoteProps>(
  ({ id, data, isDragging, style, ...props }, ref) => {
    const inlineStyles: CSSProperties = {
      opacity: isDragging ? "0.75" : "1",
      border: isDragging ? "2px dashed white" : "",
      // transformOrigin: "50% 50%", // ??
      cursor: isDragging ? "move" : "default",
      ...style,
    };

    return (
      <div
        className="min-w-80 overflow-hidden bg-stone-700 p-4 rounded-xl text-white border-2 border-white/25"
        ref={ref}
        style={inlineStyles}
        {...props}
      >
        <h1 className="break-words font-bold text-xl">{data.title}</h1>
        {/* <p>{data.text}</p> */}
        {/* <ul>
          {data.list?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul> */}
        <p className="italic opacity-50">Id: {id}</p>
      </div>
    );
  }
);

export { Note };
