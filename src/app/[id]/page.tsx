import React from "react";
import { Background, ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { getFilmById, getHeroData, getStarShipById } from "@/services/api";

type Props = {
  params: {
    id: number;
  };
};

const Hero = async ({ params: { id } }: Props) => {
  const hero = await getHeroData(id);
  
  const startPointX = 500;
  const startPointY = 100;
  const filmSpacing = 200;
  const starshipSpacing = 200;

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

  const nodes = [
    {
      id: hero.id.toString(),
      data: { label: `${hero.name}` },
      position: { x: startPointX, y: startPointY },
      type: "input",
    },
    ...films.map((film, index) => ({
      id: `film-${film?.id}`,
      data: { label: `Film: ${film?.title}` },
      position: {
        x:
          startPointX -
          ((films.length - 1) * filmSpacing) / 2 +
          index * filmSpacing,
        y: startPointY + 100,
      },
      type: "default",
    })),
    ...starships.map((starship, index) => ({
      id: `starship-${starship?.id}`,
      data: { label: `StarShip: ${starship?.name}` },
      position: {
        x:
          startPointX -
          ((starships.length - 1) * starshipSpacing) / 2 +
          index * starshipSpacing,
        y: startPointY + 200,
      },
      type: "output",
    })),
  ];

  const edges = [
    ...films.map((film) => ({
      id: `hero to film-${film?.id}`,
      source: hero.id.toString(),
      target: `film-${film?.id}`,
    })),
    ...starships.flatMap((starship) =>
      starship.films.map((filmId) => ({
        id: `starship-${starship?.id} to film-${filmId}`,
        source: `film-${filmId}`,
        target: `starship-${starship?.id}`,
      }))
    ),
  ];

  return (
    <div className="w-full h-screen bg-white">
      <ReactFlow nodes={nodes} edges={edges}>
        <Background />
      </ReactFlow>
    </div>
  );
};

export default Hero;
