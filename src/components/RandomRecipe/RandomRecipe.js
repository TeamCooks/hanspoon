import { useEffect, useState } from 'react';
import { Card } from '../Card/Card';
import { SkeletonCard } from '../Card/SkeletonCard';
import { Button } from '../../components';
import { Heading } from '../Heading/Heading';
import { getRandomRecipe } from '@api/requestData';
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi';
import styles from './RandomRecipe.module.scss';
import lodash from 'lodash';

export function RandomRecipe() {
  const [savedRecipe, setSavedRecipe] = useState([]);
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { recipes } = await getRandomRecipe(2);

      setRecipe(recipes[0]);
      setSavedRecipe(recipes[1]);

      setLoading(false);
    })();
  }, []);

  const getRecipe = async () => {
    setRecipe(savedRecipe);
    const { recipes } = await getRandomRecipe();
    setSavedRecipe(recipes[0]);
  };

  const handleClick = () => {
    lodash.throttle(getRecipe(), 200);
  };

  const renderCard = () => {
    if (loading) {
      return <SkeletonCard type="wide" background="white" hasSummary={true} headingPosition="bottomLeft" />;
    } else {
      return (
        <Card
          id={recipe.id}
          type="wide"
          background="white"
          hasSummary={true}
          headingPosition="bottomLeft"
          imgSrc={recipe.image}
          title={recipe.title}
          summary={recipe.summary}
        />
      );
    }
  };

  return (
    <section className={styles.section}>
      <Heading as="h2">RandomRecipe</Heading>
      <Button
        className={styles.button}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
        shape="round"
        variant="outlined"
        color="orange"
        type="button"
        onClick={handleClick}
      >
        <GiPerspectiveDiceSixFacesRandom style={{ fontSize: '25px' }} />
        REROLL
      </Button>
      <div className={styles.randomRecipeCardWrap}>{renderCard()}</div>
    </section>
  );
}
