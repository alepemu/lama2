import { useState } from "react";
// State
import { useAppDispatch } from "@/hooks/store";
import { updateNoteById, deleteNoteById } from "@/store/notes.slice";
// Components
import { Button } from "@/components/shadcn/Button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/shadcn/Dialog";
import { ListItem } from "@/components/notes/list/ListItem";
// Types
import { NoteOpenProps } from "@/types";

import { /*Palette,*/ Trash2 } from "lucide-react";

export function NoteOpen({ id, data, close }: NoteOpenProps) {
  const { typeId } = data;
  const [title, setTitle] = useState<string>(data.title);
  const [text, setText] = useState<string | undefined>(data.text);
  const [list, setList] = useState<string[] | undefined>(data.list);
  const [listItem, setListItem] = useState<string>("");
  const dispatch = useAppDispatch();

  const updateListItem = (index: number, newItem: string) => {
    if (newItem === "") {
      setList((list) => {
        const newList = [...(list ?? [])];
        newList.splice(index, 1);
        return newList;
      });
      return;
    }
    setList((list) => {
      const newList = [...(list ?? [])];
      newList[index] = newItem;
      return newList;
    });
  };

  const handleEditNote = (event: React.FormEvent) => {
    event.preventDefault();

    let updatedList = list;
    if (listItem) {
      console.log("eeeh");
      console.log(listItem);
      updatedList = [...(list ?? []), listItem];
      setList(updatedList);
      setListItem("");
    }

    const data = { title, text, list: updatedList, typeId };
    if (title === "" && text === "") dispatch(deleteNoteById(id));
    else dispatch(updateNoteById({ id, data }));
    close();
  };

  // const handleEditList = (event: React.FormEvent) => {};

  const handleDelete = () => {
    dispatch(deleteNoteById(id));
    close();
  };

  return (
    <DialogContent
      className="w-5/6 bg-gradient-to-br from-stone-600 to-stone-700 text-white border-2 border-white/25"
      onInteractOutside={(event) => {
        handleEditNote(event as any);
      }}
    >
      <form onSubmit={handleEditNote} className="space-y-2">
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
        {text && (
          <textarea
            name="text"
            placeholder="Content..."
            tabIndex={-1}
            value={text}
            onChange={(event) => setText(event.target.value)}
            className="w-full resize-none h-60 bg-transparent focus:outline-none text-base"
          />
        )}
        {list && (
          <>
            <ul className="list-disc ml-4">
              {data.list?.map((item, index) => (
                <li key={index} className="break-words">
                  <ListItem
                    index={index}
                    item={item}
                    updateList={(newItem) => updateListItem(index, newItem)}
                  />
                </li>
              ))}
              <li>
                <input
                  name="list-item-new"
                  placeholder="New item..."
                  value={listItem}
                  onChange={(event) => setListItem(event.target.value)}
                  className="w-4/5 bg-transparent focus:outline-none text-base"
                />
              </li>
            </ul>
          </>
        )}
        <DialogFooter>
          <Button className="bg-stone-700 !px-1" onClick={handleDelete}>
            <Trash2 className="h-4" />
          </Button>
          {/* <Button className="bg-black/50 !px-1">
            <Palette className="h-4" />
          </Button> */}
          {/* <Button type="submit" className="bg-green-700">
            Save
          </Button> */}
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
