import React, { useState } from 'react';
import './sideBar.css';
import PropTypes from 'prop-types';
import {populateSidebar} from './fillSidebar.js';
import searchIcon from '../tutorial_images/search-icon.png'


function SideBar() {
    function setItem(itemHead_in, firstRow_in, secondRow_in) {
        return(
            <ListItem key = {itemHead_in + firstRow_in +secondRow_in}
                    itemHead = {itemHead_in}
                    firstRow = {firstRow_in}
                    secondRow = {secondRow_in}/>
        );
    }

    let ListofItems = [];
    ListofItems.push(setItem("ARMS", "Neil Armstring Hall of Engineering", ""))
    ListofItems.push(setItem("HAMP", "Delon & Elizabeth Hampton Hall of Civil Engineering", ""))
    ListofItems.push(setItem("CS 35400-LE1", "Room: PHYS 203", "Instructor: Douglas Comer"))


    const handleChange = (e) => {
        if (e.key === 'Enter') {
            let searchStr = document.getElementById('search-input').value;
            if (searchStr.trim() !== '') {
                console.log(document.getElementById('search-input').value);
                // Filter stuff
            }
        }
    }

    return(
        <div className = "sideBarContainer">
            <h1>Purdue Course Finder</h1>
            <div className='searchBar'>
                <input id = 'search-input' type="text"
                       placeholder="Search"
                       onKeyDown={handleChange}
                       autoComplete='off' />
                <img className ="searchIcon"
                     src={searchIcon}
                     onClick={() => {handleChange({key: 'Enter'})}} />
            </div>
            <div className='filterAdvanced'>
                <button type='submit'>Filter</button>
                <button style={{marginLeft: 'auto'}} type='submit'>Advanced Search</button>
            </div>
            <hr></hr>
            <div className='listOfItems'>
                {ListofItems}
            </div>
            {populateSidebar('Course','MA')}
        </div>
    );
}

export default SideBar;

export function ListItem(props) {
    ListItem.propTypes = {
        itemHead: PropTypes.string,
        firstRow: PropTypes.string,
        secondRow: PropTypes.string,
    };

    return(
        <div className = "listItemContainer">
            <h2 className = "ItemHead" style={{margin: "0"}}>
                {props.itemHead}
            </h2>
            <p className = "firstRow" style={{margin: "5px 0 0 0"}}>
                {props.firstRow}
            </p>
            {props.secondRow != "" && (
                <p className = "secondRow" style={{margin: "5px 0 0 0"}}>
                    {props.secondRow}
                </p>
            )}

        </div>
    );
}
