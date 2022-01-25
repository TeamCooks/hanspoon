import { useEffect, useState } from 'react';
import { getHotRecipes } from '@api/myRecipes';
import { Card } from '../Card/Card';
import { Heading } from '../Heading/Heading';

import styles from './HotRecipes.module.scss';

export function HotRecipes() {
  const [hotRecipes, setHotRecipes] = useState([]);

  useEffect(() => {
    (async () => {
      setHotRecipes(await getHotRecipes());
    })();
  }, []);

  return (
    <section className={styles.section}>
      <Heading as="h2" className={styles.hotRecipes}>
        HotRecipes
      </Heading>

      <ul className={styles.cardItems}>
        {hotRecipes.map(({ recipeId, title, imgSrc }, idx) => {
          return (
            <li className={styles.item} key={idx}>
              <Card
                id={recipeId}
                type="square"
                background="none"
                hasSummary={false}
                headingPosition="bottomCenter"
                imgSrc={imgSrc}
                title={title}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
