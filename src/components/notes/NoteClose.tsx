import { CSSProperties } from "react";
// Types
import { NoteCloseProps } from "@/types";
// Styles
import { backgroundColor } from "@/utils/placeholders";

const NoteClose = ({ data, style, isDragging }: NoteCloseProps) => {
  const theme = data.theme || "default";
  const bgFrom = backgroundColor[theme as keyof typeof backgroundColor][0];
  const bgTo = backgroundColor[theme as keyof typeof backgroundColor][1];

  const inlineStyles: CSSProperties = {
    opacity: isDragging ? "0.75" : "1",
    border: isDragging ? "2px dashed white" : "",
    cursor: isDragging ? "move" : "default",
    background: `linear-gradient(to right, ${bgFrom}, ${bgTo})`, // Add this line
    ...style,
  };

  return (
    <div
      style={inlineStyles}
      className="flex flex-col justify-start min-w-80 h-full overflow-hidden px-4 py-2 rounded-xl border-2 border-white/25"
    >
      <h1 className="font-bold text-xl">{data.title}</h1>
      {data.typeId === 0 && <p className="whitespace-pre-line">{data.text}</p>}
      {data.typeId === 1 && (
        <ul className="list-disc ml-4">
          {data.list?.map((item, index) => (
            <li key={index} className="break-words">
              {item.item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export { NoteClose };
