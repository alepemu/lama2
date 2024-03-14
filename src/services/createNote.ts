// import { apiFetch } from "@/utils/api";
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
    // const body = JSON.stringify({ query: { input, typeId } });
    // const response = await apiFetch("/ai", "POST", body);
    // const data = await response.json();
    // newNote.text = data.text;
    // newNote.list = data.list;
    await new Promise((resolve) => setTimeout(resolve, 3000));
    newNote.data.text = "Sorry, the server is currently off ):";
    newNote.data.list = [
      { itemId: Date.now(), item: "Sorry, the server is currently off ):" },
    ];
  } else if (method === "manual") {
    newNote.data.text = typeId === 0 ? "" : undefined;
    newNote.data.list = typeId === 1 ? [] : undefined;
  }
  console.log(newNote);

  return newNote;
};

export { createNewNote };
