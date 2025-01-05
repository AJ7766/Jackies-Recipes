import { render, screen, waitFor } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import "@testing-library/jest-dom";
import RootLayout from "@/app/(root)/[username]/layout";
import { ProfilePropsOrNull } from "@/app/types/types";
import { useProfile } from "@/app/_context/ProfileContext";

beforeEach(() => {
  fetchMock.resetMocks();
  jest.clearAllMocks();
});

afterEach(() => {
  fetchMock.resetMocks();
  jest.clearAllMocks();
  document.body.innerHTML = "";
});

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

  test("shows nothing while loading", async () => {
    (useProfile as jest.Mock).mockReturnValue({
      profile: null,
      loading: true,
    });

    render(
      <RootLayout>
        <div>Child Component</div>
      </RootLayout>
    );

    await waitFor(async () => {
      expect(screen.queryByText("NavBar")).toBeInTheDocument();
      expect(screen.queryByText("Child Component")).not.toBeInTheDocument();
      expect(screen.queryByText("User not found")).not.toBeInTheDocument();
      expect(screen.queryByText("ProfilePage")).not.toBeInTheDocument();
    });
  });

  test("initial render", async () => {
    (useProfile as jest.Mock).mockReturnValue({
      profile: true,
      loading: false,
    });

    render(
      <RootLayout>
        <div>Child Component</div>
      </RootLayout>
    );
    await waitFor(async () => {
      expect(screen.getByText("NavBar")).toBeInTheDocument();
      expect(screen.getByText("Child Component")).toBeInTheDocument();
    });
  });

  test("initial render with a non valid profile", async () => {
    fetchMock.mockResponses([
      JSON.stringify({ message: "Couldn't find user" }),
      { status: 400 },
    ]);
    (useProfile as jest.Mock).mockReturnValue({
      profile: null,
      loading: false,
    });

    render(
      <RootLayout>
        <div>Child Component</div>
      </RootLayout>
    );
    await waitFor(async () => {
      expect(screen.getByText("NavBar")).toBeInTheDocument();
      expect(screen.getByText("User not found")).toBeInTheDocument();
      expect(
        screen.queryByText("ProfilePage: No Profile")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("Masonary: No Masonary")
      ).not.toBeInTheDocument();
    });
  });

  test("initial render with a valid username", async () => {
    (useProfile as jest.Mock).mockReturnValue({
      profile: true,
      loading: false,
    });

    render(
      <RootLayout>
        <div>Child Component</div>
      </RootLayout>
    );
    await waitFor(async () => {
      expect(screen.getByText("NavBar")).toBeInTheDocument();
      expect(screen.getByText("Child Component")).toBeInTheDocument();
      expect(screen.getByText("ProfilePage: Profile Data")).toBeInTheDocument();
      expect(screen.getByText("Masonary: Masonary Data")).toBeInTheDocument();
    });
  });
});
