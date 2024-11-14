import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import CharactersComponent from "./CharactersComponent";

// Initialize the QueryClient
const queryClient = new QueryClient();

function reactQueryy() {
  return (
    <QueryClientProvider client={queryClient}>
      <CharactersComponent />
    </QueryClientProvider>
  );
}

export default reactQueryy;
