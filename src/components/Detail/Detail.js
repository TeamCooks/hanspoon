import { useState, useEffect } from 'react';
import styles from './Detail.module.scss';
import Accordion from '../Accordion/Accordion';
import { getRecipeById } from '@api/requestData';

export const Detail = ({ id }) => {
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    (async () => {
      setRecipe(await getRecipeById(id));
    })();
  }, []);

  const { title, creditsText, image } = recipe;

  return (
    <article>
      <h1 className={`${styles.heading}`}>{title}</h1>
      <figure className={`${styles.foodImageContainer}`}>
        <img className={`${styles.foodImage}`} src={`${image}`} alt={`${title}`} />
        <figcaption className={`${styles.creditsText}`}>{creditsText}</figcaption>
      </figure>
      <button>Like Button 컴포넌트</button>
      <div>Badge 컴포넌트</div>
      <p>Ready in 45 minutes</p>
      <p>15 saved</p>
      <Accordion recipe={recipe} />
    </article>
  );
};
