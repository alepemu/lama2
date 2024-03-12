import { useState, FormEvent } from "react";
// Components
import { NoteOptions } from "./NoteOptions";
import Button from "../buttons/button";
// State
import { useAppDispatch } from "@/hooks/store";
import { addNote } from "@/store/notes.slice";
import { toggleLoading } from "@/store/loading.slice";
// Types
import { NoteMethods, NoteTypes } from "@/types";
// Constants
import { noteInputText } from "@/utils/placeholders";
import { apiFetch } from "@/utils/api";

export function CreateNewNote() {
  const [type, setType] = useState<NoteTypes>("note");
  const [method, setMethod] = useState<NoteMethods>("manual");
  const dispatch = useAppDispatch();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const input = formData.get("input") as string;

    dispatch(toggleLoading(true));

    if (method === "ai") {
      apiFetch("/ai-test", "POST", JSON.stringify({ query: input, type }))
        .then((response) => response.json())
        .then((data) => {
          if (typeof data === "string") {
            dispatch(
              addNote({
                data: { title: input, text: data, typeId: 0 },
              })
            );
          } else if (typeof data === "object") {
            dispatch(
              addNote({
                data: { title: input, list: data, typeId: 1 },
              })
            );
          } else {
            alert("Error");
          }
          dispatch(toggleLoading(false));
          form.reset();
        });
    } else if (method === "manual") {
      dispatch(
        addNote({
          data:
            type === "note"
              ? { title: input, text: "", typeId: 0 }
              : {
                  title: input,
                  list: Array(3).fill(type + "-" + method),
                  typeId: 1,
                },
        })
      );
      dispatch(toggleLoading(false));
      form.reset();
    }
  };

  return (
    <div className="h-28 lg:h-16 py-4 text-white flex flex-col lg:flex-row justify-center items-center gap-4 lg:gap-10">
      <NoteOptions
        type={type}
        method={method}
        setType={setType}
        setMethod={setMethod}
      />
      <div>
        <form
          onSubmit={handleSubmit}
          className="flex justify-center items-center gap-2"
        >
          <input
            name="input"
            type="text"
            placeholder={noteInputText[type][method]}
            className="bg-transparent py-1 px-2 border-b-2 border-white/50 focus:outline-none"
          />
          <Button type="submit" className="bg-white/25 font-bold">
            ＋
          </Button>
        </form>
      </div>
    </div>
  );
}
