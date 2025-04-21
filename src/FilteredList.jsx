import React, {Component} from 'react';
import {DropdownButton, MenuItem} from 'react-bootstrap'; 
import './FilteredList.css';
import List from './List';
import { type } from '@testing-library/user-event/dist/type';

class FilteredList extends Component {
    constructor(props){
        super(props);

        // The state is just the list of key/value pair (like a hashmap)
        this.state = {
        
    search: "",
    type:"All",  
        };
    }
        //Sets the state whenever the user types on the search bar  
        onSearch = (event) => {
            this.setState({search: event.target.value.trim().toLowerCase()});
        };
        onFilter = (event) => {
            this.setState({type: event.target.value})
        };
        filterItem = (item) => {
            //Checks if the current search term is contained in this item 
            const searchMatch = item.name.toLowerCase().search(this.state.search) !== -1;
            const typeMatch = item.type === this.state.type || this.state.type === "All";
            return searchMatch && typeMatch;
        };

        render(){
            return (
                <div className="filter-list">
                    <h1>Produce Search</h1>
                    <DropdownButton id="dropdown-type" title = {"Type"}>
                        <MenuItem eventKey="All" onSelect={this.onFilter}>All</MenuItem>
                        <MenuItem eventKey="Fruit" onSelect={this.onFilter}>Fruits</MenuItem>
                        <MenuItem eventKey="Vegetable" onSelect={this.onFilter}>Vegetables</MenuItem>
                    </DropdownButton>
                    <input type="text" placeholder="Search" onChange={this.onSearch}></input>
                    <List items={this.props.items.filter(this.filterItem)}/>
                    </div>
            );
        }
    }

export default FilteredList;