import { searchRecipes } from '@api/requestData';
import { useEffect, useRef, useState } from 'react';
const RESULTS_PER_PAGE = 12;

// search/pending
  // isLoading true
  // error null
  // data null
// search/fulfilled
  // isLoading false
  // error null
  // data { result, totalResult }
// search/rejected
  // isLoading false
  // error { message }
  // data null

// function reducer (state, action)  {
//   switch(action.type) {
//     case 'search/fulfilled': 
//       return {
//         ...state,
//         isLoading: false,
//         data: action.payload
//       }
//     case 'search/rejected': 
//       return {
//         ...state,
//         isLoading: false,
//         error: {message: action.payload}
//       }
//     default:
//   }
// }

// const { state, dispatch }  = useReducer(reducer, {
//   isLoading: true,
//   error: null,
//   data: null
// })

export const useSearch = (keyword, currentPage, limit=RESULTS_PER_PAGE) => {
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
        (currentPage-1) * limit,
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
  }, [keyword, currentPage]);

  return {
    results,
    isLoading,
    hasError: error !== null,
    error,
    totalResults,
  };
};
