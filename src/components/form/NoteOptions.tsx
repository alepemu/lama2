// Components
import Button from "../buttons/button";
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
  );
}
