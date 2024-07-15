"use client";

import { Film } from "@/types/film";
import { ReactFlowEdge } from "@/types/reactFlowEdge";
import { ReactFlowNode } from "@/types/reactFlowNode";
import { Starship } from "@/types/starship";
import { Background, ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Modal } from "./UI/modal";
import { useState } from "react";
import { HeroType } from "@/types/heroType";

type FlowProps = {
  hero: HeroType;
  films: Film[];
  starships: Starship[];
};

export const Flow = ({ hero, films, starships }: FlowProps) => {
  const [modalContent, setModalContent] = useState<
    HeroType | Film | Starship | null
  >(null);

  const startPointX = 300;
  const startPointY = 100;
  const filmSpacing = 200;
  const starshipSpacing = 200;

  const nodes: ReactFlowNode[] = [
    {
      id: hero.id.toString(),
      data: { label: `${hero.name}`, color: "bg-red" },
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

  const edges: ReactFlowEdge[] = [
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

  const onClickNode = (node: ReactFlowNode) => {
    const nodeId = node.id;

    if (nodeId === hero.id.toString()) {
      setModalContent(hero);
    } else {
      const filmId = films.find((film) => `film-${film.id}` === nodeId)?.id;
      const starshipId = starships.find(
        (starship) => `starship-${starship.id}` === nodeId
      )?.id;

      if (filmId) {
        const film = films.find((film) => film.id === filmId);
        if (film) {
          setModalContent(film);
        }
      } else if (starshipId) {
        const starship = starships.find(
          (starship) => starship.id === starshipId
        );
        if (starship) {
          setModalContent(starship);
        }
      }
    }
  };

  return (
    <>
      <div className="w-full h-screen bg-white">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodeClick={(_, val) => onClickNode(val)}
        >
          <Background />
        </ReactFlow>
      </div>
      {modalContent && (
        <>
          <div className="sr-only" data-testid="modal-content"></div>
          <Modal elem={modalContent} closeModal={setModalContent} />
        </>
      )}
    </>
  );
};
