import { useState, useEffect } from 'react';
import Accordion from '../Accordion/Accordion';
import { excludeTags } from '../../utils';
import { Label } from '../Label/Label';
import { getRecipeById } from '@api/requestData';
import { Heading } from '../Heading/Heading';
import { IconButton } from '../';
import styles from './Detail.module.scss';

export function Detail({ id, title, imgSrc }) {
  const saved = 75;
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
      <div className={styles.recipeBrief}>
        <Heading as="h2">{title}</Heading>
        <figure className={styles.foodImageContainer}>
          <img className={styles.foodImage} src={`${imgSrc}`} alt={`${title}`} />
          <figcaption className={styles.creditsText}>{creditsText}</figcaption>
          <IconButton
            className={styles.saveButton}
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
        <p>Ready in {recipe.readyInMinutes} minutes</p>
        <p>{saved} saved</p>
      </div>
      <Accordion recipeDetails={recipeDetails} />
    </article>
  );
}
