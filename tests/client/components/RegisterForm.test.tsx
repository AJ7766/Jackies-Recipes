import { ReactNode } from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import "@testing-library/jest-dom";
import { useRouter } from "next/navigation";
import RegisterForm from "@/app/register/_components/RegisterForm";

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

jest.mock("next/link", () => {
  return ({ href, children }: { href: string; children: ReactNode }) => {
    return <a href={href}>{children}</a>;
  };
});

describe("RegisterForm component", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  const fillForm = async (
    email?: string,
    username?: string,
    name?: string,
    password?: string,
    confirmPassword?: string
  ) => {
    fireEvent.change(screen.getByPlaceholderText("Email") as HTMLInputElement, {
      target: { value: email },
    });
    fireEvent.change(
      screen.getByPlaceholderText("Username") as HTMLInputElement,
      { target: { value: username } }
    );
    fireEvent.change(
      screen.getByPlaceholderText("Full Name") as HTMLInputElement,
      { target: { value: name } }
    );
    fireEvent.change(
      screen.getByPlaceholderText("Password") as HTMLInputElement,
      { target: { value: password } }
    );
    fireEvent.change(
      screen.getByPlaceholderText("Confirm Password") as HTMLInputElement,
      { target: { value: confirmPassword } }
    );
  };

  describe("Interaction Tests", () => {
    test("user can fill inputs in the form", async () => {
      await act(async () => {
        render(<RegisterForm />);
      });

      await fillForm(
        "email@example.com",
        "username",
        "full name",
        "password123",
        "password123"
      );

      expect(screen.getByPlaceholderText("Email")).toHaveValue(
        "email@example.com"
      );
      expect(screen.getByPlaceholderText("Username")).toHaveValue("username");
      expect(screen.getByPlaceholderText("Full Name")).toHaveValue("full name");
      expect(screen.getByPlaceholderText("Password")).toHaveValue(
        "password123"
      );
      expect(screen.getByPlaceholderText("Confirm Password")).toHaveValue(
        "password123"
      );
    });

    test("user missed to fill email in the form", async () => {
      fetchMock.mockResponseOnce(
        JSON.stringify({ message: "Please fill out Email." }),
        { status: 400 }
      );
      await act(async () => {
        render(<RegisterForm />);
      });

      await fillForm("", "username", "full name", "password123", "password123");
      const submitButton = await screen.findByRole("button", {
        name: /register/i,
      });

      expect(screen.getByPlaceholderText("Email")).toHaveValue("");
      expect(screen.getByPlaceholderText("Username")).toHaveValue("username");
      expect(screen.getByPlaceholderText("Full Name")).toHaveValue("full name");
      expect(screen.getByPlaceholderText("Password")).toHaveValue(
        "password123"
      );
      expect(screen.getByPlaceholderText("Confirm Password")).toHaveValue(
        "password123"
      );

      await waitFor(() => {
        fireEvent.submit(screen.getByTestId("register-form"));
        expect(submitButton).toBeDisabled();
      });

      await waitFor(() => {
        expect(screen.getByText("Please fill out Email.")).toBeInTheDocument();
      });
    });

    test("displays default error message when server response does not include an error message after submitting", async () => {
      fetchMock.mockResponseOnce(JSON.stringify({}), { status: 400 });
      await act(async () => {
        render(<RegisterForm />);
      });

      await fillForm(
        "email@example.com",
        "username",
        "full name",
        "password123",
        "password123"
      );
      const submitButton = await screen.findByRole("button", {
        name: /register/i,
      });

      expect(screen.getByPlaceholderText("Email")).toHaveValue(
        "email@example.com"
      );
      expect(screen.getByPlaceholderText("Username")).toHaveValue("username");
      expect(screen.getByPlaceholderText("Full Name")).toHaveValue("full name");
      expect(screen.getByPlaceholderText("Password")).toHaveValue(
        "password123"
      );
      expect(screen.getByPlaceholderText("Confirm Password")).toHaveValue(
        "password123"
      );

      await waitFor(() => {
        fireEvent.submit(screen.getByTestId("register-form"));
        expect(submitButton).toBeDisabled();
      });

      await waitFor(() => {
        expect(screen.getByText("Failed to register.")).toBeInTheDocument();
      });
    });

    test("displays default error message when error is not an instance of Error after submitting", async () => {
      fetchMock.mockReject(() => Promise.reject("Some non-Error message"));

      await act(async () => {
        render(<RegisterForm />);
      });

      await fillForm(
        "email@example.com",
        "username",
        "full name",
        "password123",
        "password123"
      );
      const submitButton = await screen.findByRole("button", {
        name: /register/i,
      });

      await waitFor(() => {
        fireEvent.submit(screen.getByTestId("register-form"));
        expect(submitButton).toBeDisabled();
      });

      await waitFor(() => {
        expect(screen.getByText("Failed to register.")).toBeInTheDocument();
      });
    });

    test("displays custom error message when error is an instance of Error after submitting", async () => {
      fetchMock.mockResponseOnce(
        JSON.stringify({ message: "Custom error message" }),
        { status: 400 }
      );

      await act(async () => {
        render(<RegisterForm />);
      });

      await fillForm(
        "email@example.com",
        "username",
        "full name",
        "password123",
        "password123"
      );
      const submitButton = await screen.findByRole("button", {
        name: /register/i,
      });

      await waitFor(() => {
        fireEvent.submit(screen.getByTestId("register-form"));
        expect(submitButton).toBeDisabled();
      });

      await waitFor(() => {
        expect(screen.getByText("Custom error message")).toBeInTheDocument();
      });
    });

    test("submit with invalid email", async () => {
      fetchMock.mockResponseOnce(
        JSON.stringify({ message: "Please enter a valid Email address." }),
        { status: 400 }
      );
      await act(async () => {
        render(<RegisterForm />);
      });

      await fillForm("", "username", "full name", "password123", "password123");
      const submitButton = await screen.findByRole("button", {
        name: /register/i,
      });

      expect(screen.getByPlaceholderText("Email")).toHaveValue("");
      expect(screen.getByPlaceholderText("Username")).toHaveValue("username");
      expect(screen.getByPlaceholderText("Full Name")).toHaveValue("full name");
      expect(screen.getByPlaceholderText("Password")).toHaveValue(
        "password123"
      );
      expect(screen.getByPlaceholderText("Confirm Password")).toHaveValue(
        "password123"
      );

      await waitFor(() => {
        fireEvent.submit(screen.getByTestId("register-form"));
        expect(submitButton).toBeDisabled();
      });

      await waitFor(() => {
        expect(
          screen.getByText("Please enter a valid Email address.")
        ).toBeInTheDocument();
      });
    });

    test("submit with invalid username", async () => {
      fetchMock.mockResponseOnce(
        JSON.stringify({ message: "Username can only contain letters." }),
        { status: 400 }
      );
      await act(async () => {
        render(<RegisterForm />);
      });

      await fillForm(
        "email@example.com",
        "username123",
        "full name",
        "password123",
        "password123"
      );
      const submitButton = await screen.findByRole("button", {
        name: /register/i,
      });

      expect(screen.getByPlaceholderText("Email")).toHaveValue(
        "email@example.com"
      );
      expect(screen.getByPlaceholderText("Username")).toHaveValue(
        "username123"
      );
      expect(screen.getByPlaceholderText("Full Name")).toHaveValue("full name");
      expect(screen.getByPlaceholderText("Password")).toHaveValue(
        "password123"
      );
      expect(screen.getByPlaceholderText("Confirm Password")).toHaveValue(
        "password123"
      );

      await waitFor(() => {
        fireEvent.submit(screen.getByTestId("register-form"));
        expect(submitButton).toBeDisabled();
      });

      await waitFor(() => {
        expect(
          screen.getByText("Username can only contain letters.")
        ).toBeInTheDocument();
      });
    });

    test("submit with a username less than 4 letters", async () => {
      fetchMock.mockResponseOnce(
        JSON.stringify({ message: "Username must be atleast 4 letters." }),
        { status: 400 }
      );
      await act(async () => {
        render(<RegisterForm />);
      });

      await fillForm(
        "email@example.com",
        "asd",
        "full name",
        "password123",
        "password123"
      );
      const submitButton = await screen.findByRole("button", {
        name: /register/i,
      });

      expect(screen.getByPlaceholderText("Email")).toHaveValue(
        "email@example.com"
      );
      expect(screen.getByPlaceholderText("Username")).toHaveValue("asd");
      expect(screen.getByPlaceholderText("Full Name")).toHaveValue("full name");
      expect(screen.getByPlaceholderText("Password")).toHaveValue(
        "password123"
      );
      expect(screen.getByPlaceholderText("Confirm Password")).toHaveValue(
        "password123"
      );

      await waitFor(() => {
        fireEvent.submit(screen.getByTestId("register-form"));
        expect(submitButton).toBeDisabled();
      });

      await waitFor(() => {
        expect(
          screen.getByText("Username must be atleast 4 letters.")
        ).toBeInTheDocument();
      });
    });

    test("submit with a passwod less than 6 characters", async () => {
      fetchMock.mockResponseOnce(
        JSON.stringify({ message: "Password must be atleast 6 characters." }),
        { status: 400 }
      );
      await act(async () => {
        render(<RegisterForm />);
      });

      await fillForm(
        "email@example.com",
        "username",
        "full name",
        "12345",
        "12345"
      );
      const submitButton = await screen.findByRole("button", {
        name: /register/i,
      });

      expect(screen.getByPlaceholderText("Email")).toHaveValue(
        "email@example.com"
      );
      expect(screen.getByPlaceholderText("Username")).toHaveValue("username");
      expect(screen.getByPlaceholderText("Full Name")).toHaveValue("full name");
      expect(screen.getByPlaceholderText("Password")).toHaveValue("12345");
      expect(screen.getByPlaceholderText("Confirm Password")).toHaveValue(
        "12345"
      );

      await waitFor(() => {
        fireEvent.submit(screen.getByTestId("register-form"));
        expect(submitButton).toBeDisabled();
      });

      await waitFor(() => {
        expect(
          screen.getByText("Password must be atleast 6 characters.")
        ).toBeInTheDocument();
      });
    });

    test("submit with a passwod not matching password", async () => {
      fetchMock.mockResponseOnce(
        JSON.stringify({ message: "Passwords do not match." }),
        { status: 400 }
      );
      await act(async () => {
        render(<RegisterForm />);
      });

      await fillForm(
        "email@example.com",
        "username",
        "full name",
        "password123",
        "password321"
      );
      const submitButton = await screen.findByRole("button", {
        name: /register/i,
      });

      expect(screen.getByPlaceholderText("Email")).toHaveValue(
        "email@example.com"
      );
      expect(screen.getByPlaceholderText("Username")).toHaveValue("username");
      expect(screen.getByPlaceholderText("Full Name")).toHaveValue("full name");
      expect(screen.getByPlaceholderText("Password")).toHaveValue(
        "password123"
      );
      expect(screen.getByPlaceholderText("Confirm Password")).toHaveValue(
        "password321"
      );

      await waitFor(() => {
        fireEvent.submit(screen.getByTestId("register-form"));
        expect(submitButton).toBeDisabled();
      });

      await waitFor(() => {
        expect(screen.getByText("Passwords do not match.")).toBeInTheDocument();
      });
    });

    test("submit with valid credentials", async () => {
      fetchMock.mockResponseOnce(
        JSON.stringify({
          message:
            "Your account email@example.com has been successfully created!",
        }),
        { status: 201 }
      );
      await act(async () => {
        render(<RegisterForm />);
      });

      await fillForm(
        "email@example.com",
        "username",
        "full name",
        "password123",
        "password123"
      );
      const submitButton = await screen.findByRole("button", {
        name: /register/i,
      });

      expect(screen.getByPlaceholderText("Email")).toHaveValue(
        "email@example.com"
      );
      expect(screen.getByPlaceholderText("Username")).toHaveValue("username");
      expect(screen.getByPlaceholderText("Full Name")).toHaveValue("full name");
      expect(screen.getByPlaceholderText("Password")).toHaveValue(
        "password123"
      );
      expect(screen.getByPlaceholderText("Confirm Password")).toHaveValue(
        "password123"
      );

      await waitFor(() => {
        fireEvent.submit(screen.getByTestId("register-form"));
        expect(submitButton).toBeDisabled();
      });

      await waitFor(() => {
        expect(
          screen.getByText(
            "Your account email@example.com has been successfully created!"
          )
        ).toBeInTheDocument();
      });
    });
  });
});
