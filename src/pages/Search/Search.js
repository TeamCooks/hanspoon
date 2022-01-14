import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { searchRecipes } from '@api/requestData';
import { Card } from '../../components';
import classNames from 'classnames';
import styles from './Search.module.scss';

const RESULTS_PER_PAGE = 10;

export default function Search() {
  const { keyword } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [fetchedData, setFetchedData] = useState({});
  const [currentSearchResults, setCurrentSearchResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  // const { totalResults, data, isLoading, hasError, error } = useSearch(keyword);

  const handleClick = (num) => {
    setCurrentPage(num);
  };
  useEffect(() => {
    setCurrentPage(1);
    (async () => {
      const { results, totalResults: fetchedTotalResults } = await searchRecipes(keyword, RESULTS_PER_PAGE);
      setTotalResults(fetchedTotalResults);
      setFetchedData({ 1: results });
      setCurrentSearchResults(results);
    })();
  }, [keyword]);
  
  useEffect(() => {
    (async () => {
      if (!fetchedData[currentPage]) {
        const { results } = await searchRecipes(keyword, RESULTS_PER_PAGE, [currentPage - 1] * RESULTS_PER_PAGE);
        setFetchedData({ ...fetchedData, [currentPage]: results });
        setCurrentSearchResults(results);
      } else {
        setCurrentSearchResults(fetchedData[currentPage]);
      }
    })();
  }, [currentPage]);

  return (
    <div className={classNames(styles.container)}>
      <ul className={styles.searchResultsList}>
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
      <Search.PageControl
        className={classNames(styles.bottom, styles.control)}
        onClick={handleClick}
        currentPage={currentPage}
        totalResults={totalResults}
      />
    </div>
  );
}

Search.PageList = ({ className, currentPage, limit, totalResults, onClick: handleClick }) => {
  const lastPageNum = Math.ceil(totalResults / limit);
  const pageStartNum = Math.floor((currentPage - 1) / limit) * limit + 1;
  const pageEndNum = pageStartNum + limit - 1 < lastPageNum ? pageStartNum + limit - 1 : lastPageNum;
  return (
    <ul className={className}>
      {Array.from({ length: pageEndNum - pageStartNum + 1 }, (_, i) => {
        return (
          <li key={i} className={classNames({ [styles.current]: currentPage === pageStartNum + i })}>
            <button
              type="button"
              className={styles.pageButton}
              aria-pressed={currentPage === pageStartNum + i}
              aria-label={`Go to page ${pageStartNum + i}.`}
              onClick={() => {
                handleClick(pageStartNum + i);
              }}
            >
              {pageStartNum + i}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

Search.PageControl = ({ currentPage, className, onClick: handleClick, totalResults }) => {
  return (
    <div className={classNames(className, styles.control)}>
      <button
        type="button"
        className={styles.pageButton}
        aria-label={`Go to previous results page.`}
        onClick={() => {
          if (currentPage === 1) return;
          handleClick(currentPage - 1);
        }}
      >
        PREV
      </button>
      <Search.PageList
        className={styles.pageList}
        currentPage={currentPage}
        totalResults={totalResults}
        limit={RESULTS_PER_PAGE}
        onClick={handleClick}
      />
      <button
        type="button"
        className={styles.pageButton}
        aria-label={`Go to next results page.`}
        onClick={() => {
          if (currentPage > Math.floor(totalResults / RESULTS_PER_PAGE)) return;
          handleClick(currentPage + 1);
        }}
      >
        NEXT
      </button>
    </div>
  );
};

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
