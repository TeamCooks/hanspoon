import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
export default function Layout() {
  return (
    <div className="error">
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
      </ul>
      <Outlet />
    </div>
  );
}
