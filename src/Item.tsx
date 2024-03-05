import { forwardRef, HTMLAttributes, CSSProperties } from "react";

export type ItemProps = HTMLAttributes<HTMLDivElement> & {
  id: string;
  text?: string;
  withOpacity?: boolean;
  isDragging?: boolean;
};

const Item = forwardRef<HTMLDivElement, ItemProps>(
  ({ id, text, withOpacity, isDragging, style, ...props }, ref) => {
    const inlineStyles: CSSProperties = {
      // opacity: withOpacity ? "0.5" : "1",
      opacity: isDragging ? "0.5" : "1",
      transformOrigin: "50% 50%",
      cursor: isDragging ? "move" : "default",
      transform: isDragging ? "scale(1.05)" : "scale(1)",
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
