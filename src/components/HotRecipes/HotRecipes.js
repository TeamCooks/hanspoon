import { useEffect, useState } from 'react';
import { getHotRecipes } from '@api/customApi';
import { Heading, Card } from '..';
import { SkeletonCard } from '../Card/SkeletonCard';
import noImgUrl from '@assets/images/no-image.jpg';

import styles from './HotRecipes.module.scss';

export function HotRecipes() {
  const [hotRecipes, setHotRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setHotRecipes(await getHotRecipes());
    })();
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);

  const renderCards = ({ recipeId, image, title }) => {
    if (loading) {
      return <SkeletonCard type="square" background="none" hasSummary={false} headingPosition="bottomCenter" />;
    } else {
      // const imgSrc = image ? `https://spoonacular.com/recipeImages/${recipeId}-312x231` : noImgUrl;
      return (
        <Card
          id={recipeId}
          type="square"
          background="none"
          hasSummary={false}
          headingPosition="bottomCenter"
          imgSrc={image || noImgUrl}
          image={image}
          title={title}
        />
      );
    }
  };

  return (
    <section className={styles.section}>
      <Heading as="h2" className={styles.hotRecipes}>
        Hot Recipes
      </Heading>

      <ul className={styles.cardItems}>
        {hotRecipes.map((recipe, idx) => {
          return (
            <li className={styles.item} key={idx}>
              {renderCards(recipe)}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
