import PropTypes from 'prop-types';
import { useEffect } from 'react';
import LoadingIcons from 'react-loading-icons';

const loadingStartNode = document.getElementById('loading-start');
const loadingEndNode = document.getElementById('loading-end');

/* -------------------------------------------------------------------------- */
/* Loading                                                                    */
/* -------------------------------------------------------------------------- */

export function Loading({ message, background }) {
  useEffect(() => {
    loadingStartNode.setAttribute('role', 'alert');
    loadingStartNode.insertAdjacentHTML('beforeend', /* html */ `<span class="a11yHidden">${message}</span>`);

    return () => {
      loadingStartNode.removeAttribute('role');
      loadingStartNode.innerHTML = '';

      loadingEndNode.insertAdjacentHTML('beforeend', /* html */ `<span class="a11yHidden">Finished loading.</span>`);
      setTimeout(() => (loadingEndNode.innerHTML = ''), 800);
    };
  }, [message]);

  return (
    <>
      {background ? (
        <div
          style={{
            zIndex: '300',
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            background: 'rgba(36, 36, 36, 0.8)',
            backdropFilter: 'blur(3px)',
            minHeight: '100%',
          }}
        />
      ) : null}
      <LoadingIcons.ThreeDots
        fill="#e56a18"
        height="1em"
        style={{
          zIndex: '400',
          position: 'fixed',
          top: '50vh',
          transform: 'translate(-50%, -50%)',
          left: '50vw',
        }}
      />
    </>
  );
}

Loading.propTypes = {
  message: PropTypes.string.isRequired,
  background: PropTypes.bool,
};
