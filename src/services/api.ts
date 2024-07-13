import { Film } from "@/types/film";
import { Hero } from "@/types/hero";
import { Starship } from "@/types/starship";
import axios from "axios";

interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Hero[];
}

export async function getAllHeroes(): Promise<Hero[] | null> {
  let allHeroes: Hero[] = [];
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

export async function getHeroById(id: number): Promise<Hero | null> {
  try {
    const response = await axios.get<Hero>(
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
