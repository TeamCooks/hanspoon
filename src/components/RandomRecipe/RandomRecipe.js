import { useEffect, useState } from 'react';
import { Card } from '../Card/Card';
import { SkeletonCard } from '../Card/SkeletonCard';

import { Button } from '../Button/Button';
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
        <h2 className={styles.contentHeader}>RandomRecipe</h2>
        <button>
          <GiPerspectiveDiceSixFacesRandom />
          REROLL
        </button>
        <SkeletonCard type="wide" background="white" hasSummary={true} headingPosition="bottomLeft" />
      </section>
    );
  }
  if (error) {
    return <div>An error occurred while loading food.</div>;
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.contentHeader}>RandomRecipe</h2>
      <button
        className="randomButton"
        onClick={() => {
          getData();
        }}
      >
        <GiPerspectiveDiceSixFacesRandom />
        REROLL
      </button>
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
