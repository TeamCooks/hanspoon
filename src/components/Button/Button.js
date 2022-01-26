import buttonStyle from './Button.module.scss';
import classNames from 'classnames';
import { BUTTON_TYPES } from './button.types';

export function Button({ type, variant, shape, size, color, className, children, ...restProps }) {
  return (
    <button
      type={type}
      className={classNames(
        buttonStyle.button,
        buttonStyle[variant],
        buttonStyle[shape],
        buttonStyle[size],
        buttonStyle[color],
        className,
      )}
      {...restProps}
    >
      {children}
    </button>
  );
}

const { type, variant, shape, size, color, children } = BUTTON_TYPES;

Button.propTypes = {
  type,
  variant,
  shape,
  size,
  color,
  children,
};
