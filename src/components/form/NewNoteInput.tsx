import { useState, FormEvent } from "react";
// Components
import { NewNoteOptions } from "./NewNoteOptions";
// State
import { useAppSelector, useAppDispatch } from "@/hooks/store";
import { addNote } from "@/store/notes.slice";
import { toggleLoading } from "@/store/loading.slice";
//Services
import { createNewNote } from "@/services/createNote";
// Types
import { NoteMethods, NoteTypes } from "@/types";
// Constants
import { noteInputText } from "@/utils/placeholders";
// Icons
import { Plus, Sparkles } from "lucide-react";

export function NewNoteInput() {
  const [type, setType] = useState<NoteTypes>("note");
  const [method, setMethod] = useState<NoteMethods>("manual");
  const loading = useAppSelector((state) => state.loading);
  const dispatch = useAppDispatch();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const input = formData.get("input") as string;
    const typeId = type === "note" ? 0 : 1;
    if (!input) return;

    form.reset();
    dispatch(toggleLoading(true));
    dispatch(addNote({ data: await createNewNote(input, typeId, method) }));
    dispatch(toggleLoading(false));
  };

  return (
    <div className="h-28 md:h-16 py-4 flex flex-col md:flex-row justify-center items-center gap-4 lg:gap-10">
      <NewNoteOptions
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
            disabled={loading}
            name="input"
            type="text"
            placeholder={noteInputText[type][method]}
            autoComplete="off"
            className="bg-transparent py-1 px-2 border-b-2 border-white/50 focus:outline-none"
          />
          <button
            disabled={loading}
            type="submit"
            className="flex justify-center items-center bg-stone-700 rounded-xl p-1 font-bold w-8 h-8"
          >
            {method === "ai" ? <Sparkles size={16} /> : <Plus size={16} />}
          </button>
        </form>
      </div>
    </div>
  );
}
