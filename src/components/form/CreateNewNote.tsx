import { useState, FormEvent } from "react";

// Components
import Button from "../buttons/button";

// State
import { useAppDispatch } from "../../hooks/store";
import { addNote } from "../../store/notes.slice";
import { toggleLoading } from "../../store/loading.slice";

// Types
import { NoteMethods, NoteTypes } from "../../types";

// Constants
import { newNotePlaceholder } from "../../utils/placeholders";

export function CreateNewNote() {
  const [type, setType] = useState<NoteTypes>("note");
  const [method, setMethod] = useState<NoteMethods>("ai");
  const dispatch = useAppDispatch();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const input = formData.get("input") as string;

    let delay = 0;
    if (method === "ai") {
      delay = 3000;
      dispatch(toggleLoading(true));
    }

    setTimeout(() => {
      dispatch(
        addNote({
          id: "temp",
          data: { title: input, text: type + "-" + method },
        })
      );
      dispatch(toggleLoading(false));
    }, delay);
  };

  return (
    <>
      <div className="h-28 lg:h-16 py-4 text-white flex flex-col lg:flex-row justify-center items-center gap-4 lg:gap-10">
        <div className="flex justify-center items-center gap-2">
          <p>Add</p>
          <Button
            onClick={() => setType("note")}
            className={`${type === "note" ? "bg-teal-600" : ""}`}
          >
            note
          </Button>
          <Button
            onClick={() => setType("list")}
            className={`${type === "list" ? "bg-teal-600" : ""}`}
          >
            list
          </Button>
          <p>from</p>
          <Button
            onClick={() => setMethod("manual")}
            className={`${method === "manual" ? "bg-amber-600" : ""}`}
          >
            input
          </Button>
          <Button
            onClick={() => setMethod("ai")}
            className={`${method === "ai" ? "bg-amber-600" : ""}`}
          >
            AI
          </Button>
        </div>
        <div>
          <form
            onSubmit={handleSubmit}
            className="flex justify-center items-center gap-2"
          >
            <input
              name="input"
              type="text"
              placeholder={newNotePlaceholder[type][method]}
              className="bg-transparent py-1 px-2 border-b-2 border-white/50 focus:outline-none"
            />
            <Button type="submit" className="bg-white/25">
              +
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
