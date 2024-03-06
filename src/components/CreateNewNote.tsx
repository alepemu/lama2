import { useState } from "react";
import { useForm } from "react-hook-form";

// import { addNote } from "../store/notes/slice";

import Button from "./buttons/button";

export function CreateNewNote() {
  const [type, setType] = useState<"note" | "list">("note");
  const [method, setMethod] = useState<"manual" | "ai">("ai");

  const inputPlaceholders = {
    note: { manual: "e.g. Note to remember", ai: "e.g. definition of closure" },
    list: {
      manual: "e.g. List of things",
      ai: "e.g. instructions to boil an egg",
    },
  };

  const { register, handleSubmit } = useForm();

  // const handleNewNote = () => {
  //   // @ts-ignore
  //   dispatch(addNote({ data: { title: "New note", text: "New note text" } }));
  // };

  return (
    <>
      <div className="bg-zinc-900 py-4 text-white">
        <form
          onSubmit={handleSubmit((data) => console.log(data))}
          className="flex flex-col justify-center items-center gap-2"
        >
          <div className="flex justify-center gap-2">
            <p>New</p>
            <Button className="">note</Button>
            <Button className="">list</Button>
            <p>from</p>
            <Button className="">input</Button>
            <Button className="">AI</Button>
          </div>
          <div className="flex justify-center gap-2">
            <input
              {...register("input", { required: true })}
              type="text"
              placeholder={inputPlaceholders[type][method]}
              className="bg-transparent border-b-2"
            />
            <Button type="submit" className="bg-white/25">
              +
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
