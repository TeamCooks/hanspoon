import { useState, useEffect } from 'react';
import { excludeTags, camelCase } from '@utils';
import { getRecipeById } from '@api/requestData';
import { Heading } from '../Heading/Heading';
import { IconButton, Label, Badge } from '../';
import Accordion from '../Accordion/Accordion';
import styles from './Detail.module.scss';
import { saveRecipe, removeRecipe } from '@api/myRecipes';
import { useAuthUser } from '../../contexts/AuthContext';

export function Detail({ id, title, imgSrc }) {
  const saved = 75; // DB에서 불러오는 것으로 수정해야 함.
  const [isSaved, setIsSaved] = useState(false);
  const authUser = useAuthUser();
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

  const handleClick = () => {
    if (isSaved === false) {
      const { creditsText, diets } = recipe;
      saveRecipe(authUser.uid, { recipeId: id + '', imgSrc, title, creditsText, diets, recipeDetails });
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
          <img className={styles.foodImage} src={`${imgSrc}`} alt={`${title}`} />
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
        <Label type={'time'} value={recipe.readyInMinutes || 0} />
        <Label type={'bookmark'} value={saved} />
      </div>
      <Accordion className={styles.recipeAccordion} recipeDetails={recipeDetails} />
    </article>
  );
}
