import PropTypes from 'prop-types';
import buttonStyle from './Button.module.scss';
import classNames from 'classnames';

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

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit']).isRequired,
  variant: PropTypes.oneOf(['text', 'outlined', 'filled']).isRequired,
  shape: PropTypes.oneOf(['wide', 'round']),
  size: PropTypes.oneOf(['small', 'large']),
  color: PropTypes.oneOf(['green', 'orange', 'white']),
  children: PropTypes.any.isRequired,
};
