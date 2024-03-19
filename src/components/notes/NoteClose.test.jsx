import { describe, it, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";

import { mockTextNote, mockListNote } from "@/utils/mocks";

import { NoteClose } from "./NoteClose";

describe("NoteClose Component", () => {
  afterEach(cleanup);

  it("renders text note", () => {
    render(<NoteClose data={mockTextNote} />);
  });

  it("renders text note data correctly", () => {
    render(<NoteClose data={mockTextNote} />);
    screen.getByText(mockTextNote.title);
    screen.getByText(mockTextNote.text);
  });

  it("renders list note", () => {
    render(<NoteClose data={mockListNote} />);
  });

  it("renders list note data correctly", () => {
    render(<NoteClose data={mockListNote} />);
    screen.getByText(mockListNote.title);
    screen.getByText(mockListNote.list[0].item);
    screen.getByText(mockListNote.list[1].item);
  });
});
