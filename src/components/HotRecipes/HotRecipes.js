import { Card } from '../Card/Card';

export function HotRecipes() {
  return (
    <section>
      <h2>HotRecipes</h2>
      <Card
        type="wide"
        background="none"
        summary={false}
        headingPosition="bottomCenter"
        imgSrc="http://placehold.it/312x230"
        foodName="Easy Strawberry Cake"
        summaryText={`Cream Sherry, Moscato d'Asti, and Port are great choices  ...`}
      />
    </section>
  );
}
