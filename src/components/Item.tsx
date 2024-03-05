import { forwardRef, CSSProperties } from "react";
import { ItemProps } from "../types/types";

const Item = forwardRef<HTMLDivElement, ItemProps>(
  ({ id, title, text, isDragging, style, ...props }, ref) => {
    const inlineStyles: CSSProperties = {
      opacity: isDragging ? "0.75" : "1",
      border: isDragging ? "1px dashed white" : "",
      transformOrigin: "50% 50%",
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
        <h1 className="font-bold text-xl">{title}</h1>
        <p>{text}</p>
        <p className="italic opacity-50">Id: {id}</p>
      </div>
    );
  }
);

export { Item };
