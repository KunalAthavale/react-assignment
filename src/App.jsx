import React, { Component } from 'react';
import Dropdown from './components/Dropdown';
import FilterResult from './components/FilterResult';
import Button from './components/Button';
import TestApi from 'tank-data-api/tank-data-api';
import './scss/styles.scss';
import Header from './components/Header';

class App extends Component {
  state = {
    tanks: [],
    tanksFilter: ['type', 'country', 'name', 'ammunition'],
    showTanks: false,
    optionData: {},
    selections: {
      type: null,
      name: null,
      country: null,
      ammunition: null
    },
    displayData: [],
  }

  componentDidMount() {
    let currentComponent = this;
    TestApi.fetchData((err, data) => {
      if (data) {
        currentComponent.setState(
          {
            tanks: data,
            showTanks: true,
          }, () => {
            currentComponent.setData();
          },
        );
      } else {
        console.log(err);
      }
    });
  }

  resetForm = () => {
    this.setData();
    this.setState({
      selections: {
        type: null,
        name: null,
        country: null,
        ammunition: null
      },
      displayData: [],
    });
  }

  setData = () => {
    let optionData = {};
    let tanks = this.state.tanks;
    this.state.tanksFilter.map((data) => {
      let resp = [];
      if (data == 'ammunition') {
        resp = this.getAmmunationDropDown(tanks);
      } else {
        resp = [...new Set(tanks.map((tank) => tank[data]))]
      }

      optionData[data] = resp
    });
    this.setState({ optionData });
  }

  removeDuplicates = data => [...new Set(data)];

  getAmmunationDropDown = tanks => {
    let ammuArray = [];
    tanks.map(tank => {
      ammuArray = [...ammuArray, ...tank['ammunition']];
    });
    return this.removeDuplicates(ammuArray)
  }

  getDataToDisplay = (name, tanks) => tanks.filter(tank => tank.name == name)

  getOtherFilters = (selected, current) => this.state.tanksFilter
    .filter(filter => filter !== selected && filter !== current && filter !== 'ammunition');

  updateDisplayData = (selections, tanks) => {
    let selectedValues = Object.keys(selections).reduce((newObj, key) => {
      (selections[key] !== null) ? newObj[key] = selections[key] : {};
      return newObj;
    }, {});

    let displayData = tanks.reduce((reducedArray, tank) => {
      let camparisonResult = Object.keys(selectedValues).map(key => (selectedValues[key] === tank[key] || tank[key].indexOf(selectedValues[key]) !== -1));
      (camparisonResult.indexOf(false) === -1) ? reducedArray.push(tank) : {};
      return reducedArray;
    }, []);
    this.setState({
      displayData
    });
  }

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
        let ammuArray = [];
        allFilteredObjects.map(tank => {
          ammuArray = [...ammuArray, ...tank];
        });
        newOptionData[key] = this.removeDuplicates(ammuArray)
        this.setState({
          selections
        });
      }
    });
    if (optionSelected !== 'ammunition') {
      this.setState({
        optionData: newOptionData,
        selections
      });
    }
  }

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

  getAmmunition = name => {
    if (name) {
      const { tanks } = this.state;
      return tanks.length > 0 ? tanks.find(tank => tank.name == name) : null;
    }
    return null;
  }

  render() {
    let tankFilter = null;
    if (this.state.showTanks) {
      tankFilter = (
        <div>
          <div className="page-holder">
            <Header />
            <div className="work-area">
              <form>
                <div className="row row-margin">
                  {this.state.tanksFilter.map(filter =>
                    <Dropdown
                      selections={this.state.selections}
                      type={filter}
                      dropdownOptions={this.state.optionData[filter] || []}
                      changed={(type, event) => this.refreshOptions(type, event)}
                      key={filter}
                    />)}
                </div>
                <Button resetForm={this.resetForm} />
              </form>
              <div className="divider" ></div>
              <div className="result-area">
                <FilterResult
                  filteredTanks={this.state.displayData}
                  selections={this.state.selections}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        {tankFilter}
      </div>
    );
  }
}

export default App;
