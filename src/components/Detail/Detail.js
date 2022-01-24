import { useState, useEffect } from 'react';
import { excludeTags, camelCase } from '@utils';
import { getRecipeById } from '@api/requestData';
import { Heading } from '../Heading/Heading';
import { IconButton, Label, Badge } from '../';
import Accordion from '../Accordion/Accordion';
import styles from './Detail.module.scss';

export function Detail({ id, title, imgSrc }) {
  const saved = 75; // DB에서 불러오는 것으로 수정해야 함.
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

  const { creditsText, diets } = recipe;

  const recipeDetails = [
    {
      type: 'ingredients',
      data: recipe.extendedIngredients.map((ingredient) => ({
        name: ingredient.nameClean,
        amount: ingredient.amount,
        unit: ingredient.measures.metric.unitShort,
      })),
    },
    {
      type: 'equipment',
      data: [
        ...new Set(
          recipe.analyzedInstructions[0].steps.flatMap((step) => step.equipment.flatMap((equip) => equip.name)),
        ),
      ],
    },
    { type: 'summary', data: excludeTags(recipe.summary) },
    {
      type: 'instructions',
      data: recipe.analyzedInstructions[0].steps.map((step) => step.step),
    },
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
        {diets && (
          <ul>
            <li>
              {diets.map((diet, index) => (
                <Badge key={index} state={camelCase(diet)} size="small" />
              ))}
            </li>
          </ul>
        )}
        <Label type={'time'} value={recipe.readyInMinutes || 0} />
        <Label type={'bookmark'} value={saved} />
      </div>
      <Accordion className={styles.recipeAccordion} recipeDetails={recipeDetails} />
    </article>
  );
}
