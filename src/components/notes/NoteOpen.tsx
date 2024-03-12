import { useState } from "react";
// State
import { useAppDispatch } from "@/hooks/store";
import { updateNoteById, deleteNoteById } from "@/store/notes.slice";
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

import { Palette, Trash2 } from "lucide-react";

export function NoteOpen({ id, data, close }: NoteOpenProps) {
  const { typeId } = data;
  const [title, setTitle] = useState(data.title);
  const [text, setText] = useState(data.text);
  const dispatch = useAppDispatch();

  const handleEdit = (event: React.FormEvent) => {
    event.preventDefault();
    const data = { title, text, typeId };
    if (title === "" && text === "") dispatch(deleteNoteById(id));
    else dispatch(updateNoteById({ id, data }));
    close();
  };

  const handleDelete = () => {
    dispatch(deleteNoteById(id));
    close();
  };

  return (
    <DialogContent
      className="w-5/6 bg-gradient-to-br from-stone-600 to-stone-700 text-white border-2 border-white/25"
      onInteractOutside={(event) => {
        handleEdit(event as any);
      }}
    >
      <form onSubmit={handleEdit}>
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
          <Button className="bg-black/50 !px-1" onClick={handleDelete}>
            <Trash2 className="h-4 text-white/75" />
          </Button>
          <Button className="bg-emerald-600/50 !px-1">
            <Palette className="h-4 text-white/75" />
          </Button>
          <Button type="submit" className="bg-rose-500">
            Save
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
