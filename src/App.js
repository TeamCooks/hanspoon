import { useRoutes, Navigate } from 'react-router-dom';
import { Suspense } from 'react';
import { lazyComponent } from './utils/lazyComponent';
import './styles/index.scss';
import './styles/global.scss';

const Home = lazyComponent('Home');
const Layout = lazyComponent('Layout');
const Authorized = lazyComponent('Authorized');
const PageNotFound = lazyComponent('PageNotFound');

function App() {
  const routeElement = useRoutes([
    {
      element: <Layout />,
      children: [
        { path: '/', element: <Home /> },
        { path: 'search', element: <div>검색결과 페이지입니다. 페이지 파일 만들어야 합니다.</div> },
        { path: 'my-recipes', element: <Authorized /> },
        { path: 'page-not-found', element: <PageNotFound /> },
        { path: '*', element: <Navigate to="page-not-found" replace /> },
      ],
    },
  ]);

  return <Suspense fallback={<h2>로딩중입니다 로딩 컴포넌트를 만들어야 합니다.</h2>}>{routeElement}</Suspense>;
}
export default App;
