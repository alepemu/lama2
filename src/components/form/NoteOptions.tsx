// Components
// import Button from "../buttons/button";
// Types
import { NoteTypes, NoteMethods } from "@/types";

type Props = {
  type: NoteTypes;
  method: NoteMethods;
  setType: (type: NoteTypes) => void;
  setMethod: (method: NoteMethods) => void;
};

export function NoteOptions({ type, method, setType, setMethod }: Props) {
  return (
    <div className="flex justify-center items-center gap-2">
      <p>Add</p>

      <div className="bg-stone-700 rounded-xl p-1">
        <button
          onClick={() => setType("note")}
          className={`px-2 rounded-lg ${type === "note" ? "bg-amber-600" : ""}`}
        >
          note
        </button>
        <button
          onClick={() => setType("list")}
          className={`px-2 rounded-lg ${type === "list" ? "bg-amber-600" : ""}`}
        >
          list
        </button>
      </div>
      <p>from</p>
      <div className="bg-stone-700 rounded-xl p-1">
        <button
          onClick={() => setMethod("manual")}
          className={`px-2 rounded-lg ${
            method === "manual" ? "bg-amber-600" : ""
          }`}
        >
          input
        </button>
        <button
          onClick={() => setMethod("ai")}
          className={`px-2 rounded-lg ${method === "ai" ? "bg-amber-600" : ""}`}
        >
          AI
        </button>
      </div>
    </div>
  );
}
