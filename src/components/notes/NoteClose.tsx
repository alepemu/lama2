import { CSSProperties } from "react";
// Types
import { NoteCloseProps } from "@/types";

const NoteClose = ({ data, style, isDragging }: NoteCloseProps) => {
  const { typeId } = data;
  const inlineStyles: CSSProperties = {
    opacity: isDragging ? "0.75" : "1",
    border: isDragging ? "2px dashed white" : "",
    cursor: isDragging ? "move" : "default",
    ...style,
  };

  return (
    <div
      style={inlineStyles}
      className="flex flex-col justify-start min-w-80 h-full overflow-hidden bg-gradient-to-br from-stone-600 to-stone-700 px-4 py-2 rounded-xl border-2 border-white/25"
    >
      <h1 className="font-bold text-xl">{data.title}</h1>
      {typeId === 0 && <p className="whitespace-pre-line">{data.text}</p>}
      {typeId === 1 && (
        <ul className="list-disc ml-4">
          {data.list?.map((item, index) => (
            <li key={index} className="break-words">
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export { NoteClose };
