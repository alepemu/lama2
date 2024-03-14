// Types
import { NoteInputType } from "@/types";

const createNewNote = async (
  input: string,
  typeId: number,
  method: string
): Promise<NoteInputType> => {
  const newNote: NoteInputType = {
    data: { title: input, typeId: typeId, text: undefined, list: undefined },
  };

  if (method === "ai") {
    const body = JSON.stringify({ input, typeId });
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/ai`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });

      if (!response.ok) {
        newNote.data.title = "Oops!";
        newNote.data.text = "The server response has failed ):";
        newNote.data.typeId = 0;
      }

      const data = await response.json();
      if (data.title) newNote.data.title = data.title;
      newNote.data.text = data.text;
      newNote.data.list = data.list;
      newNote.data.typeId = data.typeId;
    } catch (error) {
      newNote.data.title = "Oops!";
      newNote.data.text = "The server is currently down ):";
      newNote.data.typeId = 0;
    }
  } else if (method === "manual") {
    newNote.data.text = typeId === 0 ? "" : undefined;
    newNote.data.list = typeId === 1 ? [] : undefined;
    newNote.data.typeId = typeId;
  }

  return newNote;
};

export { createNewNote };
