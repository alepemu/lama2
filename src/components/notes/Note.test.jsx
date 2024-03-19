import { describe, it, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";

import { mockTextNote, mockListNote } from "@/utils/mocks";

import { Provider } from "react-redux";
import { store } from "@/store";

import { Note } from "./Note";

describe("Note Component", () => {
  afterEach(cleanup);

  it("renders close text note", () => {
    render(
      <Provider store={store}>
        <Note data={mockTextNote} />
      </Provider>
    );
  });

  it("renders close text note data", () => {
    render(
      <Provider store={store}>
        <Note data={mockTextNote} />
      </Provider>
    );
    screen.getByText(mockTextNote.title);
    screen.getByText(mockTextNote.text);
  });

  it("renders open text note when clicked", () => {
    render(
      <Provider store={store}>
        <Note data={mockTextNote} />
      </Provider>
    );
    fireEvent.click(screen.getByTestId("note-close-container"));
    screen.getByDisplayValue(mockTextNote.title);
    screen.getByDisplayValue(mockTextNote.text);
    screen.getByTitle("Save button");
    screen.getByTitle("Theme button");
    screen.getByTitle("Delete button");
  });

  it("renders close list note", () => {
    render(
      <Provider store={store}>
        <Note data={mockListNote} />
      </Provider>
    );
  });

  it("renders close list note data", () => {
    render(
      <Provider store={store}>
        <Note data={mockListNote} />
      </Provider>
    );
    screen.getByText(mockListNote.title);
    screen.getByText(mockListNote.list[0].item);
    screen.getByText(mockListNote.list[1].item);
  });

  it("renders open list note when clicked", () => {
    render(
      <Provider store={store}>
        <Note data={mockListNote} />
      </Provider>
    );
    fireEvent.click(screen.getByTestId("note-close-container"));
    screen.getByDisplayValue(mockListNote.title);
    screen.getByDisplayValue(mockListNote.list[0].item);
    screen.getByDisplayValue(mockListNote.list[1].item);
    screen.getByTitle("Save button");
    screen.getByTitle("Theme button");
    screen.getByTitle("Delete button");
  });
});
