import mocks from "@/assets/mocks.json";
import { NoteType, NoteInputType, NoteBasicProps } from "@/types";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const getInitialState = (): NoteType[] => {
  const persistedState = localStorage.getItem("notes");
  if (!persistedState) return mocks as NoteType[];
  const parsed = JSON.parse(persistedState);
  return parsed.notes.length === 0
    ? (mocks as NoteType[])
    : (parsed.notes as NoteType[]);
};

const initialState: NoteType[] = getInitialState();

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    updateNotesOrder: (_, action: PayloadAction<NoteType[]>) => {
      return action.payload;
    },
    addNote: (state, action: PayloadAction<NoteInputType>) => {
      const id = Date.now().toString();
      const { title, text, list, typeId } = action.payload.data;
      return [{ data: { title, text, list, typeId }, id }, ...state];
    },
    updateNoteById: (state, action: PayloadAction<NoteBasicProps>) => {
      const { id, data } = action.payload;
      const { title, text, list, typeId } = data;
      const updatedNote = { id, data: { title, text, list, typeId } };
      return state.map((note) => (note.id === id ? updatedNote : note));
    },
    deleteNoteById: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      return state.filter((note) => note.id !== id);
    },
  },
});

export default notesSlice.reducer;

export const { updateNotesOrder, addNote, updateNoteById, deleteNoteById } =
  notesSlice.actions;
