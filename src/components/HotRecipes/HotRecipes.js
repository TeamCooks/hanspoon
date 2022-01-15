import { Card } from '../Card/Card';
import styles from './HotRecipes.module.scss';

export function HotRecipes() {
  return (
    <section className={styles.section}>
      <h2 className={styles.contentHeader}>HotRecipes</h2>
      <ul className={styles.cardItems}>
        <li>
          <Card
            type="wide"
            background="none"
            hasSummary={false}
            headingPosition="bottomCenter"
            imgSrc="http://placehold.it/312x230"
            title="Easy Strawberry Cake"
            summary={`Cream Sherry, Moscato d'Asti, and Port are great choices  ...`}
          />
        </li>
        <li>
          <Card
            type="wide"
            background="none"
            hasSummary={false}
            headingPosition="bottomCenter"
            imgSrc="http://placehold.it/312x230"
            title="Easy Strawberry Cake"
            summary={`Cream Sherry, Moscato d'Asti, and Port are great choices  ...`}
          />
        </li>
        <li>
          <Card
            type="wide"
            background="none"
            hasSummary={false}
            headingPosition="bottomCenter"
            imgSrc="http://placehold.it/312x230"
            title="Easy Strawberry Cake"
            summary={`Cream Sherry, Moscato d'Asti, and Port are great choices  ...`}
          />
        </li>
        <li>
          <Card
            type="wide"
            background="none"
            hasSummary={false}
            headingPosition="bottomCenter"
            imgSrc="http://placehold.it/312x230"
            title="Easy Strawberry Cake"
            summary={`Cream Sherry, Moscato d'Asti, and Port are great choices  ...`}
          />
        </li>
        <li>
          <Card
            type="wide"
            background="none"
            hasSummary={false}
            headingPosition="bottomCenter"
            imgSrc="http://placehold.it/312x230"
            title="Easy Strawberry Cake"
            summary={`Cream Sherry, Moscato d'Asti, and Port are great choices  ...`}
          />
        </li>
        <li>
          <Card
            type="wide"
            background="none"
            hasSummary={false}
            headingPosition="bottomCenter"
            imgSrc="http://placehold.it/312x230"
            title="Easy Strawberry Cake"
            summary={`Cream Sherry, Moscato d'Asti, and Port are great choices  ...`}
          />
        </li>
      </ul>
    </section>
  );
}
