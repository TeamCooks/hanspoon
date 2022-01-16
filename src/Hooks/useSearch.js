import { searchRecipes } from '@api/requestData';
import { useEffect, useRef, useState } from 'react';

export const useSearch = (keyword, currentPage, limit) => {
  const [results, setResults] = useState([]);
  const storedResults = useRef({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalResults, setTotalResults] = useState(0);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const { results: fetchedResults, totalResults: fetchedTotalResults } = await searchRecipes(
        keyword,
        limit,
        currentPage * limit,
      );
      storedResults.current[currentPage] = fetchedResults;
      setResults(fetchedResults);
      setTotalResults(fetchedTotalResults);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    storedResults.current = {};
  }, [keyword]);

  useEffect(() => {
    if (!storedResults.current[currentPage]) {
      fetchData();
    } else {
      setResults(storedResults.current[currentPage]);
    }
  }, [currentPage]);

  return {
    results,
    isLoading,
    hasError: error !== null,
    error,
    totalResults,
  };
};
