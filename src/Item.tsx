import { forwardRef, HTMLAttributes, CSSProperties } from "react";

export type ItemProps = HTMLAttributes<HTMLDivElement> & {
  id: string;
  text?: string;
  isDragging?: boolean;
};

const Item = forwardRef<HTMLDivElement, ItemProps>(
  ({ id, text, isDragging, style, ...props }, ref) => {
    const inlineStyles: CSSProperties = {
      opacity: isDragging ? "0.75" : "1",
      border: isDragging ? "2px dashed white" : "",
      transformOrigin: "50% 50%",
      cursor: isDragging ? "move" : "default",
      ...style,
    };

    return (
      <div
        className="min-w-80 bg-stone-700 p-4 rounded-xl text-sm font-bold text-white border border-white/25"
        ref={ref}
        style={inlineStyles}
        {...props}
      >
        {id} + {text}
      </div>
    );
  }
);

export default Item;
