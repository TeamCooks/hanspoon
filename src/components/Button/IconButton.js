import PropTypes from 'prop-types';
import buttonStyle from './Button.module.scss';
import iconButtonStyle from './IconButton.module.scss';
import classNames from 'classnames';
import { FiSearch } from 'react-icons/fi';
import { BsPersonCircle, BsCartCheckFill, BsLink45Deg, BsBookmark, BsFillBookmarkFill } from 'react-icons/bs';
import { HiHeart } from 'react-icons/hi';
import { MdClose } from 'react-icons/md';

const STATE = {
  search: 'search',
  user: 'user',
  heart: 'heart',
  close: 'close',
  cart: 'cart',
  link: 'link',
  bookmark: 'bookmark',
  bookmarkFill: 'bookmarkFill',
};

const renderButtonIcon = (state) => {
  const { search, user, heart, close, cart, link, bookmark, bookmarkFill } = STATE;

  switch (state) {
    case search:
      return <FiSearch />;
    case user:
      return <BsPersonCircle />;
    case heart:
      return <HiHeart />;
    case close:
      return <MdClose />;
    case cart:
      return <BsCartCheckFill />;
    case link:
      return <BsLink45Deg />;
    case bookmarkFill:
      return <BsFillBookmarkFill />;
    case bookmark:
      return <BsBookmark />;
    default:
  }
};

export function IconButton({ ariaLabel, state, type, variant, color, size, shape, className, ...restProps }) {
  return (
    <button
      aria-label={ariaLabel}
      type={type}
      className={classNames(
        buttonStyle[variant],
        buttonStyle[color],
        iconButtonStyle.iconButton,
        iconButtonStyle[size],
        iconButtonStyle[shape],
        className,
      )}
      {...restProps}
    >
      {renderButtonIcon(state)}
    </button>
  );
}

IconButton.propTypes = {
  ariaLabel: PropTypes.string.isRequired,
  state: PropTypes.oneOf(Object.keys(STATE)).isRequired,
  type: PropTypes.oneOf(['button', 'submit']).isRequired,
  variant: PropTypes.oneOf(['default', 'outlined', 'filled']).isRequired,
  color: PropTypes.oneOf(['green', 'orange', 'white']),
  size: PropTypes.oneOf(['small', 'large']),
  shape: PropTypes.oneOf(['circle']),
};
