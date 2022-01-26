import { useEffect, useState } from 'react';
import { getHotRecipes } from '@api/customApi';
import { Card } from '../Card/Card';
import { Heading } from '../Heading/Heading';
import { SkeletonCard } from '../Card/SkeletonCard';

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

  const renderCards = ({ recipeId, imgSrc, title }) => {
    if (loading) {
      return <SkeletonCard type="square" background="none" hasSummary={false} headingPosition="bottomCenter" />;
    } else {
      return (
        <Card
          id={recipeId}
          type="square"
          background="none"
          hasSummary={false}
          headingPosition="bottomCenter"
          imgSrc={imgSrc}
          title={title}
        />
      );
    }
  };

  return (
    <section className={styles.section}>
      <Heading as="h2" className={styles.hotRecipes}>
        HotRecipes
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
