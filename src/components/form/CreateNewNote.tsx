import { useState, FormEvent } from "react";
// Components
import { NoteOptions } from "./NoteOptions";
import Button from "../buttons/button";
// State
import { useAppDispatch } from "../../hooks/store";
import { addNote } from "../../store/notes.slice";
import { toggleLoading } from "../../store/loading.slice";
// Types
import { NoteMethods, NoteTypes } from "../../types";
// Constants
import { noteInputText } from "../../utils/placeholders";

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
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: input, type }),
      };
      fetch(import.meta.env.VITE_APP_API_URL + "/ai-test", options)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (typeof data === "string") {
            dispatch(
              addNote({
                id: "temp",
                data: { title: input, text: data, typeId: 0 },
              })
            );
          } else {
            dispatch(
              addNote({
                id: "temp",
                data: { title: input, text: "Error", typeId: 0 },
              })
            );
          }
          dispatch(toggleLoading(false));
          form.reset();
        });
    } else if (method === "manual") {
      dispatch(
        addNote({
          id: "temp",
          data:
            type === "note"
              ? { title: input, text: type + "-" + method, typeId: 0 }
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
