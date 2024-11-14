import React from "react";
import RicknMorty from "./assets/Components/RicknMortyComponents/RicknMorty";
import { QueryClient, QueryClientProvider } from "react-query";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client = {queryClient}>

      <RicknMorty/>
    </QueryClientProvider>
  )
}

export default App


