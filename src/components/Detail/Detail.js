import { useState, useEffect } from 'react';
import styles from './Detail.module.scss';
import Accordion from '../Accordion/Accordion';
<<<<<<< HEAD
import { excludeTags } from '../../utils';
=======
import { Label } from '../Label/Label';
>>>>>>> bd7c0fe1eeb5c5f39ab55bff70aea981901df10d
import { getRecipeById } from '@api/requestData';
import { Heading } from '../Heading/Heading';
import { IconButton } from '../';

export const Detail = ({ id, title, imgSrc }) => {
  const [recipe, setRecipe] = useState({
    extendedIngredients: [],
    analyzedInstructions: [{ steps: [] }],
    summary: '',
  });

  useEffect(() => {
    (async () => {
      setRecipe(await getRecipeById(id));
    })();
  }, [id]);

  const { creditsText } = recipe;

  const recipeDetails = [
    {
      type: 'ingredients',
      data: recipe.extendedIngredients.map(
        (ingredient) => `${ingredient.nameClean} ${ingredient.amount} ${ingredient.measures.metric.unitShort}`,
      ),
    },
    {
      type: 'equipment',
      data: recipe.analyzedInstructions[0].steps.map((step) => step.equipment.map((equip) => equip.name).join('')),
    },
    { type: 'summary', data: [excludeTags(recipe.summary)] },
    { type: 'instructions', data: recipe.analyzedInstructions[0].steps.map((step) => step.step) },
  ];

  return (
    <article className={styles.detail}>
      <Heading as="h2">{title}</Heading>
      <figure className={styles.foodImageContainer}>
        <img className={styles.foodImage} src={`${imgSrc}`} alt={`${title}`} />
        <figcaption className={styles.creditsText}>{creditsText}</figcaption>
        <IconButton
          className={styles.save}
          variant="filled"
          type="button"
          state="heart"
          ariaLabel="search"
          color="green"
          size="large"
          shape="circle"
        />
      </figure>
      <div>Badge 컴포넌트</div>
      <p>Ready in 45 minutes</p>
      <p>15 saved</p>
      <Accordion recipeDetails={recipeDetails} />
    </article>
  );
};
