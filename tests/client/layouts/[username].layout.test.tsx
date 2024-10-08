import {
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import "@testing-library/jest-dom";
import Layout from "@/app/[username]/layout";
import { ProfilePropsOrNull } from "@/app/types/types";
import { useParams } from "next/navigation";
import { useProfile } from "@/app/context/ProfileContext";

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

jest.mock("@/app/context/ProfileContext", () => ({
  useProfile: jest.fn(),
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
    (useProfile as jest.Mock).mockReturnValue({ profile: true, loading: false });

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
    (useProfile as jest.Mock).mockReturnValue({ profile: null, loading: false });

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
    (useProfile as jest.Mock).mockReturnValue({ profile: true, loading: false });


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

  test("url in [username] is undefined", async () => {
    (useProfile as jest.Mock).mockReturnValue({ false: null, loading: false });


    (useParams as jest.Mock).mockReturnValue({ username: undefined });
    render(
      <Layout>
        <div>Child Component</div>
      </Layout>
    );
  });
});
