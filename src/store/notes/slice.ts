import strings from "../../assets/strings.json";
import { NoteType } from "../../types/types";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: NoteType[] = strings;

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    rearrangeNotes: (state, action: PayloadAction<NoteType[]>) => {
      return action.payload;
    },
    deleteNoteById: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      return state.filter((note) => note.id !== id);
    },
  },
});

export default notesSlice.reducer;

export const { rearrangeNotes, deleteNoteById } = notesSlice.actions;