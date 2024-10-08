import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import RegisterPage from "@/app/register/page";

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
  document.body.innerHTML = "";
});

describe("Register Page", () => {
  describe("Rendering Tests", () => {
    test("initializing: true = does not render any content", async () => {
      await act(async () => {
        const { container } = render(<RegisterPage />);
        expect(container.firstChild).toBeNull();
        expect(screen.queryByTestId("register-form")).toBeNull();
      });
    });

    test("initializing: false = render register form and elements", async () => {
      render(<RegisterPage />);

      expect(screen.getByTestId("register-form")).toBeInTheDocument();
      expect(screen.getByAltText("logo")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Full Name")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("Confirm Password")
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /register/i })
      ).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /back/i })).toBeInTheDocument();
    });
  });
});
