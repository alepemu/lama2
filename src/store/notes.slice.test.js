import { describe, it, expect } from "vitest";

import { mockTextNote, mockListNote } from "@/utils/mocks";

import { notesSlice } from "./notes.slice";

describe("notesSlice", () => {
  it("updateNotesOrder should update the notes order", () => {
    const initialState = [
      { id: "1", data: {} },
      { id: "2", data: {} },
    ];
    const newNotesOrder = [
      { id: "2", data: {} },
      { id: "1", data: {} },
    ];

    const finalState = notesSlice.reducer(initialState, {
      type: "notes/updateNotesOrder",
      payload: newNotesOrder,
    });

    expect(finalState).toEqual(newNotesOrder);
  });

  it("addNote should add a new text note to the state", () => {
    const initialState = [{ id: "1", data: {} }];

    const finalState = notesSlice.reducer(initialState, {
      type: "notes/addNote",
      payload: { data: mockTextNote },
    });

    expect(finalState.length).toBe(2);
    expect(finalState[0].data.title).toBe(mockTextNote.title);
    expect(finalState[0].data.text).toBe(mockTextNote.text);
    expect(finalState[0].data.typeId).toBe(mockTextNote.typeId);
    expect(finalState[1].id).toBe("1");
  });

  it("addNote should add a new list note to the state", () => {
    const initialState = [{ id: "1", data: {} }];

    const finalState = notesSlice.reducer(initialState, {
      type: "notes/addNote",
      payload: { data: mockListNote },
    });

    expect(finalState.length).toBe(2);
    expect(finalState[0].data.title).toBe(mockListNote.title);
    expect(finalState[0].data.list[0].item).toBe(mockListNote.list[0].item);
    expect(finalState[0].data.list[1].item).toBe(mockListNote.list[1].item);
    expect(finalState[0].data.typeId).toBe(mockListNote.typeId);
    expect(finalState[1].id).toBe("1");
  });

  it("updateNoteById should update a text note by its id", () => {
    const initialState = [
      { id: "1", data: {} },
      { id: "2", data: {} },
    ];
    const updatedNote = {
      id: "2",
      data: mockTextNote,
    };

    const finalState = notesSlice.reducer(initialState, {
      type: "notes/updateNoteById",
      payload: updatedNote,
    });

    expect(finalState).toEqual([initialState[0], updatedNote]);
  });

  it("updateNoteById should update a list note by its id", () => {
    const initialState = [
      { id: "1", data: {} },
      { id: "2", data: {} },
    ];
    const updatedNote = {
      id: "2",
      data: mockListNote,
    };

    const finalState = notesSlice.reducer(initialState, {
      type: "notes/updateNoteById",
      payload: updatedNote,
    });

    expect(finalState).toEqual([initialState[0], updatedNote]);
  });

  it("deleteNoteById should delete a note by its id", () => {
    const initialState = [
      { id: "1", data: {} },
      { id: "2", data: {} },
    ];

    const finalState = notesSlice.reducer(initialState, {
      type: "notes/deleteNoteById",
      payload: "1",
    });

    expect(finalState.length).toBe(1);
    expect(finalState).toEqual([initialState[1]]);
  });
});
