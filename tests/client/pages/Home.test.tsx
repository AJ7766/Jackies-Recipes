import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useRouter } from "next/navigation";
import Home from "@/app/page";
import { useAuth } from "@/app/context/AuthContext";

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
  document.body.innerHTML = "";
});

jest.mock("@/app/context/AuthContext", () => ({
  useAuth: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Home Page", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  describe("Rendering Tests", () => {
    test("initializing: true = does not render any content", () => {
      (useAuth as jest.Mock).mockReturnValue({
        user: null,
        isAuthenticated: false,
        initializing: true,
      });
      act(() => {
        const { container } = render(<Home />);
        expect(container.firstChild).toBeNull();
        expect(screen.queryByTestId("login-form")).toBeNull();
      });
    });

    test("initializing: false = render login form and elements", () => {
      (useAuth as jest.Mock).mockReturnValue({
        user: null,
        isAuthenticated: false,
        initializing: false,
      });
      act(() => {
        render(<Home />);
      });
      expect(screen.getByTestId("login-form")).toBeInTheDocument();
      expect(screen.getByAltText("logo")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /login/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /register/i })
      ).toBeInTheDocument();
    });

    test("does not redirect if user is not authenticated", () => {
      (useAuth as jest.Mock).mockReturnValue({
        user: null,
        isAuthenticated: false,
        initializing: false,
      });
      act(() => {
        render(<Home />);
        expect(mockPush).not.toHaveBeenCalled();
      });
    });

    test("redirects my to User Page if I am authorized", () => {
      (useAuth as jest.Mock).mockReturnValue({
        user: { username: "testuser" },
        isAuthenticated: true,
        initializing: false,
      });
      act(() => {
        render(<Home />);
      });
      expect(mockPush).toHaveBeenCalledWith("/testuser");
    });
  });
});
