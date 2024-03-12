import { forwardRef, CSSProperties, useState } from "react";
// Types
import { NoteProps } from "@/types";
//Components
import { NoteOutside } from "@/components/notes/NoteOutside";
import { NoteOpen } from "@/components/notes/NoteOpen";
import { Dialog, DialogTrigger } from "@/components/shadcn/Dialog";

const Note = forwardRef<HTMLDivElement, NoteProps>(
  ({ id, data, isDragging, style, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const inlineStyles: CSSProperties = {
      opacity: isDragging ? "0.75" : "1",
      border: isDragging ? "2px dashed white" : "",
      cursor: isDragging ? "move" : "default",
      ...style,
    };

    return (
      <Dialog open={isOpen}>
        <DialogTrigger asChild onClick={() => setIsOpen(true)}>
          <div
            className="relative min-w-80 overflow-hidden bg-gradient-to-br from-stone-600 to-stone-700 px-4 py-2 rounded-xl text-white border-2 border-white/25"
            ref={ref}
            style={inlineStyles}
            {...props}
          >
            <NoteOutside id={id} data={data} />
          </div>
        </DialogTrigger>
        <NoteOpen id={id} data={data} close={() => setIsOpen(false)} />
      </Dialog>
    );
  }
);

export { Note };
