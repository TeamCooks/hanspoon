import { useRoutes, Navigate } from 'react-router-dom';
import { Suspense } from 'react';
import { lazyComponent } from './utils/lazyComponent';
import './styles/index.scss';
import './styles/global.scss';
import { Detail } from './components/Detail/Detail';
import { Loading } from './components';

const Home = lazyComponent('Home');
const Layout = lazyComponent('Layout');
const Authorized = lazyComponent('Authorized');
const PageNotFound = lazyComponent('PageNotFound');
const Search = lazyComponent('Search');
const Example = lazyComponent('Example');

function App() {
  const routeElement = useRoutes([
    {
      element: <Layout />,
      children: [
        { path: '/', element: <Home /> },
        { path: 'my-recipes', element: <Authorized /> },
        { path: 'page-not-found', element: <PageNotFound /> },
        { path: '*', element: <Navigate to="page-not-found" replace /> },
        { path: 'detail', element: <Detail /> },
        { path: 'search/:keyword', element: <Search /> },
        { path: 'example', element: <Example /> },
      ],
    },
  ]);

  return <Suspense fallback={<Loading message="Start loading" />}>{routeElement}</Suspense>;
}
export default App;
