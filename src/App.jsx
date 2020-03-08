import React, { Component } from 'react';
import Dropdown from './components/Dropdown';
import FilterResult from './components/FilterResult';
import Button from './components/Button';
import TestApi from 'tank-data-api/tank-data-api';
import './scss/styles.scss';
import Header from './components/Header';
import ErrorMessage from './components/ErrorMessage';
import Spinner from './components/Spinner';

class App extends Component {
  state = {
    tanks: [],
    tanksFilter: ['type', 'country', 'name', 'ammunition'],
    isLoaded: false,
    optionData: {},
    selections: {
      type: null,
      name: null,
      country: null,
      ammunition: null,
    },
    isError: false,
    displayData: [],
  }

  componentDidMount() {
    let currentComponent = this;
    TestApi.fetchData((err, data) => {
      if (data) {
        currentComponent.setState(
          {
            tanks: data,
            isLoaded: true,
          }, () => {
            currentComponent.setData();
          },
        );
      } else {
        this.setState({
          isError: true,
        });
      }
    });
  }

  //This Function resets the dropdown selections
  resetForm = () => {
    this.setData();
    this.setState({
      selections: {
        type: null,
        name: null,
        country: null,
        ammunition: null,
      },
      displayData: [],
    });
  }

  //This function sets default dropdown options.
  setData = () => {
    let optionData = {};
    let { tanks } = this.state;
    this.state.tanksFilter.map(data => {
      if (data == 'ammunition') {
        optionData[data] = this.getAmmunitionDropDown(tanks, 'initialize');
      } else {
        optionData[data] = [...new Set(tanks.map(tank => tank[data]))];
      }
    });
    this.setState({ optionData });
  }

  getAmmunitionDropDown = (data, step) => {
    let ammuArray = [];
    data.map(item => {
      ammuArray = (step === 'initialize') ? [...ammuArray, ...item['ammunition']] : [...ammuArray, ...item];
    });
    return this.removeDuplicates(ammuArray);
  }

  removeDuplicates = data => [...new Set(data)];

  getOtherFilters = (selected, current) => this.state.tanksFilter
    .filter(filter => filter !== selected && filter !== current && filter !== 'ammunition');

  //This function updates the displayed tanks
  updateDisplayData = (selections, tanks) => {
    let selectedValues = Object.keys(selections).reduce((newObj, key) => {
      (selections[key] !== null) ? newObj[key] = selections[key] : {};
      return newObj;
    }, {});
    let displayData = tanks.reduce((reducedArray, tank) => {
      let camparisonResult = Object.keys(selectedValues).map(key =>
        (selectedValues[key] === tank[key] || tank[key].indexOf(selectedValues[key]) !== -1));
      camparisonResult.indexOf(false) === -1 ? reducedArray.push(tank) : {};
      return reducedArray;
    }, []);
    this.setState({
      displayData,
    });
  }

  //This function updates dropdown options based on other selections
  updateDropdowns = (optionSelected, selections, tanks) => {
    let allFilteredObjects = [];
    let newOptionData = { ...this.state.optionData };
    this.state.tanksFilter.forEach(key => {
      if (key != optionSelected) {
        const comboFilter = this.getOtherFilters(optionSelected, key);
        allFilteredObjects = tanks.filter(tank =>
          selections[comboFilter] ? tank[optionSelected] === selections[optionSelected]
            && tank[comboFilter] === selections[comboFilter]
            : tank[optionSelected] == selections[optionSelected]).map(item => item[key]);
        newOptionData[key] = this.removeDuplicates(allFilteredObjects);
      }
      if (key == 'ammunition') {
        newOptionData[key] = this.getAmmunitionDropDown(allFilteredObjects, 'update');
        this.setState({
          selections,
        });
      }
    });
    if (optionSelected !== 'ammunition') {
      this.setState({
        optionData: newOptionData,
        selections,
      });
    }
  }

  //This function refreshes the page based on selected options
  refreshOptions = (optionSelected, event) => {
    if (this.state.tanksFilter.includes(event.target.value)) {
      this.resetForm();
    } else {
      let { selections, tanks } = this.state;
      selections[optionSelected] = event.target.value;
      this.updateDisplayData(selections, tanks);
      this.updateDropdowns(optionSelected, selections, tanks);
    }
  }

  renderForm = () =>
    <div>
      <form>
        <div className="row row-margin">
          {this.state.tanksFilter.map(filter =>
            <Dropdown
              selections={this.state.selections}
              type={filter}
              dropdownOptions={this.state.optionData[filter] || []}
              changed={this.refreshOptions}
              key={filter}
            />)}
        </div>
        <Button resetForm={this.resetForm} />
      </form>
      <div className="divider" />
        <FilterResult
          filteredTanks={this.state.displayData}
          selections={this.state.selections}
        />
    </div>

  renderSpinner = () => <Spinner />

  renderError = () => <ErrorMessage errorMessage="No Data Found. Please refresh" />

  render() {
    return (
      <div>
        <div className="page-holder">
          <Header />
          <div className="work-area">
            {(this.state.isError)
              ? this.renderError() : (this.state.isLoaded) ? this.renderForm() : this.renderSpinner()}
          </div>
        </div>
      </div>);
  }
}

export default App;
