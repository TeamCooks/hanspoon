import PropTypes from 'prop-types';
import styles from './Badge.module.scss';
import { ReactComponent as DairyFree } from './../../assets/icons/dairyFree.svg';
import { ReactComponent as LactoOvo } from './../../assets/icons/lactoOvo.svg';
import { FaLeaf, FaFish } from 'react-icons/fa';
import { GiThreeLeaves, GiGrain, GiMeat, GiMuscleUp } from 'react-icons/gi';
import { BsStars } from 'react-icons/bs';
import React from 'react';
import classNames from 'classnames';

const STATE = {
  dairyFree: 'dairy-free',
  lactoOvo: 'lacto-ovo',
  lactoOvoVegetarian: 'lacto-ovo',
  vegetarian: 'vegetarian',
  vegan: 'vegan',
  glutenFree: 'gluten-free',
  popular: 'popular',
  paleolithic: 'paleo',
  paleo: 'paleo',
  primal: 'primal',
  healthy: 'healthy',
  pescatarian: 'pescatarian',
};

const renderIcon = (state) => {
  const {
    dairyFree,
    lactoOvo,
    lactoOvoVegetarian,
    vegetarian,
    vegan,
    glutenFree,
    popular,
    paleolithic,
    paleo,
    primal,
    healthy,
    pescatarian,
  } = STATE;

  switch (state) {
    case dairyFree:
      return <DairyFree />;
    case lactoOvo:
      return <LactoOvo />;
    case lactoOvoVegetarian:
      return <LactoOvo />;
    case vegetarian:
      return <FaLeaf />;
    case vegan:
      return <GiThreeLeaves />;
    case glutenFree:
      return <GiGrain />;
    case popular:
      return <BsStars />;
    case paleolithic:
      return <GiMeat />;
    case paleo:
      return <GiMeat />;
    case primal:
      return <GiMeat />;
    case healthy:
      return <GiMuscleUp />;
    case pescatarian:
      return <FaFish />;
    default:
      return null;
  }
};

export function Badge({ state, size, className }) {
  return (
    <div className={classNames(styles.badge, styles[state], styles[size], className)}>
      {renderIcon(STATE[state])}
      <span>{STATE[state]}</span>
    </div>
  );
}

Badge.propTypes = {
  state: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['small', 'large']).isRequired,
};
