import { ALL_CHARACTERS_PAGED } from "../graphQl/queries";

// import axios from "axios"
import { useQuery } from "@tanstack/react-query";

const fetchCharactersWithPage = async (query: string, pageNumber: number) => {
  const body = {
    query: query,
    variables: { page: pageNumber },
  };

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
  const response = await fetch(
    "https://rickandmortyapi.com/graphql",
    requestOptions
  );
  const data = await response.json();
  return data.data;
};
export const useCharacterData = (
  onSuccess: () => void,
  onError: () => void,
  pageNumber: number
) => {
  return useQuery(
    ["characters", pageNumber],
    () => fetchCharactersWithPage(ALL_CHARACTERS_PAGED, pageNumber),
    { onSuccess, onError }
  );
};
