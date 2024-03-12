import { forwardRef, CSSProperties } from "react";
// Types
import { NoteProps } from "@/types";
//Components
import { NoteOutside } from "@/components/notes/NoteOutside";
import { NoteOpen } from "@/components/notes/NoteOpen";
import { Dialog, DialogTrigger } from "@/components/shadcn/Dialog";

const Note = forwardRef<HTMLDivElement, NoteProps>(
  ({ id, data, isDragging, style, ...props }, ref) => {
    const inlineStyles: CSSProperties = {
      opacity: isDragging ? "0.75" : "1",
      border: isDragging ? "2px dashed white" : "",
      cursor: isDragging ? "move" : "default",
      ...style,
    };

    return (
      <Dialog>
        <DialogTrigger asChild>
          <div
            className="relative min-w-80 overflow-hidden bg-gradient-to-br from-stone-600 to-stone-700 px-4 py-2 rounded-xl text-white border-2 border-white/25"
            ref={ref}
            style={inlineStyles}
            {...props}
          >
            <NoteOutside id={id} data={data} />
          </div>
        </DialogTrigger>
        <NoteOpen id={id} data={data} />
      </Dialog>
    );
  }
);

export { Note };
