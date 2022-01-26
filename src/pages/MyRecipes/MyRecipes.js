import { getMyRecipes } from '@api/customApi';
import { useAuthUser } from '../../contexts/AuthContext';
import { useEffect, useState, useMemo } from 'react';
import { Loading, Heading, CardList, Pagination, Meta } from '../../components';
import styles from './MyRecipes.module.scss';
import classNames from 'classnames';

export default function MyRecipes() {
  const authUser = useAuthUser();
  const [myRecipes, setMyRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await getMyRecipes(authUser.uid);
      setMyRecipes(data);
      setIsLoading(false);
    })();
  }, []);

  const metaData = useMemo(()=> {
    return { title: 'My Recipes'}
  }, [])

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
