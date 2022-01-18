import PropTypes from 'prop-types';
import { useEffect } from 'react';
import LoadingIcons from 'react-loading-icons';

const loadingStartNode = document.getElementById('loading-start');
const loadingEndNode = document.getElementById('loading-end');

/* -------------------------------------------------------------------------- */
/* Loading                                                                    */
/* -------------------------------------------------------------------------- */

export function Loading({ message }) {
  useEffect(() => {
    loadingStartNode.setAttribute('role', 'alert');
    loadingStartNode.insertAdjacentHTML('beforeend', /* html */ `<span class="a11yHidden">${message}</span>`);

    return () => {
      loadingStartNode.removeAttribute('role');
      loadingStartNode.innerHTML = '';

      loadingEndNode.insertAdjacentHTML(
        'beforeend',
        /* html */ `<span class="a11yHidden">Finished loading.</span>`,
      );
      setTimeout(() => (loadingEndNode.innerHTML = ''), 800);
    };
  }, [message]);

  return (
    <LoadingIcons.ThreeDots
      fill="#EC7B30"
      height="1em"
      style={{
        position: 'fixed',
        top: '50vh',
        transform: 'translate(-50%, -50%)',
        left: '50vw',
      }}
    />
  );
}

Loading.propTypes = {
  message: PropTypes.string.isRequired,
};
