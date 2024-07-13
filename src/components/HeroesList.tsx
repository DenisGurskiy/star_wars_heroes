"use client";

import { Hero } from "@/types/hero";
import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import HeroItem from "./HeroItem";
import { Loader } from "./UI/loader";

function HeroesList() {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    if (loading) {
      axios
        .get(`https://sw-api.starnavi.io/people?page=${currentPage}`)
        .then((response) => {
          setHeroes((prevHeroes) => [...prevHeroes, ...response.data.results]);
          setCurrentPage((prevPage) => prevPage + 1);
          setTotalCount(response.data.count);
        })
        .catch((error) => setError(error.message))
        .finally(() => setLoading(false));
    }
  }, [loading]);

  useEffect(() => {
    const scrollHandler = () => {
      if (
        document.documentElement.scrollHeight -
          (document.documentElement.scrollTop + window.innerHeight) <
          200 &&
        heroes.length < totalCount &&
        !loading
      ) {
        setLoading(true);
      }
    };

    document.addEventListener("scroll", scrollHandler);

    return () => {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, [heroes]);

  if (error) return <div>{error}</div>;

  return (
    <>
      <ul className="max-w-screen-md flex flex-col p-5 gap-10 m-auto">
        {heroes.map((hero) => (
          <HeroItem hero={hero} key={hero.id} />
        ))}
      </ul>
      {loading && <Loader />}
    </>
  );
}

export default HeroesList;
