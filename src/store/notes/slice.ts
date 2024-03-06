import strings from "../../assets/strings.json";
import { NoteType } from "../../types";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const notesSlice = createSlice({
  name: "notes",
  initialState: strings as NoteType[],
  reducers: {
    updateNotesOrder: (_, action: PayloadAction<NoteType[]>) => {
      return action.payload;
    },
    addNote: (state, action: PayloadAction<NoteType>) => {
      const id = Date.now().toString();
      const { title, text } = action.payload.data;
      return [{ data: { title, text }, id }, ...state];
    },
    deleteNoteById: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      return state.filter((note) => note.id !== id);
    },
  },
});

export default notesSlice.reducer;

export const { updateNotesOrder, addNote, deleteNoteById } = notesSlice.actions;
