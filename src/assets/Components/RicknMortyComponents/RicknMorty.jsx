// CharactersComponent.js
import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import "./styles.css";

const CharactersComponent = () => {
  const [page, setPage] = useState(1); // Track the current page

  // Function to fetch characters with pagination
  const fetchCharacters = async ({ queryKey }) => {
    const [_key, page] = queryKey;
    const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);
    return response.data;
  };

  // useQuery for data fetching with react-query
  const { data, status, isPreviousData } = useQuery(
    ["characters", page],
    fetchCharacters,
    {
      keepPreviousData: true, // Keeps previous data while new data loads
    }
  );

  // Log isPreviousData to check if we're seeing old data while new data loads
  console.log("isPreviousData:", isPreviousData);

  // Handle page navigation
  const handlePrevClick = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextClick = () => {
    if (data && page < data.info.pages) setPage(page + 1);
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error loading data.</div>;
  }

  return (
    <div className="app">
      <h1>Rick and Morty</h1>
      <div className="grid">
        {data.results.map((character) => (
          <div className="character-card" key={character.id}>
            <img src={character.image} alt={character.name} />
            <div className="character-info">
              <h2>{character.name}</h2>
              <p className={character.status.toLowerCase()}>
                {character.status} - {character.species}
              </p>
              <p>
                <strong>Last known location:</strong> {character.location.name}
              </p>
              <p>
                <strong>First seen in:</strong> {character.origin.name}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePrevClick} disabled={page === 1}>
          Previous
        </button>
        <button onClick={handleNextClick} disabled={page === data.info.pages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default CharactersComponent;
