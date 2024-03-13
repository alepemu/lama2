import { apiFetch } from "@/utils/api";

type NewNoteProps = {
  title: string;
  typeId: number;
  text?: string;
  list?: string[];
};

const createNewNote = async (
  input: string,
  typeId: number,
  method: string
): Promise<NewNoteProps> => {
  const newNote: NewNoteProps = {
    title: input,
    typeId: typeId,
    text: undefined,
    list: undefined,
  };

  if (method === "ai") {
    const body = JSON.stringify({ query: { input, typeId } });
    const response = await apiFetch("/ai", "POST", body);
    const data = await response.json();
    newNote.text = data.text;
    newNote.list = data.list;
  } else if (method === "manual") {
    newNote.text = typeId === 0 ? "note" : undefined;
    newNote.list = typeId === 1 ? Array(3).fill("item") : undefined;
  }

  return newNote;
};

export { createNewNote };
