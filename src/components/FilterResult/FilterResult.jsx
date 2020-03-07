import React from 'react';
import PropTypes from 'prop-types';

const FilterResult = props => {
  //const showAmmunitions = () =>
  //tank.ammunition.map(ammunitionType => <span key={ammunitionType}>ammunition{ammunitionType}</span>);
  const showImages = () => props.filteredTanks.map(tank =>
    <div className="col-xs-6 col-sm-6 col-md-3 col-lg-3 text-center"><img className="img-thumbnail rounded tank-img-dimension" data-toggle="tooltip" title={tank.name} src={tank.img} />{tank.name}</div>);

  return (
    <div className="">
      <div className="text-center tags-area">
        {(props.selections.type !== null) ? <span className="selection-tags">
          {props.selections.type}
        </span> : null}
        {(props.selections.country !== null) ? <span className="selection-tags">
          {props.selections.country}
        </span> : null}
        {(props.selections.name !== null) ? <span className="selection-tags">
          {props.selections.name}
        </span> : null}
      </div>
      {(props.selections.type !== null || props.selections.country || props.selections.name !== null) ? <div className="divider"></div> : null}

      <div className="images-container row" >{showImages()}</div>
    </div>
  );
};

FilterResult.propTypes = {
  selections: PropTypes.objectOf(PropTypes.string).isRequired,
  filteredTanks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FilterResult;
