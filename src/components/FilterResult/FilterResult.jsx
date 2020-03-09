import React from 'react';
import PropTypes from 'prop-types';

const FilterResult = props => {
  const showImages = () => props.filteredTanks.map(tank =>
    <div className="col-xs-6 col-sm-6 col-md-3 col-lg-3 text-center" key={tank.id}>
      <img
        className="img-thumbnail rounded tank-img-dimension"
        data-toggle="tooltip" alt={tank.name} title={tank.name} src={tank.img}
      />
      <div>{tank.name}</div>
    </div>);

  return (
    <div className="">
      <div className="text-center tags-area">
        {(props.selections.type !== null)
          ? <span className="selection-tags"> {props.selections.type}</span> : null}
        {(props.selections.country !== null)
          ? <span className="selection-tags">{props.selections.country}</span> : null}
        {(props.selections.name !== null)
          ? <span className="selection-tags">{props.selections.name}</span> : null}
        {(props.selections.ammunition !== null)
          ? <span className="selection-tags">{props.selections.ammunition}</span> : null}
      </div>
      {(props.selections.type !== null || props.selections.country !== null
         || props.selections.name !== null || props.selections.ammunition !== null)
        ? <div className="divider" /> : null}
      <div className="images-container row">{showImages()}</div>
    </div>
  );
};

FilterResult.propTypes = {
  selections: PropTypes.objectOf(PropTypes.string).isRequired,
  filteredTanks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FilterResult;
