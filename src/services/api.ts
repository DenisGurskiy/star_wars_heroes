import { Film } from "@/types/film";
import { HeroType } from "@/types/heroType";
import { Starship } from "@/types/starship";
import axios from "axios";

interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: HeroType[];
}

export async function getAllHeroes(): Promise<HeroType[] | null> {
  let allHeroes: HeroType[] = [];
  let nextUrl: string | null = "https://sw-api.starnavi.io/people/?page=1";

  try {
    while (nextUrl) {
      const response = await axios.get<ApiResponse>(nextUrl);
      const data: ApiResponse = response.data;
      allHeroes = allHeroes.concat(data.results);
      nextUrl = data.next;
    }
    return allHeroes;
  } catch (error) {
    console.error("Error fetching hero data:", error);
    return null;
  }
}

export async function getHeroById(id: number): Promise<HeroType | null> {
  try {
    const response = await axios.get<HeroType>(
      `https://sw-api.starnavi.io/people/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching hero data:", error);
    return null;
  }
}

export async function getFilmById(id: number): Promise<Film | null> {
  try {
    const response = await axios.get(`https://sw-api.starnavi.io/films/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching film data:", error);
    return null;
  }
}

export async function getStarShipById(id: number): Promise<Starship | null> {
  try {
    const response = await axios.get(
      `https://sw-api.starnavi.io/starships/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching film data:", error);
    return null;
  }
}
