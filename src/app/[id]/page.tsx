import {
  getAllHeroes,
  getFilmById,
  getHeroById,
  getStarShipById,
} from "@/services/api";
import Link from "next/link";
import { Flow } from "@/components/Flow";

type Props = {
  params: {
    id: number;
  };
};

export const dynamicParams = true;
export const revalidate = 3600;

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const heroes = await getAllHeroes();

  if (!heroes) {
    return [];
  }

  return heroes.map((hero) => ({
    slug: hero.id.toString(),
  }));
}

const Hero = async ({ params: { id } }: Props) => {
  const hero = await getHeroById(id);

  if (!hero) {
    return <div>Error loading hero data.</div>;
  }

  const films = [];
  for (const filmId of hero.films) {
    const filmData = await getFilmById(filmId);
    if (filmData) {
      films.push(filmData);
    }
  }

  const starships = [];
  for (const starshipId of hero.starships) {
    const starshipData = await getStarShipById(starshipId);
    if (starshipData) {
      starships.push(starshipData);
    }
  }

  return (
    <>
      <div className="fixed top-1 left-1 z-10 flex justify-between w-full px-10 py-4">
        <button className="hover:bg-slate-300 transition-all duration-200 px-2 rounded-lg bg-slate-200 w-auto">
          <Link href="/">Back</Link>
        </button>
        <p className="text-slate-500 text-center self-center">
          click to node for details
        </p>
      </div>
      <Flow hero={hero} films={films} starships={starships} />
    </>
  );
};

export default Hero;
