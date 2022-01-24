import { Card } from '..';
import styles from './CardList.module.scss';
import defaultImg from '@assets/default.jpg';
import PropTypes from 'prop-types';


export function CardList({ results }) {  
  return (
      <ul className={styles.list}>
        {results.map(({ id, title, image, img }) => {
          let imgUrl = `https://spoonacular.com/recipeImages/${id}-312x231`;
          if (!image) imgUrl = defaultImg;
          return (
            <li className={styles.item} key={id}>
              <Card
                id={id}
                type="smallSquare"
                background="none"
                hasSummary={false}
                headingPosition="bottomCenter"
                imgSrc={img || imgUrl}
                title={title}
              />
            </li>
          );
        })}
      </ul>
  );
}


CardList.propTypes = {
  results: PropTypes.array
}