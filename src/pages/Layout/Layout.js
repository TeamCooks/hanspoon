import { Outlet } from 'react-router-dom';
import { Wrapper } from './Wrapper';
import { Header } from './../../components';

export default function Layout() {
  return (
    <>
      <Header />
      <Wrapper className="main">
        <Outlet />
      </Wrapper>
    </>
  );
}
