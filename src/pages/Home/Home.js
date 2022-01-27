import { RandomRecipe, HotRecipes, Meta } from '../../components/index';
import styles from './Home.module.scss';

export default function Home() {
  const metaData = {
    title: 'Home',
  };
  return (
    <>
      <Meta data={metaData} />
      <div className={styles.section}>
        <RandomRecipe />
        <HotRecipes />
      </div>
    </>
  );
}
