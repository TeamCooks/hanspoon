import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Heading, Loading, Pagination, CardList, Meta } from '../../components';
import { useSearch } from '../../Hooks';
import classNames from 'classnames';
import styles from './Search.module.scss';
const RESULTS_PER_PAGE = 12;

export default function Search() {
  const { keyword } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const { totalResults, results, isLoading } = useSearch(keyword, currentPage, RESULTS_PER_PAGE);

  const metaData = useMemo(() => {
    return { title: `Search results for ${keyword}` };
  }, []);

  const handleClick = (num) => {
    setCurrentPage(num);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [keyword]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <>
      <Meta data={metaData} />
      <div className={classNames(styles.container)}>
        {isLoading ? (
          <Loading message={`Searching for ${keyword}`} />
        ) : results.length === 0 && totalResults === 0 ? (
          <Pagination.NoResults headline={`No results found for '${keyword}'`} description="Try another keyword" />
        ) : (
          <>
            <Heading as="h2" className={styles.heading}>
              Search Results
            </Heading>
            <CardList results={results} />
            <Pagination limit={RESULTS_PER_PAGE} onClick={handleClick} currentPage={currentPage} totalResults={totalResults} />
          </>
        )}
      </div>
    </>
  );
}
