import PropTypes from 'prop-types';
import styles from './Card.module.scss';
import classNames from 'classnames';
import { excludeTags, sentenceIntoParagraph } from '@utils/misc';
import { useState, useEffect } from 'react';
import { Dialog, Detail, Auth } from '..';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import imgUrl from '@assets/images/no-image.jpg';
import { useAuthUser } from '../../contexts/AuthContext';
import { getRecipeById } from '@api/requestData';
import { saveRecipe, removeRecipe, getSavedRecipe } from '@api/customApi';

export function Card({
  id = 0,
  type,
  background,
  hasSummary,
  headingPosition,
  image,
  imgSrc = imgUrl,
  title,
  summary = '',
}) {
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [recipeData, setRecipeData] = useState({});
  const [savedCountBeDisplayed, setSavedCountBeDisplayed] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const authUser = useAuthUser();

  const handleClick = (e) => {
    if (authUser) {
      isSaved
        ? setSavedCountBeDisplayed(savedCountBeDisplayed - 1)
        : setSavedCountBeDisplayed(savedCountBeDisplayed + 1);
      setIsSaved(!isSaved);
    } else {
      setShowAuthDialog(true);
    }
  };

  const handleCloseAuthDialog = () => {
    setShowAuthDialog(false);
  };

  const handleOpenDialog = (e) => {
    (async () => {
      let savedRecipe = await getSavedRecipe(id + '');
      if (!savedRecipe) {
        savedRecipe = await getRecipeById(id);
        savedRecipe.recipeDetails = [
          {
            type: 'ingredients',
            data: savedRecipe.extendedIngredients.map((ingredient) => ({
              name: ingredient.nameClean,
              amount: ingredient.amount,
              unit: ingredient.measures.metric.unitShort,
            })),
          },
          {
            type: 'equipment',
            data: [
              ...new Set(
                savedRecipe.analyzedInstructions[0]?.steps?.flatMap((step) =>
                  step.equipment?.flatMap((equip) => equip.name),
                ),
              ),
            ],
          },
          { type: 'summary', data: excludeTags(savedRecipe.summary) },
          {
            type: 'instructions',
            data: savedRecipe.analyzedInstructions[0]?.steps?.map((step) => step.step),
          },
        ];
        savedRecipe.savedCount = 0;
        savedRecipe.tags = [...savedRecipe.diets.filter((diet) => [diet !== 'fodmap friendly'])];
        if (savedRecipe.veryPopular) savedRecipe.tags = [...savedRecipe.tags, 'popular'];
        if (savedRecipe.veryHealthy) savedRecipe.tags = [...savedRecipe.tags, 'healthy'];
      }
      setRecipeData(savedRecipe);
      setSavedCountBeDisplayed(savedRecipe.savedCount);

      if (authUser && savedRecipe.savedBy) setIsSaved(savedRecipe.savedBy.includes(authUser.uid));
      else setIsSaved(false);

      setShowDetailDialog(true);
    })();
  };

  const handleCloseDialog = () => {
    const { readyInMinutes, creditsText, recipeDetails, savedCount, tags } = recipeData;
    if (authUser && savedCountBeDisplayed !== savedCount) {
      if (isSaved) {
        saveRecipe(authUser.uid, {
          recipeId: id + '',
          image: image || '',
          title,
          readyInMinutes,
          creditsText,
          recipeDetails,
          savedCount,
          tags,
        });
      } else {
        removeRecipe(authUser.uid, id + '');
      }
    }

    navigate(-1);
    setShowDetailDialog(false);
  };

  useEffect(() => {
    if (authUser && recipeData.savedBy) setIsSaved(recipeData.savedBy.includes(authUser.uid));
  }, [authUser, recipeData.savedBy]);

  return (
    <>
      <Link
        to={`${location.pathname}?id=${id}`}
        role="button"
        className={styles.cardButton}
        onClick={handleOpenDialog}
        aria-label={`Open dialog of ${title}`}
        aria-haspopup="dialog"
      >
        <div className={classNames(styles.cardWrap, styles[background], { [styles.inlineBlock]: type === 'square' })}>
          <figure>
            <img className={styles[type]} src={imgSrc} alt={title} />
            <figcaption className={classNames(styles.title, styles[headingPosition])}>{title}</figcaption>
          </figure>
          {hasSummary && (
            <>
              <div className={styles.summary}>{sentenceIntoParagraph(excludeTags(summary), styles.text)}</div>
              <button className={styles.more}>more</button>
            </>
          )}
        </div>
      </Link>
      {showDetailDialog ? (
        <Dialog onClose={handleCloseDialog} nodeId="dialog" img={imgSrc} label={title} className={styles.detailDialog}>
          <Detail
            id={id}
            imgSrc={imgSrc}
            title={title}
            recipeData={recipeData}
            savedCount={savedCountBeDisplayed}
            isSaved={isSaved}
            handleClick={handleClick}
          />
        </Dialog>
      ) : null}
      <Auth isVisible={showAuthDialog} onClose={handleCloseAuthDialog} />
    </>
  );
}

Card.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.oneOf(['wide', 'square', 'smallSquare']),
  background: PropTypes.oneOf(['white', 'none']),
  hasSummary: PropTypes.bool,
  headingPosition: PropTypes.oneOf(['bottomLeft', 'bottomCenter', 'topLeft']),
  imgSrc: PropTypes.string,
  title: PropTypes.string,
  summary: PropTypes.string,
};
