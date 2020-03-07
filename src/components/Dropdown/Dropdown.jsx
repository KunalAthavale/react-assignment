import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const Dropdown = props => (
  <div className="dropdown col">
    <select onChange={event => props.changed(props.type, event)}>
      <option>{props.type}</option>
      {props.dropdownOptions.map(option =>
        <option
          value={option}
          key={option}
        >
          {option}
        </option>)}
    </select>
  </div>
);

Dropdown.propTypes = {
  selections: PropTypes.shape({}).isRequired,
  type: PropTypes.string.isRequired,
  changed: PropTypes.func.isRequired,
  dropdownOptions: PropTypes.arrayOf(PropTypes.string),
};

export default Dropdown;
