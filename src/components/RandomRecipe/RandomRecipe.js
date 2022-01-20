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

  async function getData() {
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
    }
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
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
          onClick={() => {
            getData();
          }}
        >
          <GiPerspectiveDiceSixFacesRandom style={{ fontSize: '25px' }} />
          REROLL
        </Button>
        <SkeletonCard type="wide" background="white" hasSummary={true} headingPosition="bottomLeft" />
      </section>
    );
  }
  if (error) {
    return <div>An error occurred while loading food.</div>;
  }

  return (
    <section className={styles.section}>
      <Heading as="h2">RandomRecipe</Heading>
      <Button
        className={styles.button}
        style={{
          padding: '10px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
        shape="round"
        variant="outlined"
        color="orange"
        type="button"
        onClick={() => {
          getData();
        }}
      >
        <GiPerspectiveDiceSixFacesRandom style={{ fontSize: '25px' }} />
        REROLL
      </Button>
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
    </section>
  );
}
