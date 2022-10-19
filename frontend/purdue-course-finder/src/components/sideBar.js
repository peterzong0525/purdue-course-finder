import React, { useState } from 'react';
import './sideBar.css';
import PropTypes from 'prop-types';




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

    return(
        <div className = "sideBarContainer">
            <h1>Purdue Course Finder</h1>
            {ListofItems}
        </div>
    );
}

export default SideBar;

function ListItem(props) {
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
