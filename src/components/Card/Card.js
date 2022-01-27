import PropTypes from 'prop-types';
import styles from './Card.module.scss';
import classNames from 'classnames';
import { excludeTags } from '@utils/misc';
import { useState } from 'react';
import { Dialog, Detail } from '..';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import imgUrl from '@assets/images/no-image.jpg';
import { useAuthUser } from '../../contexts/AuthContext';
import { getRecipeById } from '@api/requestData';
import { saveRecipe, removeRecipe, getSavedRecipe } from '@api/customApi';
import { Auth } from '../Auth/Auth';

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
  const [isSaved, setIsSaved] = useState(false);
  const [recipeData, setRecipeData] = useState({});
  const [savedCount, setSavedCount] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const authUser = useAuthUser();

  const handleClick = (e) => {
    if (authUser) {
      isSaved ? setSavedCount(savedCount - 1) : setSavedCount(savedCount + 1);
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
        savedRecipe.saved = 0;
      }
      setRecipeData(savedRecipe);
      setSavedCount(savedRecipe.saved);
      if (authUser && savedRecipe.savedBy) setIsSaved(savedRecipe.savedBy.includes(authUser.uid));

      setShowDetailDialog(true);
    })();
  };

  const handleCloseDialog = () => {
    if (authUser) {
      if (isSaved) {
        const { readyInMinutes, creditsText, diets, recipeDetails, saved, veryHealthy, veryPopular } = recipeData;

        saveRecipe(authUser.uid, {
          recipeId: id + '',
          image: image || '',
          imgSrc: image ? imgSrc : '',
          title,
          readyInMinutes,
          creditsText,
          diets,
          recipeDetails,
          saved,
          veryHealthy,
          veryPopular,
        });
      } else {
        removeRecipe(authUser.uid, id + '');
      }
    }

    navigate(-1);
    setShowDetailDialog(false);
  };

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
          <div className={styles.summary}>
            {hasSummary &&
              summary.split('. ').map((text, index, texts) =>
                index < texts.length - 1 ? (
                  <p key={index} className={styles.text}>
                    {excludeTags(text) + '. '}
                  </p>
                ) : (
                  <p key={index} className={styles.text}>
                    {excludeTags(text)}
                  </p>
                ),
              )}
          </div>
          {hasSummary && <button className={styles.more}>more</button>}
        </div>
      </Link>
      {showDetailDialog ? (
        <Dialog onClose={handleCloseDialog} nodeId="dialog" img={imgSrc} label={title} className={styles.detailDialog}>
          <Detail
            id={id}
            imgSrc={imgSrc}
            title={title}
            recipeData={recipeData}
            savedCount={savedCount}
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
