import { render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/loginContext";

describe("Given an App component", () => {
  describe("When rendered", () => {
    test("Then it should show the text 'Click on the Vite and React logos to learn more'", async () => {
      const expectedText = "Correo electrónico";

      render(
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      );

      const text = await screen.findByText(expectedText);

      expect(text).toBeInTheDocument();
    });
  });
});
