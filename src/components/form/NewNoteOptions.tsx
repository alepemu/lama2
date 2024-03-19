// Components
import { Button } from "../shadcn/Button";
// Types
import { NoteTypes, NoteMethods } from "@/types";

type NewNoteOptionsProps = {
  type: NoteTypes;
  method: NoteMethods;
  setType: (type: NoteTypes) => void;
  setMethod: (method: NoteMethods) => void;
};

export const NewNoteOptions = ({
  type,
  method,
  setType,
  setMethod,
}: NewNoteOptionsProps) => {
  return (
    <div className="flex justify-center items-center gap-2">
      <p>Add</p>
      <div className="bg-stone-700 rounded-xl p-1">
        <Button
          onClick={() => setType("note")}
          variant="empty"
          size="toggle"
          active={type === "note"}
        >
          note
        </Button>
        <Button
          onClick={() => setType("list")}
          variant="empty"
          size="toggle"
          active={type === "list"}
        >
          list
        </Button>
      </div>
      <p>from</p>
      <div className="bg-stone-700 rounded-xl p-1">
        <Button
          onClick={() => setMethod("manual")}
          variant="empty"
          size="toggle"
          active={method === "manual"}
        >
          input
        </Button>
        <Button
          onClick={() => setMethod("ai")}
          variant="empty"
          size="toggle"
          active={method === "ai"}
        >
          AI
        </Button>
      </div>
    </div>
  );
};
