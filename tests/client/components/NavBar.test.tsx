import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
  within,
} from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import "@testing-library/jest-dom";
import { useAuth } from "@/app/context/AuthContext";
import NavBar from "@/app/_components/NavBar";

beforeEach(() => {
  fetchMock.resetMocks();
  jest.clearAllMocks();
});

afterEach(() => {
  fetchMock.resetMocks();
  jest.clearAllMocks();
  document.body.innerHTML = "";
});

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/app/authContext/AuthContext", () => ({
  useAuth: jest.fn(),
}));

const searchInput = async (input: string) => {
  await act(async () => {
    fireEvent.change(
      screen.getByPlaceholderText("Search...") as HTMLInputElement,
      { target: { value: input } }
    );
    await new Promise((resolve) => setTimeout(resolve, 500));
  });
};

describe("NavBar component", () => {
  test("initial render", async () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      isAuthenticated: false,
      initializing: false,
    });

    await act(async () => {
      render(<NavBar />);
    });

    await waitFor(async () => {
      expect(screen.getByAltText("logo")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /login/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /register/i })
      ).toBeInTheDocument();
    });
  });

  test("initial render authorized", async () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      isAuthenticated: true,
      initializing: false,
    });
    render(<NavBar />);

    await waitFor(async () => {
      expect(screen.getByAltText("logo")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
      expect(screen.getByAltText("add-recipe")).toBeInTheDocument();
      expect(screen.getByAltText("profile-picture")).toBeInTheDocument();
      expect(screen.getByAltText("drop-down-menu")).toBeInTheDocument();
    });
  });

  test("initializing return null", async () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      isAuthenticated: false,
      initializing: true,
    });

    render(<NavBar />);

    await waitFor(async () => {
      expect(screen.queryByAltText("logo")).not.toBeInTheDocument();
      expect(
        screen.queryByPlaceholderText("Search...")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: /login/i })
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: /register/i })
      ).not.toBeInTheDocument();
    });
  });

  test("navbar logo redirects to userpage", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    (useAuth as jest.Mock).mockReturnValue({
      user: { username: "testacc" },
      isAuthenticated: false,
      initializing: false,
    });

    render(<NavBar />);

    await act(async () => {
      fireEvent.click(screen.getByAltText("logo"));
    });

    await waitFor(async () => {
      const logoLink = screen.getByRole("link", { name: /logo/i });
      expect(logoLink).toBeInTheDocument();
      expect(logoLink).toHaveAttribute("href", "/testacc");
    });
    expect(console.error).toHaveBeenCalledTimes(1);
  });

  test("authenticated profile-picture redirects to userpage", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    (useAuth as jest.Mock).mockReturnValue({
      user: { username: "testacc" },
      isAuthenticated: true,
      initializing: false,
    });

    render(<NavBar />);

    await act(async () => {
      fireEvent.click(screen.getByAltText("logo"));
    });

    await waitFor(async () => {
      const logoLink = screen.getByRole("link", { name: /profile-picture/i });
      expect(logoLink).toBeInTheDocument();
      expect(logoLink).toHaveAttribute("href", "/testacc");
    });
    expect(console.error).toHaveBeenCalledTimes(1);
  });

  test("user has a profile picture", async () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: {
        username: "testacc",
        userContent: { profilePicture: "/path/test.jpg" },
      },
      isAuthenticated: true,
      initializing: false,
    });
    render(<NavBar />);

    await waitFor(() => {
      const profileImg = screen.getByAltText("profile-picture");
      expect(profileImg).toHaveAttribute(
        "src",
        "/_next/image?url=%2Fpath%2Ftest.jpg&w=96&q=75"
      );
    });
  });

  test("input in search bar & finding a user", async () => {
    fetchMock.mockResponses([
      JSON.stringify({
        success: true,
        existingUsers: [{ username: "testacc" }],
      }),
      { status: 200 },
    ]);
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      isAuthenticated: false,
      initializing: false,
    });

    render(<NavBar />);

    await searchInput("test");

    await waitFor(async () => {
      expect(screen.getByPlaceholderText("Search...")).toHaveValue("test");
      expect(
        screen.queryByTestId("searchedUsersContainer")
      ).toBeInTheDocument();
      expect(screen.getByText("testacc")).toBeInTheDocument();
    });
  });

  test("input in search bar & no user", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    fetchMock.mockResponses([
      JSON.stringify({
        success: true,
        message: "No existing user with username non-testacc`",
      }),
      { status: 404 },
    ]);
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      isAuthenticated: false,
      initializing: false,
    });

    render(<NavBar />);
    await searchInput("non-testacc");

    await waitFor(async () => {
      expect(screen.getByPlaceholderText("Search...")).toHaveValue(
        "non-testacc"
      );
    });
    expect(console.error).toHaveBeenCalledTimes(1);
  });

  test("handleClickOutside function hides dropdown and search results when clicking outside", async () => {
    fetchMock.mockResponses([
      JSON.stringify({
        success: true,
        existingUsers: [{ username: "testacc" }],
      }),
      { status: 200 },
    ]);
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      isAuthenticated: true,
      initializing: false,
    });

    render(<NavBar />);

    fireEvent.click(screen.getByAltText("drop-down-menu"));
    await searchInput("test");

    await waitFor(() => {
      expect(screen.getByText("Settings")).toBeInTheDocument();
      expect(screen.getByText("Logout")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Search...")).toHaveValue("test");
      expect(
        screen.queryByTestId("searchedUsersContainer")
      ).toBeInTheDocument();
      expect(screen.getByText("testacc")).toBeInTheDocument();
    });

    fireEvent.mouseDown(document.body);

    await waitFor(() => {
      expect(screen.queryByText("Settings")).not.toBeInTheDocument();
      expect(screen.queryByText("Logout")).not.toBeInTheDocument();
      expect(
        screen.queryByTestId("searchedUsersContainer")
      ).not.toBeInTheDocument();
      expect(screen.queryByText("testacc")).not.toBeInTheDocument();
    });
  });

  test("searched user has a profile picture", async () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      isAuthenticated: false,
      initializing: false,
    });
    fetchMock.mockResponses([
      JSON.stringify({
        success: true,
        existingUsers: [
          {
            username: "testacc",
            userContent: {
              profilePicture:
                "/_next/image?url=%2Fpath%2Fto%2Fpic.jpg&w=96&q=75",
            },
          },
        ],
      }),
      { status: 200 },
    ]);

    render(<NavBar />);

    await searchInput("testacc");

    await waitFor(() => {
      const profileImg = screen.getByAltText("user-picture");
      expect(profileImg).toHaveAttribute(
        "src",
        "/_next/image?url=%2F_next%2Fimage%3Furl%3D%252Fpath%252Fto%252Fpic.jpg%26w%3D96%26q%3D75&w=96&q=75"
      );
    });
  });
});
