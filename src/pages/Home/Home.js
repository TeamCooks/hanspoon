import { Helmet } from 'react-helmet-async';
import { setDocumentTitle } from '../../utils';
import { Header, RandomRecipe, HotRecipes, Footer } from '../../components/index';
import styles from './Home.module.scss';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>{setDocumentTitle('home')}</title>
      </Helmet>
      <section className={styles.section}>
        <RandomRecipe />
        <HotRecipes />
      </section>
    </>
  );
}
