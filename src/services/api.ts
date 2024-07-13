import { Film } from "@/types/film";
import { Hero } from "@/types/hero";
import { Starship } from "@/types/starship";
import axios from "axios";

export async function getHeroData(id: number): Promise<Hero | null> {
  try {
    const response = await axios.get(`https://sw-api.starnavi.io/people/${id}`);
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
