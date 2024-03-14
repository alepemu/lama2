import { CSSProperties, useState } from "react";
// State
import { useAppDispatch } from "@/hooks/store";
import { updateNoteById, deleteNoteById } from "@/store/notes.slice";
// Components
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/shadcn/Dialog";
import { ListGroup } from "@/components/notes/list/ListGroup";
import { Button } from "@/components/shadcn/Button";
import TextareaAutosize from "react-textarea-autosize";
// Types
import { NoteOpenProps } from "@/types";
// Icons
import { Trash2 } from "lucide-react";
// Styles
import { backgroundColor } from "@/utils/placeholders";

export function NoteOpen({ id, data, close }: NoteOpenProps) {
  const { typeId } = data;
  const theme = data.theme || "default";

  const [title, setTitle] = useState<string>(data.title);
  const [text, setText] = useState<string | undefined>(data.text);
  const [list, setList] = useState<
    { itemId: number; item: string }[] | undefined
  >(data.list);
  const [listNewItem, setListNewItem] = useState<string>("");
  const dispatch = useAppDispatch();

  const handleEditNote = (event: React.FormEvent) => {
    event.preventDefault();

    let updatedList = list;
    if (listNewItem !== "") {
      console.log(listNewItem);

      const item = { itemId: Date.now(), item: listNewItem };
      updatedList = [...(list ?? []), item];
      setList(updatedList);
      setListNewItem("");
    }

    const data = { title, text, list: updatedList ?? [], typeId, theme };
    if (title === "" && (text === "" || !(list ?? []).length))
      dispatch(deleteNoteById(id));
    else dispatch(updateNoteById({ id, data }));
    close();
  };

  const bgFrom = backgroundColor[theme as keyof typeof backgroundColor][0];
  const bgTo = backgroundColor[theme as keyof typeof backgroundColor][1];

  const inlineStyles: CSSProperties = {
    background: `linear-gradient(to right, ${bgFrom}, ${bgTo})`, // Add this line
  };

  return (
    <DialogContent
      style={inlineStyles}
      className="bg-gradient-to-br from-stone-600 to-stone-700 text-white border-y-2 border-white/25"
      onInteractOutside={(event) => handleEditNote(event as any)}
    >
      <DialogHeader>
        <DialogTitle>
          <input
            name="title"
            placeholder="Title"
            tabIndex={-1}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="w-full bg-transparent focus:outline-none text-2xl"
          />
        </DialogTitle>
      </DialogHeader>
      {/* IF TEXT */}
      {data.typeId === 0 && (
        <TextareaAutosize
          name="text"
          placeholder="Note"
          tabIndex={-1}
          value={text}
          onChange={(event) => setText(event.target.value)}
          className="resize-none bg-transparent focus:outline-none text-base"
        />
      )}
      {/* IF LIST */}
      {data.typeId === 1 && (
        <ListGroup
          list={list}
          setList={setList}
          listNewItem={listNewItem}
          setListNewItem={setListNewItem}
        />
      )}
      <DialogFooter>
        <Button
          className="bg-stone-700 !px-1"
          onClick={() => {
            dispatch(deleteNoteById(id));
            close();
          }}
        >
          <Trash2 className="h-4" />
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
