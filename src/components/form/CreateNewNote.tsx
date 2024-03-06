import { useState } from "react";
import { useForm } from "react-hook-form";

import { useAppDispatch } from "../../hooks/store";

import { addNote } from "../../store/notes/slice";

import Button from "../buttons/button";

import { newNotePlaceholder } from "../../utils/placeholders";

export function CreateNewNote() {
  const [type, setType] = useState<"note" | "list">("note");
  const [method, setMethod] = useState<"manual" | "ai">("ai");

  const dispatch = useAppDispatch();

  const { register, handleSubmit, reset } = useForm();

  const createNote = ({ input }: { input: string }) => {
    dispatch(
      addNote({
        id: "temp",
        data: { title: input, text: "New note text" },
      })
    );
    reset();
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
            onSubmit={handleSubmit(({ input }) => createNote({ input }))}
            className="flex justify-center items-center gap-2"
          >
            <input
              {...register("input", { required: true })}
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
