import buttonStyle from './Button.module.scss';
import iconButtonStyle from './IconButton.module.scss';
import classNames from 'classnames';
import { BUTTON_TYPES, ICONBUTTON_TYPES, ICONBUTTON_STATE } from './button.types';
import { FiSearch } from 'react-icons/fi';
import { FaArrowUp } from 'react-icons/fa';
import { BsPersonCircle, BsCartCheckFill, BsLink45Deg, BsBookmark, BsFillBookmarkFill } from 'react-icons/bs';
import { HiHeart } from 'react-icons/hi';
import { MdClose } from 'react-icons/md';

const renderButtonIcon = (state) => {
  const { search, user, heart, close, cart, link, bookmark, bookmarkFill, up } = ICONBUTTON_STATE;

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
    case up:
      return <FaArrowUp />;
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

const { type, size, color } = BUTTON_TYPES;
const { ariaLabel, state, variant, shape } = ICONBUTTON_TYPES;

IconButton.propTypes = {
  ariaLabel,
  state,
  type,
  variant,
  color,
  size,
  shape,
};
