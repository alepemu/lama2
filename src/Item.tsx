import React, { forwardRef, HTMLAttributes, CSSProperties } from "react";

export type ItemProps = HTMLAttributes<HTMLDivElement> & {
  id: string;
  text?: string;
  withOpacity?: boolean;
  isDragging?: boolean;
};

const Item = forwardRef<HTMLDivElement, ItemProps>(
  ({ id, text, withOpacity, isDragging, style, ...props }, ref) => {
    const inlineStyles: CSSProperties = {
      opacity: withOpacity ? "0.5" : "1",
      transformOrigin: "50% 50%",
    //   height: "140px",
      // width: '140px',
      // minWidth: '300px',
      // borderRadius: '10px',
      cursor: isDragging ? "move" : "default",
      // boxShadow: isDragging  ? 'rgb(63 63 68 / 5%) 0px 2px 0px 2px, rgb(34 33 81 / 15%) 0px 2px 3px 2px' : 'rgb(63 63 68 / 5%) 0px 0px 0px 1px, rgb(34 33 81 / 15%) 0px 1px 3px 0px',
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
        {/* {id} */}
        {id} + {text}
      </div>
    );
  }
);

export default Item;
