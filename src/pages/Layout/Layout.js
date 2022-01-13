import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Wrapper } from './Wrapper';
import { Header } from './../../components';

export default function Layout() {
  return (
    <>
      <Header />
      Layout 컴포넌트입니다. 여기에는 헤더와 푸터, 네비게이션 바가 들어와야 합니다.
      <ul className="NavLinkList">
        <li>
          <Link className="NavLink" to="/">
            홈으로
          </Link>
        </li>
        <li>
          <Link className="NavLink" to="my-recipe">
            내 레시피
          </Link>
        </li>
        <li>
          <Link className="NavLink" to="search">
            검색결과
          </Link>
        </li>
        <li>
          <Link className="NavLink" to="page-not-found">
            404페이지
          </Link>
        </li>
        <li>
          <Link className="NavLink" to="signin">
            로그인
          </Link>
        </li>
        <li>
          <Link className="NavLink" to="signup">
            회원가입
          </Link>
        </li>
        <li>
          <Link className="NavLink" to="detail">
           상세모달
          </Link>
        </li>
      </ul>
      <Wrapper className="main">
        <Outlet />
      </Wrapper>
    </>
  );
}
