import { getMyRecipes } from '@api/customApi';
import { useAuthUser } from '../../contexts/AuthContext';
import { useEffect, useState, useMemo } from 'react';
import { Loading, Heading, CardList, Pagination, Meta } from '../../components';
import styles from './MyRecipes.module.scss';
import classNames from 'classnames';
const RESULTS_PER_PAGE = 12;

export default function MyRecipes() {
  const authUser = useAuthUser();
  const [recipesToBeDisplayed, setRecipesToBeDisplayed] = useState([]);
  const [myRecipes, setMyRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await getMyRecipes(authUser.uid);
      setMyRecipes(data);
      setRecipesToBeDisplayed(data.slice(0, RESULTS_PER_PAGE));
      setIsLoading(false);
    })();
  }, [authUser.uid]);

  const metaData = useMemo(() => {
    return { title: 'My Recipes' };
  }, []);

  useEffect(() => {
    setRecipesToBeDisplayed(myRecipes.slice((currentPage - 1) * RESULTS_PER_PAGE, currentPage * RESULTS_PER_PAGE));
  }, [currentPage]);

  const handleClick = (num) => {
    setCurrentPage(num);
  };

  return (
    <>
      <Meta data={metaData} />
      <div className={classNames(styles.container)}>
        {isLoading ? (
          <Loading message="Loading my recipes" />
        ) : myRecipes.length === 0 ? (
          <Pagination.NoResults headline="Nothing saved" description="Save recipes!" />
        ) : (
          <>
            <Heading as="h2" className={styles.heading}>
              My Recipes
            </Heading>
            <CardList results={recipesToBeDisplayed} />
            <Pagination limit={RESULTS_PER_PAGE} onClick={handleClick} currentPage={currentPage} totalResults={myRecipes.length} />
          </>
        )}
      </div>
    </>
  );
}
