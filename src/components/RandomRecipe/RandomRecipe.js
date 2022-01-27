import { useEffect, useState } from 'react';
import { Button, Heading, SkeletonCard, Card } from '..';
import { getRandomRecipe } from '@api/requestData';
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi';
import styles from './RandomRecipe.module.scss';
import noImgUrl from '@assets/images/no-image.jpg';

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

  let timer;
  const handleClick = () => {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        getRecipe();
      }, 300);
    }
  };

  const renderCard = () => {
    if (loading) {
      return <SkeletonCard type="wide" background="white" hasSummary={true} headingPosition="bottomLeft" />;
    } else {
      const { id, title, summary, image } = recipe;
      //const imgSrc = image ? `https://spoonacular.com/recipeImages/${id}-312x231` : noImgUrl;
      return (
        <Card
          id={id}
          type="wide"
          background="white"
          hasSummary={true}
          headingPosition="bottomLeft"
          imgSrc={image || noImgUrl}
          image={image}
          title={title}
          summary={summary}
        />
      );
    }
  };

  return (
    <section className={styles.section}>
      <Heading as="h2">Random Recipe</Heading>
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
