import { render, screen } from "@testing-library/react";
import App from "./App";

describe("Given an App component", () => {
  describe("When rendered", () => {
    test("Then it should show the text 'Click on the Vite and React logos to learn more'", () => {
      const expectedText = "Click on the Vite and React logos to learn more";

      render(<App />);

      const text = screen.getByText(expectedText);

      expect(text).toBeInTheDocument();
    });
  });
});
