import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import App from "./App";
import "./i18n";

describe("App", () => {
  it("renders the LineTrack placeholder page", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    expect(screen.getByText("LineTrack")).toBeInTheDocument();
  });
});
