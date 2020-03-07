import React, { Component } from 'react';
import Dropdown from './components/Dropdown';
import FilterResult from './components/FilterResult';
import Button from './components/Button';
import TestApi from '../api/index.js';
import './scss/styles.scss';
import Header from './components/Header';

class App extends Component {
   state = {
     tanks: [],
     tanksFilter: ['type', 'country', 'name'],
     showTanks: false,
     optionData: {},
     selections: {
       type: null,
       name: null,
       country: null,
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
       },
       displayData: [],
     });
   }

   setData = () => {
     let optionData = {};
     let tanks = this.state.tanks;
     this.state.tanksFilter.map(data => {
       const resp = [...new Set(tanks.map(tank => tank[data]))];
       optionData[data] = resp;
     });
     this.setState({ optionData });
   }

   removeDuplicates = data => [...new Set(data)];

   getDataToDisplay = (name, tanks) => tanks.filter(tank => tank.name == name)

   getOtherFilters = (selected, current) => this.state.tanksFilter
     .filter(filter => filter !== selected && filter !== current);

   refreshOptions = (optionSelected, event) => {
     if (this.state.tanksFilter.includes(event.target.value)) {
       this.resetForm();
     } else {
       let { selections } = this.state;
       selections[optionSelected] = event.target.value;
       let { tanks } = this.state;
       let allFilteredObjects = [];
       let newOptionData = { ...this.state.optionData };
       this.state.tanksFilter.forEach(key => {
         if (key != optionSelected) {
           const comboFilter = this.getOtherFilters(optionSelected, key);
           allFilteredObjects = tanks.filter(tank =>
             selections[comboFilter] ? tank[optionSelected] === event.target.value
             && tank[comboFilter] === selections[comboFilter]
               : tank[optionSelected] == event.target.value).map(item => item[key]);
           newOptionData[key] = this.removeDuplicates(allFilteredObjects);
         }
         if (key == 'name') {
           let displayData = [];
           allFilteredObjects.map(name => {
             displayData.push(...this.getDataToDisplay(name, tanks));
           });
           this.setState({
             displayData,
           });
         }
       });
       this.setState({
         optionData: newOptionData,
         selections,
       });
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
