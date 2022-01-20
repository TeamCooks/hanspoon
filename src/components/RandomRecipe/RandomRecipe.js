import { useEffect, useState } from 'react';
import { Card } from '../Card/Card';
import { SkeletonCard } from '../Card/SkeletonCard';
import { Button } from '../../components';
import { Heading } from '../Heading/Heading';
import { getRandomRecipe } from '@api/requestData';
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi';
import styles from './RandomRecipe.module.scss';

export function RandomRecipe() {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [image, setImage] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      setLoading(true);
      const { recipes } = await getRandomRecipe();
      const { id, title, summary, image } = recipes[0];
      setId(id);
      setTitle(title);
      setSummary(summary);
      setImage(image);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  let timer;
  const handleClick = () => {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        getData();
      }, 200);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const renderCard = () => {
    if (error) {
      return <SkeletonCard type="wide" background="white" hasSummary={true} headingPosition="bottomLeft" />;
    }
    if (loading) {
      return <SkeletonCard type="wide" background="white" hasSummary={true} headingPosition="bottomLeft" />;
    }
    return (
      <Card
        id={id}
        type="wide"
        background="white"
        hasSummary={true}
        headingPosition="bottomLeft"
        imgSrc={image}
        title={title}
        summary={summary}
      />
    );
  };

  return (
    <section className={styles.section}>
      <Heading as="h2">RandomRecipe</Heading>
      <Button
        className={styles.button}
        style={{ padding: '10px 18px', display: 'flex', alignItems: 'center', gap: '10px' }}
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
