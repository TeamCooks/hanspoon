import { useEffect, useState } from 'react';
import { Card } from '../Card/Card';
import { Button } from '../Button/Button';
import { getRandomRecipe } from '@api/requestData';

export function RandomRecipe() {
  const [title, setTitle] = useState('');
  const [summaryText, setSummaryText] = useState('');
  const [image, setImage] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function getData() {
    try {
      setLoading(true);

      const { recipes } = await getRandomRecipe();
      const { title, summary, image } = recipes[0];
      setTitle(title);
      setSummaryText(summary);
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
      <section>
        <h2 className="content-header">RandomRecipe</h2>
        <button>REROLL</button>
        <Card
          type="wide"
          background="white"
          summary={true}
          headingPosition="bottomLeft"
          imgSrc="http://placehold.it/312x230"
          foodName="loading.."
          summaryText="loading.."
        />
      </section>
    );
  }
  if (error) {
    return <div>An error occurred while loading food.</div>;
  }

  return (
    <section>
      <h2 className="content-header">RandomRecipe</h2>
      <button
        onClick={() => {
          getData();
        }}
      >
        REROLL
      </button>
      <Card
        type="wide"
        background="white"
        summary={true}
        headingPosition="bottomLeft"
        imgSrc={image}
        foodName={title}
        summaryText={summaryText}
      />
    </section>
  );
}
