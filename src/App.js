import { useRoutes, Navigate } from 'react-router-dom';
import { Suspense } from 'react';
import { lazyComponent } from './utils/lazyComponent';
import './styles/index.scss';
import './styles/global.scss';
import Layout from './pages/Layout/Layout';
import Home from './pages/Home/Home';
import { Detail } from './components/Detail/Detail';
import { Loading } from './components';

const RequireAuth = lazyComponent('RequireAuth');
const MyRecipes = lazyComponent('MyRecipes');
const PageNotFound = lazyComponent('PageNotFound');
const Search = lazyComponent('Search');
const Example = lazyComponent('Example');

function App() {
  const routeElement = useRoutes([
    {
      element: <Layout />,
      children: [
        {
          path: '/',
          element: (
              <Home />
         ),
        },
        {
          path: 'my-recipes',
          element: (
            <Suspense fallback={<Loading message="Start loading" />}>
              <RequireAuth>
                <MyRecipes />
              </RequireAuth>
            </Suspense>
          ),
        },
        {
          path: 'page-not-found',
          element: (
            <Suspense fallback={<Loading message="Start loading" />}>
              <PageNotFound />
            </Suspense>
          ),
        },
        {
          path: '*',
          element: (
            <Suspense fallback={<Loading message="Start loading" />}>
              <Navigate to="page-not-found" replace />
            </Suspense>
          ),
        },
        { path: 'detail', element: <Detail /> },
        {
          path: 'search/:keyword',
          element: (
            <Suspense fallback={<Loading message="Start loading" />}>
              <Search />
            </Suspense>
          ),
        },
        { path: 'example', element: <Example /> },
      ],
    },
  ]);
  return routeElement;
}
export default App;
