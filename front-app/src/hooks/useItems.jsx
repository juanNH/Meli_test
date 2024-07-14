/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useQuery } from "./useQuery";
export const useItems = ({ limit }) => {
  const query = useQuery();
  const search = query.get("search");
  const [items, setItems] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const searchItems = (abortController) => {
    setIsLoading(true);
    fetch(
      import.meta.env.VITE_BACK_URL +
        "/v1/items?" +
        new URLSearchParams({ q: search }),
      {
        method: "GET",
        signal: abortController.signal,
      }
    )
      .then((response) => {
        if (response.ok) {
          return response
            .json()
            .then((jsonResponse) => {
              setItems({
                ...jsonResponse,
                items: limit ? jsonResponse.items.slice(0,limit) : jsonResponse.items,
              });
            })
            .catch((error) => {
              throw new Error(`Error to parse data to json: ${error.message}`);
            });
        }
      })
      .catch((error) => {
        throw new Error(`Error to get items from Server API: ${error.message}`);
      })
      .finally(()=>{
        setIsLoading(false);
      });
  };
  useEffect(() => {
    const abortController = new AbortController();
    searchItems(abortController);
    return () => {
      abortController.abort();
    };
  }, [search]);

  return { items,isLoading };
};
