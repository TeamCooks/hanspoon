import { Helmet } from 'react-helmet-async';
import { setDocumentTitle } from '../../utils';
import { Header, RandomRecipe, HotRecipes, Footer } from '../../components/index';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>{setDocumentTitle('홈')}</title>
      </Helmet>
      <RandomRecipe />
      <HotRecipes />
    </>
  );
}
