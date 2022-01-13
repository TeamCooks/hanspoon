import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { searchRecipes } from '../../api/requestData';
import { Card } from '../../components';

export default function Search() {
  const { keyword } = useParams();
  const [fetchedData, setFetchedData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSearchResults, setCurrentSearchResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  // const { totalResults, data, isLoading, hasError, error } = useSearch(keyword);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      if (!fetchedData[currentPage]) {
        const { results, totalResults: fetchedTotalResults } = await searchRecipes(keyword, 10, [currentPage - 1] * 10);
        if (totalResults !== fetchedTotalResults) setTotalResults(fetchedTotalResults);
        setFetchedData({ ...fetchedData, [currentPage]: results });
        setCurrentSearchResults(results);
      } else {
        setCurrentSearchResults(fetchedData[currentPage]);
      }
    })();
    setIsLoading(false);
  }, [currentPage, keyword]);

  return (
    <div>
      <p>{totalResults}개의 검색결과가 있습니다.</p>
      <p>현재 페이지 {currentPage}</p>
      {isLoading ? <div>로딩중입니다.</div> : null}
      <button onClick={() => setCurrentPage(1)}>처음결과보기</button>
      <button onClick={() => setCurrentPage(currentPage - 1)}>이전결과보기</button>
      <ul>
        {[-2, -1, 0, 1, 2].map((num) => (
          <li key={num}>
            <button onClick={() => setCurrentPage(num + currentPage)}>{currentPage + num}</button>
          </li>
        ))}
      </ul>
      <button onClick={() => setCurrentPage(currentPage + 1)}>다음결과보기</button>
      <button onClick={() => setCurrentPage(Math.ceil(totalResults / 10))}>끝결과보기</button>
      <ul>
        {currentSearchResults.map(({ id, image, title }) => (
          <li key={id}>
            <Card
              type="square"
              background="white"
              summary={false}
              headingPosition="bottomCenter"
              imgSrc={`https://spoonacular.com/recipeImages/${image}`}
              foodName={title}
            />
          </li>
        ))}
      </ul>
      )
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
