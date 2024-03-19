// Types
import { NoteDataType } from "@/types";

const handleServerError = (newNote: NoteDataType, message: string) => {
  newNote.data.title = "Oops!";
  newNote.data.text = message;
  newNote.data.typeId = 0;
};

export const createNewNote = async (
  input: string,
  typeId: number,
  method: string
): Promise<NoteDataType> => {
  const newNote: NoteDataType = {
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
        handleServerError(newNote, "The server response has failed ):");
        return newNote;
      }

      const data = await response.json();
      newNote.data = { ...newNote.data, ...data };
    } catch (error) {
      handleServerError(newNote, "The server is currently down ):");
    }
  } else if (method === "manual") {
    newNote.data.text = typeId === 0 ? "" : undefined;
    newNote.data.list = typeId === 1 ? [] : undefined;
  }

  return newNote;
};
