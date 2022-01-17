import { useRoutes, Navigate } from 'react-router-dom';
import { Suspense } from 'react';
import { lazyComponent } from './utils/lazyComponent';
import './styles/index.scss';
import './styles/global.scss';
import { SignIn } from './components/SignIn/SignIn';
import { SignUp } from './components/SignUp/SignUp';
import { Detail } from './components/Detail/Detail';

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
        { path: 'search', element: <div>검색결과 페이지입니다. 페이지 파일 만들어야 합니다.</div> },
        { path: 'my-recipes', element: <Authorized /> },
        { path: 'page-not-found', element: <PageNotFound /> },
        { path: '*', element: <Navigate to="page-not-found" replace /> },
        { path: 'detail', element: <Detail /> },
        { path: 'signin', element: <SignIn /> },
        { path: 'signup', element: <SignUp /> },
        { path: 'search/:keyword', element: <Search /> },
        { path: 'example', element: <Example /> },
      ],
    },
  ]);

  return <Suspense fallback={<h2>로딩중입니다 로딩 컴포넌트를 만들어야 합니다.</h2>}>{routeElement}</Suspense>;
}
export default App;
