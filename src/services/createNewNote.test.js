import { describe, it, expect } from "vitest";

import { createNewNote } from "./createNewNote";

describe("createNewNote Service", () => {
  it("should create a new text note with manual method", async () => {
    const input = "Test Manual Note";
    const typeId = 0;
    const method = "manual";

    const textNote = await createNewNote(input, typeId, method);
    expect(textNote.data.title).toBe(input);
    expect(textNote.data.typeId).toBe(typeId);
    expect(textNote.data.text).toBe("");
    expect(textNote.data.list).toBeUndefined();
  });

  it("should create a new list note with manual method", async () => {
    const input = "List Manual Note";
    const typeId = 1;
    const method = "manual";

    const listNote = await createNewNote(input, typeId, method);
    expect(listNote.data.title).toBe(input);
    expect(listNote.data.typeId).toBe(typeId);
    expect(listNote.data.text).toBeUndefined();
    expect(listNote.data.list).toEqual([]);
  });

  it("should create a new text note with AI method", async () => {
    const input = "Test AI Note";
    const typeId = 0;
    const method = "ai";

    const textNote = await createNewNote(input, typeId, method);
    expect(textNote.data.title).toBe("Oops!");
    expect(textNote.data.typeId).toBe(0);
    expect(textNote.data.text).toBe("The server is currently down ):");
    expect(textNote.data.list).toBeUndefined();
  });
});
