import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Pagination.module.scss';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { IoEllipsisHorizontalSharp } from 'react-icons/io5';
import { Heading } from '..';

export const Pagination = ({ currentPage, className, onClick: handleClick, totalResults }) => {
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
      <Pagination.List
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

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  totalResults: PropTypes.number.isRequired,
};

Pagination.List = ({ className, currentPage, limit, totalResults, onClick: handleClick }) => {
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
      {Array.from({ length: pageEndNum - pageStartNum + 1 }, (_, index) => {
        return (
          <li key={index} className={classNames({ [styles.current]: currentPage === pageStartNum + index })}>
            <button
              type="button"
              className={styles.pageButton}
              aria-pressed={currentPage === pageStartNum + index}
              aria-label={`Go to page ${pageStartNum + index}.`}
              onClick={() => {
                handleClick(pageStartNum + index);
              }}
            >
              {pageStartNum + index}
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
            <IoEllipsisHorizontalSharp />
          </button>
        </li>
      ) : null}
    </ul>
  );
};

Pagination.List.propTypes = {
  className: PropTypes.string,
  currentPage: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  totalResults: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};


Pagination.NoResults = ({ headline, description }) => {
  return (
    <div className={styles.noResults}>
      <Heading as="h2" className={styles.heading}>{headline}</Heading>
      <p>{description}</p>
    </div>
  );
};

Pagination.NoResults.propTypes = {
  headline: PropTypes.string.isRequired,
  description:PropTypes.string.isRequired
};
