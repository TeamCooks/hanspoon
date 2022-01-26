import { oneOf, any, string } from 'prop-types';

const BUTTON_TYPES = {
  type: oneOf(['button', 'submit']).isRequired,
  variant: oneOf(['text', 'outlined', 'filled']).isRequired,
  shape: oneOf(['wide', 'round']),
  size: oneOf(['small', 'large']),
  color: oneOf(['green', 'orange', 'white']),
  children: any.isRequired,
};

const ICONBUTTON_STATE = {
  search: 'search',
  user: 'user',
  heart: 'heart',
  close: 'close',
  cart: 'cart',
  link: 'link',
  bookmark: 'bookmark',
  bookmarkFill: 'bookmarkFill',
};

const ICONBUTTON_TYPES = {
  ariaLabel: string.isRequired,
  state: oneOf(Object.keys(ICONBUTTON_STATE)).isRequired,
  variant: oneOf(['default', 'outlined', 'filled']).isRequired,
  shape: oneOf(['circle']),
};

export { BUTTON_TYPES, ICONBUTTON_TYPES, ICONBUTTON_STATE };
