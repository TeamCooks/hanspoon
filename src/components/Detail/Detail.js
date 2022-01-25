import { useState, useEffect } from 'react';
import { excludeTags, camelCase } from '@utils';
import { getRecipeById } from '@api/requestData';
import { Heading, IconButton, Label, Badge } from '../';
import Accordion from '../Accordion/Accordion';
import styles from './Detail.module.scss';
import { saveRecipe, removeRecipe, getSavedRecipe } from '@api/customApi';
import { useAuthUser } from '../../contexts/AuthContext';

export function Detail({ id, title, imgSrc }) {
  const [isSaved, setIsSaved] = useState(false);
  const authUser = useAuthUser();
  const [recipe, setRecipe] = useState({
    extendedIngredients: [],
    analyzedInstructions: [{ steps: [] }],
    summary: '',
  });

  useEffect(() => {
    (async () => {
      const savedRecipe = await getSavedRecipe(id + '');
      if (!savedRecipe) {
        setRecipe(await getRecipeById(id));
      } else {
        setRecipe(savedRecipe);
      }
    })();
  }, []);

  const { creditsText, diets, readyInMinutes, saved } = recipe;

  const recipeDetails = recipe.recipeDetails || [
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
          recipe.analyzedInstructions[0]?.steps?.flatMap((step) => step.equipment?.flatMap((equip) => equip.name)),
        ),
      ],
    },
    { type: 'summary', data: excludeTags(recipe.summary) },
    {
      type: 'instructions',
      data: recipe.analyzedInstructions[0]?.steps?.map((step) => step.step),
    },
  ];

  const handleClick = () => {
    if (isSaved === false) {
      saveRecipe(authUser.uid, { recipeId: id + '', imgSrc, title, readyInMinutes, creditsText, diets, recipeDetails });
    } else {
      removeRecipe(authUser.uid, id + '');
    }
    setIsSaved(!isSaved);
  };

  return (
    <article className={styles.detail}>
      <div className={styles.heading}>
        <Heading as="h2">{title}</Heading>
        <div className={styles.buttons}>
          <IconButton
            variant="default"
            type="button"
            state="link"
            ariaLabel="copy link"
            color="white"
            size="large"
            shape="circle"
          />
          <IconButton
            variant="default"
            type="button"
            state={isSaved ? 'bookmarkFill' : 'bookmark'}
            ariaLabel="save to my recipes"
            color={isSaved ? 'orange' : 'white'}
            size="large"
            shape="circle"
            onClick={handleClick}
          />
        </div>
      </div>

      <div className={styles.recipeBrief}>
        <figure className={styles.foodImageContainer}>
          <img className={styles.foodImage} src={imgSrc} alt={title} />
          <figcaption className={styles.creditsText}>{creditsText}</figcaption>
        </figure>
        {diets && (
          <ul className={styles.badgeList}>
            {diets.map((diet, index) => (
              <li key={index}>
                <Badge state={camelCase(diet)} size="small" />
              </li>
            ))}
          </ul>
        )}
        <Label type={'time'} value={readyInMinutes || 0} />
        <Label type={'bookmark'} value={saved || 0} />
      </div>
      <Accordion className={styles.recipeAccordion} recipeDetails={recipeDetails} />
    </article>
  );
}
