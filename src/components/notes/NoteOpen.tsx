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
import TextareaAutosize from "react-textarea-autosize";
// Types
import { NoteOpenProps } from "@/types";
// Icons
import { Trash2 } from "lucide-react";

export function NoteOpen({ id, data, close }: NoteOpenProps) {
  const { typeId } = data;
  const [title, setTitle] = useState<string>(data.title);
  const [text, setText] = useState<string | undefined>(data.text);
  const [list, setList] = useState<string[] | undefined>(data.list);
  const [listItem, setListItem] = useState<string>("");
  const dispatch = useAppDispatch();

  const updateListItem = (index: number, updatedItem: string) => {
    setList((list) => {
      const newList = [...(list ?? [])];
      newList[index] = updatedItem;
      return newList;
    });
  };

  const handleEditNote = (event: React.FormEvent) => {
    event.preventDefault();

    let updatedList = list;
    if (listItem) {
      updatedList = [...(list ?? []), listItem];
      setList(updatedList);
      setListItem("");
    }

    const data = { title, text, list: updatedList, typeId };
    if (title === "" && text === "") dispatch(deleteNoteById(id));
    else dispatch(updateNoteById({ id, data }));
    close();
  };

  const handleEditList = (event: React.FormEvent) => {
    event.preventDefault();
    if (listItem === "") return;
    setList((list) => [...(list ?? []), listItem]);
    setListItem("");
  };

  const handleDelete = () => {
    dispatch(deleteNoteById(id));
    close();
  };

  return (
    <DialogContent
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
      {typeId === 0 && (
        <TextareaAutosize
          name="text"
          placeholder="Note"
          tabIndex={-1}
          value={text}
          onChange={(event) => setText(event.target.value)}
          className="resize-none bg-transparent focus:outline-none text-base"
        />
      )}
      {typeId === 1 && (
        <>
          <ul className="list-disc ml-4">
            {list?.map((item, index) => {
              const key = item + Date.now();
              return (
                <li key={key} className="break-words">
                  <ListItem
                    index={index}
                    item={item}
                    updateList={(updatedItem) =>
                      updateListItem(index, updatedItem)
                    }
                    removeItem={() =>
                      setList((list) => {
                        const newList = [...(list ?? [])];
                        newList.splice(index, 1);
                        return newList;
                      })
                    }
                  />
                </li>
              );
            })}
            <li>
              <form onSubmit={handleEditList}>
                <input
                  name="list-item-new"
                  placeholder="List item"
                  tabIndex={-1}
                  value={listItem}
                  autoComplete="off"
                  onChange={(event) => setListItem(event.target.value)}
                  className="w-4/5 bg-transparent focus:outline-none text-base"
                />
              </form>
            </li>
          </ul>
        </>
      )}
      <DialogFooter>
        <Button className="bg-stone-700 !px-1" onClick={handleDelete}>
          <Trash2 className="h-4" />
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
