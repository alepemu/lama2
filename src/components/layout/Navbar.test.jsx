import { describe, it, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";

import { Navbar } from "./Navbar";
import { version } from "../../../package.json";

describe("Navbar", () => {
  afterEach(cleanup);

  it("renders", () => {
    render(<Navbar />);
  });
  it("renders title correctly", () => {
    render(<Navbar />);
    screen.getByText("LAMA2");
  });
  it("renders version correctly", () => {
    render(<Navbar />);
    screen.getByText(`v${version}`);
  });
});
