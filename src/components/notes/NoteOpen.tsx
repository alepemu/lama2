import { useRef, useState } from "react";
// State
import { useAppDispatch } from "@/hooks/store";
import { updateNoteById } from "@/store/notes.slice";
// Components
import Button from "@/components/buttons/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/shadcn/Dialog";
// Types
import { NoteOpenProps } from "@/types";

export function NoteOpen({ id, data, close }: NoteOpenProps) {
  const { typeId } = data;
  const [title, setTitle] = useState(data.title);
  const [text, setText] = useState(data.text);
  const dispatch = useAppDispatch();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const data = { title, text, typeId };
    dispatch(updateNoteById({ id, data }));
    close();
  };

  return (
    <DialogContent
      className="w-5/6 bg-gradient-to-br from-stone-600 to-stone-700 text-white border-2 border-white/25"
      onInteractOutside={(event) => {
        event.preventDefault();
        handleSubmit(event as any);
      }}
    >
      <form onSubmit={handleSubmit}>
        <DialogHeader>
          <DialogTitle>
            <input
              name="title"
              placeholder="Give a title..."
              tabIndex={-1}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="w-full bg-transparent focus:outline-none text-2xl"
            />
          </DialogTitle>
          <DialogDescription className="text-white">
            {data.typeId === 0 && (
              <textarea
                name="text"
                placeholder="Start typing..."
                tabIndex={-1}
                value={text}
                onChange={(event) => setText(event.target.value)}
                className="w-full resize-none h-60 bg-transparent focus:outline-none text-base"
              />
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit" className="bg-cyan-600">
            Save
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
