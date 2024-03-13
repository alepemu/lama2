import { useState } from "react";
// State
import { useAppDispatch } from "@/hooks/store";
import { updateNoteById, deleteNoteById } from "@/store/notes.slice";
// Components
import { Button } from "@/components/shadcn/Button";
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
  const [list, setList] = useState(data.list);
  const dispatch = useAppDispatch();

  const handleEdit = (event: React.FormEvent) => {
    event.preventDefault();
    const data = { title, text, list, typeId };
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
      <form onSubmit={handleEdit} className="space-y-2">
        <DialogHeader>
          <DialogTitle>
            <input
              name="title"
              placeholder="Title..."
              tabIndex={-1}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="w-full bg-transparent focus:outline-none text-2xl"
            />
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {data.text && (
            <textarea
              name="text"
              placeholder="Content..."
              tabIndex={-1}
              value={text}
              onChange={(event) => setText(event.target.value)}
              className="w-full resize-none h-60 bg-transparent focus:outline-none text-base"
            />
          )}
          {data.list && (
            <ul className="list-disc ml-4 text-base">
              {data.list?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </DialogDescription>
        <DialogFooter>
          <Button className="bg-stone-700 !px-1" onClick={handleDelete}>
            <Trash2 className="h-4" />
          </Button>
          {/* <Button className="bg-black/50 !px-1">
            <Palette className="h-4" />
          </Button> */}
          <Button type="submit" className="bg-green-700">
            Save
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
