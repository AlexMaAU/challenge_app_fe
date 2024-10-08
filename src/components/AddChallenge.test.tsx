import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddChallenge from "./AddChallenge";
import axios from "axios";
import { vi } from "vitest";

vi.mock("axios");

describe("AddChallenge", () => {
  const mockFetchChallenges = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("should render input fields and submit button", () => {
    render(<AddChallenge fetchChallenges={mockFetchChallenges} />);

    expect(screen.getByLabelText(/month/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  test("should handle input changes", () => {
    render(<AddChallenge fetchChallenges={mockFetchChallenges} />);

    const monthInput = screen.getByLabelText(/month/i) as HTMLInputElement;
    const descriptionInput = screen.getByLabelText(
      /description/i
    ) as HTMLInputElement;

    fireEvent.change(monthInput, { target: { value: "January" } });
    fireEvent.change(descriptionInput, {
      target: { value: "New Year Challenge" },
    });

    expect(monthInput.value).toBe("January");
    expect(descriptionInput.value).toBe("New Year Challenge");
  });

  test("should submit form and call fetchChallenges", async () => {
    // Use vi.fn() to mock axios.post
    (axios.post as jest.Mock).mockResolvedValueOnce({});

    render(<AddChallenge fetchChallenges={mockFetchChallenges} />);

    fireEvent.change(screen.getByLabelText(/month/i), {
      target: { value: "January" },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "New Year Challenge" },
    });
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:8080/api/challenges",
        {
          monthName: "January",
          description: "New Year Challenge",
        }
      );
      expect(mockFetchChallenges).toHaveBeenCalled();
    });
  });

  test("should handle error on submit", async () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    (axios.post as jest.Mock).mockRejectedValueOnce(new Error("Network Error")); // Mock axios.post to throw an error

    render(<AddChallenge fetchChallenges={mockFetchChallenges} />);

    fireEvent.change(screen.getByLabelText(/month/i), {
      target: { value: "January" },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "New Year Challenge" },
    });
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error fetching challenges: ",
        expect.any(Error)
      );
    });

    consoleErrorSpy.mockRestore(); // Restore the original console.error
  });
});

