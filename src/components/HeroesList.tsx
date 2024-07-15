"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import HeroItem from "./HeroItem";
import { Loader } from "./UI/loader";
import { HeroType } from "@/types/heroType";

// Functional component to render the list of heroes
function HeroesList() {
  const [heroes, setHeroes] = useState<HeroType[]>([]); // State to store the list of heroes
  const [error, setError] = useState<string | null>(null); // State to store any error message
  const [loading, setLoading] = useState<boolean>(true); // State to manage loading state
  const [currentPage, setCurrentPage] = useState(1); // State to keep track of the current page for pagination
  const [totalCount, setTotalCount] = useState(0); // State to store the total count of heroes

  // useEffect to fetch hero data when the component mounts or when loading state changes
  useEffect(() => {
    if (loading) {
      axios
        .get(`https://sw-api.starnavi.io/people?page=${currentPage}`)
        .then((response) => {
          // Append new heroes to the existing list
          setHeroes((prevHeroes) => [...prevHeroes, ...response.data.results]);
          // Increment the current page
          setCurrentPage((prevPage) => prevPage + 1);
          // Set the total count of heroes
          setTotalCount(response.data.count);
        })
        .catch((error) => setError(error.message)) // Set error state if an error occurs
        .finally(() => setLoading(false)); // Set loading state to false after the data is fetched
    }
  }, [loading]);

  // useEffect to handle infinite scrolling
  useEffect(() => {
    const scrollHandler = () => {
      // Check if the user has scrolled near the bottom of the page and if more heroes are available to load
      if (
        document.documentElement.scrollHeight -
          (document.documentElement.scrollTop + window.innerHeight) <
          200 &&
        heroes.length < totalCount &&
        !loading
      ) {
        setLoading(true); // Set loading state to true to trigger data fetching
      }
    };

    // Add scroll event listener
    document.addEventListener("scroll", scrollHandler);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, [heroes]);

  // Render error message if an error occurs
  if (error) return <div>{error}</div>;

  return (
    <>
      {/* Render the list of heroes */}
      <ul className="max-w-screen-md flex flex-col p-5 gap-10 m-auto">
        {heroes.map((hero) => (
          <HeroItem hero={hero} key={hero.id} />
        ))}
      </ul>
      {/* Show loader if data is being fetched */}
      {loading && <Loader />}
    </>
  );
}

// Export the component as the default export
export default HeroesList;
