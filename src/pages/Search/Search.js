import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { Card, Heading, Loading } from '../../components';
import { useSearch } from '../../Hooks';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { IoEllipsisHorizontalSharp } from 'react-icons/io5';
import classNames from 'classnames';
import styles from './Search.module.scss';

export default function Search() {
  const { keyword } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const { totalResults, results, isLoading, hasError, error } = useSearch(keyword, currentPage);

  const handleClick = (num) => {
    setCurrentPage(num);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [keyword]);

  return (
    <div className={classNames(styles.container)}>
      {isLoading ? (
        <Loading message="Loading search results" />
      ) : results.length === 0 || totalResults === 0 ? (
        <Search.NoResults keyword={keyword} />
      ) : (
        <>
          <Heading as="h2" className={styles.heading}>
            Search Results
          </Heading>
          <ul className={styles.searchResultsList}>
            {results.map(({ id, image, title }) => (
              <li className={styles.item} key={id}>
                <Card
                  id={id}
                  type="smallSquare"
                  background="none"
                  hasSummary={false}
                  headingPosition="bottomCenter"
                  imgSrc={`https://spoonacular.com/recipeImages/${id}-312x231`}
                  title={title}
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
        </>
      )}
    </div>
  );
}

Search.PageList = ({ className, currentPage, limit, totalResults, onClick: handleClick }) => {
  const lastPageNum = Math.ceil(totalResults / limit);
  const pageStartNum = Math.max(currentPage - 2, 1);
  const pageEndNum = Math.min(currentPage + 2, lastPageNum);
  return (
    <ul className={classNames(className, styles.pageNumberList)}>
      {currentPage > 3 ? (
        <li>
          <button
            type="button"
            className={styles.pageButton}
            aria-pressed={false}
            aria-label={`Go to previous pages.`}
            onClick={() => {
              handleClick(currentPage - 3);
            }}
          >
            <IoEllipsisHorizontalSharp />
          </button>
        </li>
      ) : null}
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
      {currentPage < lastPageNum - 2 ? (
        <li>
          <button
            type="button"
            className={styles.pageButton}
            aria-pressed={false}
            aria-label={`Go to next pages.`}
            onClick={() => {
              handleClick(currentPage + 3);
            }}
          >
            <IoEllipsisHorizontalSharp />{' '}
          </button>
        </li>
      ) : null}
    </ul>
  );
};

Search.PageList.propTypes = {
  className: PropTypes.string,
  currentPage: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  totalResults: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
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
        <IoIosArrowBack />
      </button>
      <Search.PageList
        className={styles.pageList}
        currentPage={currentPage}
        totalResults={totalResults}
        limit={5}
        onClick={handleClick}
      />
      <button
        type="button"
        className={styles.pageButton}
        aria-label={`Go to next results page.`}
        onClick={() => {
          if (currentPage > Math.floor(totalResults / 5)) return;
          handleClick(currentPage + 1);
        }}
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
};

Search.PageControl.propTypes = {
  currentPage: PropTypes.number.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  totalResults: PropTypes.number.isRequired,
};

Search.NoResults = ({ keyword }) => {
  return (
    <div className={styles.noResults}>
      <Heading as="h2" className={styles.heading}>{`No results found for '${keyword}'!`}</Heading>
      <p>Try another keyword.</p>
    </div>
  );
};

Search.NoResults.propTypes = {
  keyword: PropTypes.string.isRequired,
};
