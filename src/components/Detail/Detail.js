import { useState, useEffect } from 'react';
import styles from './Detail.module.scss';
import Accordion from '../Accordion/Accordion';
import { Label } from '../Label/Label';
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
      <Label type="time" text="45" />
      <Label type="bookmark" text="3" />
      <Accordion recipe={recipe} />
    </article>
  );
};
