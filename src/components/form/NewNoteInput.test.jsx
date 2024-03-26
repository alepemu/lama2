import { describe, it, afterEach, expect } from "vitest";
import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
} from "@testing-library/react";

import { Provider } from "react-redux";
import { store } from "@/store";

import { NewNoteInput } from "./NewNoteInput";
import { Dashboard } from "../layout/Dashboard";

describe("NewNoteInput Component", () => {
  afterEach(cleanup);

  it("renders input component", () => {
    render(
      <Provider store={store}>
        <NewNoteInput />
      </Provider>
    );
  });

  it("renders input component correctly", () => {
    render(
      <Provider store={store}>
        <NewNoteInput />
      </Provider>
    );
    const input = screen.getByTestId("new-note-input");
    fireEvent.change(input, { target: { value: "Test note A" } });
    expect(input.value).toBe("Test note A");
  });

  it("removes input value after submitting", () => {
    render(
      <Provider store={store}>
        <NewNoteInput />
      </Provider>
    );
    const input = screen.getByTestId("new-note-input");
    const form = screen.getByTestId("new-note-form");
    fireEvent.change(input, { target: { value: "Test note B" } });
    fireEvent.submit(form);
    expect(input.value).toBe("");
  });

  it("adds new note to the store", async () => {
    render(
      <Provider store={store}>
        <NewNoteInput />
      </Provider>
    );
    const state = store.getState();
    const notesLength = state.notes.length;

    const input = screen.getByTestId("new-note-input");
    const form = screen.getByTestId("new-note-form");
    fireEvent.change(input, { target: { value: "Test note C" } });
    fireEvent.submit(form);

    await waitFor(() => {
      const newState = store.getState();
      expect(newState.notes.length).toBe(notesLength + 1);
    });
  });

  it("adds new note in 1st place and correct content ", async () => {
    render(
      <Provider store={store}>
        <NewNoteInput />
      </Provider>
    );
    const input = screen.getByTestId("new-note-input");
    const form = screen.getByTestId("new-note-form");
    fireEvent.change(input, { target: { value: "Test note D" } });
    fireEvent.submit(form);

    await waitFor(() => {
      const state = store.getState();
      expect(state.notes[0].data.title).toBe("Test note D");
    });
  });

  it("adds new note to the dashboard component", async () => {
    render(
      <Provider store={store}>
        <NewNoteInput />
        <Dashboard />
      </Provider>
    );
    const input = screen.getByTestId("new-note-input");
    const form = screen.getByTestId("new-note-form");
    fireEvent.change(input, { target: { value: "Test note E" } });
    fireEvent.submit(form);

    await waitFor(() => {
      screen.getByText("Test note E");
    });
  });
});
