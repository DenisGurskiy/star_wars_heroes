import { Film } from "@/types/film";
import { HeroType } from "@/types/heroType";
import { Starship } from "@/types/starship";
import axios from "axios";

// Interface representing the API response structure for hero data
interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: HeroType[];
}

// Function to fetch all heroes from the API, handling pagination
export async function getAllHeroes(): Promise<HeroType[] | null> {
  let allHeroes: HeroType[] = [];
  let nextUrl: string | null = "https://sw-api.starnavi.io/people/?page=1";

  try {
    // Loop to handle paginated data fetching
    while (nextUrl) {
      const response = await axios.get<ApiResponse>(nextUrl);
      const data: ApiResponse = response.data;
      allHeroes = allHeroes.concat(data.results); // Concatenate results to allHeroes array
      nextUrl = data.next; // Update nextUrl with the URL for the next page of results
    }
    return allHeroes; // Return the complete list of heroes
  } catch (error) {
    console.error("Error fetching hero data:", error); // Log any errors encountered
    return null; // Return null if an error occurs
  }
}

// Function to fetch a specific hero by their ID
export async function getHeroById(id: number): Promise<HeroType | null> {
  try {
    const response = await axios.get<HeroType>(
      `https://sw-api.starnavi.io/people/${id}`
    );
    return response.data; // Return the hero data
  } catch (error) {
    console.error("Error fetching hero data:", error); // Log any errors encountered
    return null; // Return null if an error occurs
  }
}

// Function to fetch a specific film by its ID
export async function getFilmById(id: number): Promise<Film | null> {
  try {
    const response = await axios.get(`https://sw-api.starnavi.io/films/${id}`);
    return response.data; // Return the film data
  } catch (error) {
    console.error("Error fetching film data:", error); // Log any errors encountered
    return null; // Return null if an error occurs
  }
}

// Function to fetch a specific starship by its ID
export async function getStarShipById(id: number): Promise<Starship | null> {
  try {
    const response = await axios.get(
      `https://sw-api.starnavi.io/starships/${id}`
    );
    return response.data; // Return the starship data
  } catch (error) {
    console.error("Error fetching starship data:", error); // Log any errors encountered
    return null; // Return null if an error occurs
  }
}
