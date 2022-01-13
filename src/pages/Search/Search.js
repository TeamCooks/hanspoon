import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { searchRecipes } from '../../api/requestData';

export default function Search() {
  const { keyword } = useParams();
  const { totalResults, data, isLoading, hasError, error } = useSearch(keyword);

  useEffect(() => {}, []);

  return (
    <div>
      <p>{totalResults}개의 검색결과가 있습니다.</p>
      {hasError ? (
        <div>에러다</div>
      ) : (
        <ul>
          {data.map(({ id, image, title }) => (
            <li key={id}>
              <h2>{title}</h2>
              <img alt={title} src={`https://spoonacular.com/recipeImages/${image}`} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const useSearch = (keyword, shouldFetch) => {
  const [data, setData] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { results, totalResults } = await searchRecipes(keyword);
        setData((previousData) => previousData.concat(results));
        setTotalResults(totalResults);
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    // if (shouldFetch()) {
      fetchData();
    // }
  }, [keyword]);

  return {
    data,
    isLoading,
    hasError: error !== null,
    error,
    totalResults,
  };
};
