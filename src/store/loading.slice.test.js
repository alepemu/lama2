import { describe, it, expect } from "vitest";

import { loadingSlice } from "./loading.slice";

describe("loadingSlice", () => {
  it("should toggle loading state", () => {
    const initialState = false;
    const actionA = true;

    const finalStateA = loadingSlice.reducer(
      initialState,
      loadingSlice.actions.toggleLoading(actionA)
    );

    expect(finalStateA).toEqual(actionA);

    const actionB = false;
    const finalStateB = loadingSlice.reducer(
      finalStateA,
      loadingSlice.actions.toggleLoading(actionB)
    );

    expect(finalStateB).toEqual(actionB);
  });

  it("should mantain loading state", () => {
    const initialState = true;
    const action = true;

    const finalState = loadingSlice.reducer(
      initialState,
      loadingSlice.actions.toggleLoading(action)
    );

    expect(finalState).toEqual(action);
  });
});
