/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
export const useItem = () => {
  const currentUrl = window.location.pathname;
  const parts = currentUrl.split("/");
  const id = parts[parts.length - 1];
  const [item, setItem] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const searchItems = (abortController) => {
    setIsLoading(true);
    fetch(process.env.API_URL + "/v1/items/" + id, {
      method: "GET",
      signal: abortController.signal,
    })
      .then((response) => {
        if (response.ok) {
          return response
            .json()
            .then((jsonResponse) => {
              setItem(jsonResponse);
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
  }, [id]);

  return { item, isLoading };
};
