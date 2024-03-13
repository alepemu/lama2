import { forwardRef, useState } from "react";
// Types
import { NoteProps } from "@/types";
//Components
import { NoteOutside } from "@/components/notes/NoteOutside";
import { NoteOpen } from "@/components/notes/NoteOpen";
import { Dialog, DialogTrigger } from "@/components/shadcn/Dialog";

const Note = forwardRef<HTMLDivElement, NoteProps>(
  ({ id, data, isDragging, style, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Dialog open={isOpen}>
        <DialogTrigger asChild onClick={() => setIsOpen(true)}>
          <div ref={ref} {...props}>
            <NoteOutside
              id={id}
              data={data}
              style={style}
              isDragging={isDragging}
            />
          </div>
        </DialogTrigger>
        <NoteOpen id={id} data={data} close={() => setIsOpen(false)} />
      </Dialog>
    );
  }
);

export { Note };
