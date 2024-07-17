/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useQuery } from "./useQuery";
export const useItems = () => {
  const query = useQuery();
  const search = query.get("search");
  const [items, setItems] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const searchItems = (abortController) => {
    setIsLoading(true);
    fetch(
      process.env.API_URL + "/v1/items?" + new URLSearchParams({ q: search }),
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
              setItems(jsonResponse);
            })
            .catch((error) => {
              console.error(`Error to parse data to json: ${error.message}`);
            });
        }
      })
      .catch((error) => {
        console.error(`Error to get items from Server API: ${error.message}`);
      })
      .finally(() => {
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

  return { items, isLoading };
};
