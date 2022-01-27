import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Heading, Loading, Pagination, CardList } from '../../components';
import { useSearch } from '../../Hooks';
import classNames from 'classnames';
import styles from './Search.module.scss';
import { Helmet } from 'react-helmet-async';
import { setDocumentTitle } from '../../utils';

export default function Search() {
  const { keyword } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const { totalResults, results, isLoading } = useSearch(keyword, currentPage);

  const handleClick = (num) => {
    setCurrentPage(num);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [keyword]);


  useEffect(()=> {
    window.scrollTo(0, 0);
  }, [currentPage])

  return (
    <>
      <Helmet>
        <title>{setDocumentTitle(`Search results for ${keyword}`)}</title>
      </Helmet>
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
            <Pagination onClick={handleClick} currentPage={currentPage} totalResults={totalResults} />
          </>
        )}
      </div>
    </>
  );
}
