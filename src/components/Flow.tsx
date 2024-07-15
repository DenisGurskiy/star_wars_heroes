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

// Define the props type for the Flow component
type FlowProps = {
  hero: HeroType;
  films: Film[];
  starships: Starship[];
};

// Functional component to render the flow diagram
export const Flow = ({ hero, films, starships }: FlowProps) => {
  const [modalContent, setModalContent] = useState<
    HeroType | Film | Starship | null
  >(null); // State to manage the content of the modal

  const startPointX = 300; // X-coordinate for the starting point
  const startPointY = 100; // Y-coordinate for the starting point
  const filmSpacing = 200; // Spacing between film nodes
  const starshipSpacing = 200; // Spacing between starship nodes

  // Create an array of nodes for the flow diagram
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

  // Create an array of edges for the flow diagram
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

  // Function to handle node clicks and set the modal content accordingly
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
        {/* Render the ReactFlow component with nodes and edges */}
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodeClick={(_, val) => onClickNode(val)}
        >
          <Background />
        </ReactFlow>
      </div>
      {/* Render the modal if modalContent is not null */}
      {modalContent && (
        <>
          <div className="sr-only" data-testid="modal-content"></div>
          <Modal elem={modalContent} closeModal={setModalContent} />
        </>
      )}
    </>
  );
};
