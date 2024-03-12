import { forwardRef, CSSProperties } from "react";
// State
import { useAppDispatch } from "@/hooks/store";
import { deleteNoteById } from "@/store/notes.slice";
// Types
import { NoteProps } from "@/types";
//Components
import Button from "@/components/buttons/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/Dialog";

const Note = forwardRef<HTMLDivElement, NoteProps>(
  ({ id, data, isDragging, style, ...props }, ref) => {
    const dispatch = useAppDispatch();

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
            <button
              className="absolute top-0 right-2 text-red-300/25 cursor-pointer"
              onClick={() => dispatch(deleteNoteById(id || "1"))}
            >
              x
            </button>

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
              <p className="text-right text-xs italic opacity-50">id-{id}</p>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="w-5/6 bg-gradient-to-br from-stone-600 to-stone-700 text-white border-2 border-white/25">
          <DialogHeader>
            <DialogTitle>
              <input
                value={data.title}
                className="w-full bg-transparent focus:outline-none"
              />
            </DialogTitle>
            <DialogDescription className="text-white">
              {data.typeId === 0 && (
                <textarea
                  value={data.text}
                  className="w-full h-60 resize-none bg-transparent focus:outline-none"
                />
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="submit" className={"bg-teal-600"}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
);

export { Note };
