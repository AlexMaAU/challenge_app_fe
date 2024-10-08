import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ChallengeItem from "./ChallengeItem";
import axios from "axios";
import { describe, vi } from "vitest";

vi.mock("axios"); // 使用 jest.mock 模拟 axios，以便控制 API 调用的行为

describe("ChallengeItem", () => {
  const mockSetChallenge = vi.fn();
  const mockChallenge = {
    id: 1,
    monthName: "January",
    description: "New Year Challenge",
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("should display challenge details", () => {
    render(
      <ChallengeItem
        list={mockChallenge}
        challenges={[mockChallenge]}
        setChallenges={mockSetChallenge}
      />
    );

    expect(screen.getByText("January")).toBeInTheDocument();
    expect(screen.getByText("New Year Challenge")).toBeInTheDocument();
  });

  test("should delete a challenge when the button is clicked", async () => {
    axios.delete = vi.fn().mockResolvedValueOnce({});

    render(
      <ChallengeItem
        list={mockChallenge}
        challenges={[mockChallenge]}
        setChallenges={mockSetChallenge}
      />
    );

    const deleteButton = screen.getByRole("button", { name: "X" });
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith(
        "http://localhost:8080/api/challenges/1"
      );
      expect(mockSetChallenge).toHaveBeenCalledWith([]);
    });
  });

  test("should fetch challenge by month when clicked", async () => {
    const mockResponse = {
      data: {
        challengeDTOList: [
          { id: 2, monthName: "January", description: "New Year Challenge" },
        ],
      },
    };
    axios.get = vi.fn().mockResolvedValueOnce(mockResponse);

    render(
      <ChallengeItem
        list={mockChallenge}
        challenges={[mockChallenge]}
        setChallenges={mockSetChallenge}
      />
    );

    fireEvent.click(screen.getByText("January"));

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        "http://localhost:8080/api/challenges/January"
      );
      expect(mockSetChallenge).toHaveBeenCalledWith(
        mockResponse.data.challengeDTOList
      );
    });
  });
});

