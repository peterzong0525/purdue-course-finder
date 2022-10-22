import React, { useState } from 'react';
import './sideBar.css';
import PropTypes from 'prop-types';
import {populateSidebar} from './fillSidebar.js';
import searchIcon from '../tutorial_images/search-icon.png'


function SideBar() {
    function setItem(itemHead_in, firstRow_in, secondRow_in) {
        return(
            <ListItem key = {itemHead_in + firstRow_in + secondRow_in}
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
                //console.log(document.getElementById('filter_option').value);
            }
        }
    }

    return(
        <div className = "sideBarContainer">
            <div className = 'header'>
                <h1 style={{fontSize:'2vw'}}>Purdue Course Finder</h1>
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
                    <a href="#SideBarFilter" className="button">
                        <button type='submit'>Filter</button>
                    </a>
                    <button style={{marginLeft: 'auto'}} type='submit'>Advanced Search</button>
                </div>
                <hr></hr>
            </div>
            <div className='listOfItems'>
                {ListofItems}
            </div>
            {populateSidebar('Course','MA')}

            <div className="popup_overlay" id="SideBarFilter">
                <div className="popup_wrapper">
                    <h2>Change Filter</h2>
                    {/* eslint-disable-next-line */}
                    <a href="/" className="close">&times;</a>
                    <div className="content">
                        <div className="popup_container">
                            <form>
                                <div className="popup_box">
                                    <input type="radio" id="building" name="filter_option" />
                                    <label className="text">Building</label>
                                    <p>&nbsp;</p>

                                    <input type="radio" id="classroom" name="filter_option" />
                                    <label className="text">Classroom</label>
                                    <p>&nbsp;</p>

                                    <input type="radio" id="course" name="filter_option" />
                                    <label className="text">Course</label>
                                    <p>&nbsp;</p>

                                    <input type="radio" id="section" name="filter_option" />
                                    <label className="text">Section</label>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
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
