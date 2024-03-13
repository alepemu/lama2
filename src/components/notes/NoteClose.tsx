import { CSSProperties } from "react";
// Types
import { NoteCloseProps } from "@/types";

const NoteClose = ({ data, style, isDragging }: NoteCloseProps) => {
  const inlineStyles: CSSProperties = {
    opacity: isDragging ? "0.75" : "1",
    border: isDragging ? "2px dashed white" : "",
    cursor: isDragging ? "move" : "default",
    ...style,
  };

  return (
    <div
      style={inlineStyles}
      className="relative min-w-80 overflow-hidden bg-gradient-to-br from-stone-600 to-stone-700 px-4 py-2 rounded-xl text-white border-2 border-white/25"
    >
      <div className="flex flex-col justify-between h-full">
        <div>
          <h1 className="break-words font-bold text-xl">{data.title}</h1>
          {data.typeId === 0 && <p>{data.text}</p>}
          {data.typeId === 1 && (
            <ul className="list-disc ml-4">
              {data.list?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
export { NoteClose };
