import PropTypes from 'prop-types';
import { camelCase } from '@utils';
import { Heading, IconButton, Label, Badge } from '../';
import Accordion from '../Accordion/Accordion';
import styles from './Detail.module.scss';

export const Detail = ({ title, imgSrc, recipeData, savedCount, isSaved, handleClick }) => {
  const { creditsText, readyInMinutes, recipeDetails, tags } = recipeData;
  const comingSoon = () => {
    alert('구현 중인 기능입니다.');
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
            onClick={comingSoon}
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
        {tags && tags.length ? (
          <ul className={styles.badgeList}>
            {tags.map((tag, index) => (
              <li key={tag + index}>
                <Badge state={camelCase(tag)} size="small" />
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
};

Detail.propTypes = {
  title: PropTypes.string,
  imgSrc: PropTypes.string,
  isSaved: PropTypes.bool,
};
