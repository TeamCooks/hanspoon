import { getMyRecipes } from '@api/myRecipes';
import { useAuthUser } from '../../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { Loading, Heading, CardList, Pagination } from '../../components';
import styles from './MyRecipes.module.scss';
import classNames from 'classnames';
import { setDocumentTitle } from '@utils';
import { Helmet } from 'react-helmet-async';

export default function MyRecipes() {
  const [myRecipes, setMyRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const authUser = useAuthUser();
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await getMyRecipes(authUser.uid);
      setMyRecipes(data);
    })();
    setIsLoading(false);
  }, []);

  const [currentPage, setCurrentPage] = useState(1);

  const handleClick = (num) => {
    setCurrentPage(num);
  };

  return (
    <>
      <Helmet>
        <title>{setDocumentTitle('My Recipes')}</title>
      </Helmet>
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
            <CardList
              results={myRecipes}
            />
            <Pagination onClick={handleClick} currentPage={currentPage} totalResults={myRecipes.length} />
          </>
        )}
      </div>
    </>
  );
}
