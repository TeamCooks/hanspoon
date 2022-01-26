import { camelCase } from '@utils';
import { Heading, IconButton, Label, Badge } from '../';
import Accordion from '../Accordion/Accordion';
import styles from './Detail.module.scss';

export function Detail({ id, title, imgSrc, recipeData, savedCount, isSaved, handleClick }) {
  const { creditsText, diets, readyInMinutes, recipeDetails, isHealthy, isPopular } = recipeData;

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
        {diets && diets.length ? (
          <ul className={styles.badgeList}>
            {isHealthy ? (
              <li key={0}>
                <Badge state={'healthy'} size="small" />
              </li>
            ) : null}
            {isPopular ? (
              <li key={0}>
                <Badge state={'popular'} size="small" />
              </li>
            ) : null}
            {diets.map((diet, index) => (
              <li key={index + 2}>
                <Badge state={camelCase(diet)} size="small" />
              </li>
            ))}
          </ul>
        ) : null}
        <Label type={'time'} value={readyInMinutes || 0} />
        <Label type={'bookmark'} value={savedCount || 0} />
      </div>
      <Accordion recipeDetails={recipeDetails} />
    </article>
  );
}
