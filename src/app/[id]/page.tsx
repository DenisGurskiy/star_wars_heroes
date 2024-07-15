import {
  getAllHeroes,
  getFilmById,
  getHeroById,
  getStarShipById,
} from "@/services/api"; // Importing API functions from the services module
import Link from "next/link"; // Importing Link component from Next.js for client-side navigation
import { Flow } from "@/components/Flow"; // Importing Flow component for visualizing hero relationships

// Type definition for the component props
type Props = {
  params: {
    id: number;
  };
};

export const dynamicParams = true; // Enabling dynamic parameters for the page

// Function to generate static parameters for static site generation
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const heroes = await getAllHeroes(); // Fetch all heroes

  if (!heroes) {
    return []; // Return an empty array if no heroes are found
  }

  return heroes.map((hero) => ({
    slug: hero.id.toString(), // Map hero IDs to slug strings
  }));
}

// Functional component to render a hero's details
const Hero = async ({ params: { id } }: Props) => {
  const hero = await getHeroById(id); // Fetch hero data by ID

  if (!hero) {
    return <div>Error loading hero data.</div>; // Display error message if hero data is not found
  }

  const films = [];
  for (const filmId of hero.films) {
    const filmData = await getFilmById(filmId); // Fetch film data by ID
    if (filmData) {
      films.push(filmData); // Add film data to the films array
    }
  }

  const starships = [];
  for (const starshipId of hero.starships) {
    const starshipData = await getStarShipById(starshipId); // Fetch starship data by ID
    if (starshipData) {
      starships.push(starshipData); // Add starship data to the starships array
    }
  }

  return (
    <>
      {/* Navigation and instruction bar */}
      <div className="fixed top-1 left-1 z-10 flex justify-between w-full px-10 py-4">
        <button className="hover:bg-slate-300 transition-all duration-200 px-2 rounded-lg bg-slate-200 w-auto">
          <Link href="/">Back</Link> {/* Link to navigate back to the home page */}
        </button>
        <p className="text-slate-500 text-center self-center">
          click on node for details
        </p>
      </div>
      {/* Flow component to visualize the hero's relationships */}
      <Flow hero={hero} films={films} starships={starships} />
    </>
  );
};

export default Hero; // Exporting the Hero component as the default export
