import { act, render, screen } from "@testing-library/react";
import HeroesList from "@/components/HeroesList";
import axios from "axios";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("HeroesList component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const heroes = [
    { id: 1, name: "Luke Skywalker" },
    { id: 2, name: "Darth Vader" },
  ];

  it("should display loader while fetching", async () => {
    mockedAxios.get.mockResolvedValue(new Promise(() => {}));

    render(<HeroesList />);

    const heading = screen.getByText("Loading...");
    expect(heading).toBeInTheDocument();
  });

  it("should display a list of heroes", async () => {
    act(() => {
      mockedAxios.get.mockResolvedValue({
        data: { results: heroes, count: 2 },
      });
      render(<HeroesList />);
    });

    const heroesElements = await screen.findAllByRole("listitem");
    expect(heroesElements).toHaveLength(2);
  });

  it("should display name of heroes", async () => {
    mockedAxios.get.mockResolvedValue({
      data: { results: heroes, count: 2 },
    });
    await act(async () => {
      render(<HeroesList />);
    });

    const heroElement = await screen.findByText("Darth Vader");
    expect(heroElement).toBeInTheDocument();
  });

  it("should handle errors", async () => {
    const errorMessage = "Network Error";
    mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));
    await act(async () => {
      render(<HeroesList />);
    });

    const errorElement = await screen.findByText(errorMessage);
    expect(errorElement).toBeInTheDocument();
  });
});
