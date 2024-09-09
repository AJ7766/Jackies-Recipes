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
import { useAuth } from "@/app/authContext/AuthContext";
import Layout from "@/app/[username]/layout";
import { ProfilePropsOrNull } from "@/app/types/types";
import { useParams } from "next/navigation";

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
  useParams: jest.fn(),
}));

jest.mock("@/app/authContext/AuthContext", () => ({
  useAuth: jest.fn(),
}));

jest.mock("@/app/_components/NavBar", () => () => <div>NavBar</div>);
jest.mock(
  "@/app/_components/Profile",
  () =>
    ({ profile }: { profile: ProfilePropsOrNull }) =>
      <div>ProfilePage: {profile ? "Profile Data" : "No Profile"}</div>
);
jest.mock(
  "@/app/_components/Masonary",
  () =>
    ({ profile }: { profile: ProfilePropsOrNull }) =>
      <div>Masonary: {profile ? "Masonary Data" : "No Masonary"}</div>
);

describe("[username] layout", () => {
  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ username: "testuser" });
  });

  test("initial render", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      isAuthenticated: false,
      initializing: false,
    });

    render(
      <Layout>
        <div>Child Component</div>
      </Layout>
    );
    await waitFor(async () => {
      expect(screen.getByText("NavBar")).toBeInTheDocument();
      expect(screen.getByText("Child Component")).toBeInTheDocument();
    });
    expect(console.error).toHaveBeenCalledTimes(1);
  });

  test("initial render with a non valid username", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    fetchMock.mockResponses([
      JSON.stringify({ message: "Couldn't find user" }),
      { status: 400 },
    ]);
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      isAuthenticated: false,
      initializing: false,
    });

    render(
      <Layout>
        <div>Child Component</div>
      </Layout>
    );
    await waitFor(async () => {
      expect(screen.getByText("NavBar")).toBeInTheDocument();
      expect(screen.getByText("Child Component")).toBeInTheDocument();
      expect(
        screen.queryByText("ProfilePage: No Profile")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("Masonary: No Masonary")
      ).not.toBeInTheDocument();
    });
    expect(console.error).toHaveBeenCalledTimes(1);
  });

  test("initial render with a valid username", async () => {
    fetchMock.mockResponses([
      JSON.stringify({
        message: "Success fetching profile",
        profileData: { username: "testacc" },
      }),
      { status: 200 },
    ]);
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      isAuthenticated: false,
      initializing: false,
    });

    render(
      <Layout>
        <div>Child Component</div>
      </Layout>
    );
    await waitFor(async () => {
      expect(screen.getByText("NavBar")).toBeInTheDocument();
      expect(screen.getByText("Child Component")).toBeInTheDocument();
      expect(screen.getByText("ProfilePage: Profile Data")).toBeInTheDocument();
      expect(screen.getByText("Masonary: Masonary Data")).toBeInTheDocument();
    });
  });

  test("url in [username] is an array type", async () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      isAuthenticated: false,
      initializing: false,
    });

    (useParams as jest.Mock).mockReturnValue({ username: ["testacc"] });
    render(
      <Layout>
        <div>Child Component</div>
      </Layout>
    );
  });

  test("url in [username] is undefined", async () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      isAuthenticated: false,
      initializing: false,
    });

    (useParams as jest.Mock).mockReturnValue({ username: undefined });
    render(
      <Layout>
        <div>Child Component</div>
      </Layout>
    );
  });
});
