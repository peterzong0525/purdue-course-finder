import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './favorites.css'
import PropTypes from 'prop-types';


function Favorites() {
    const navigate = useNavigate();
    
    useEffect(() => {
        if (window.sessionStorage.getItem("userToken") === null) {
            //user is not logged in, redirect to /login
            navigate('/login');
            return;
        }
    }, [])





    function ListItem(props) {
        ListItem.propTypes = {
            itemHead: PropTypes.string,
            firstRow: PropTypes.string,
            dataType: PropTypes.string,
            dataID: PropTypes.string,
        };


        return(
            <div className = "listItem" >
                <div className = "listItemInfo" style={{padding: "0 10px 10px 10px"}}>
                    <h2 className = "ItemHead" style={{margin: "0"}}>
                        {props.itemHead}
                    </h2>
                    <p className = "firstRow" style={{margin: "5px 0 0 0"}}>
                        {props.firstRow}
                    </p>
                </div>
                <div className = "listItemDelete">
                    <div className = "removeTxt">REMOVE</div>                   
                </div>

            </div>
        );
    }
  
  return (
    <div className = "favoritesPageContainer">
        <div className='returnHomeContainer'>
            <a className='returnHome' href='/'>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="Black" className="bi bi-arrow-left" viewBox="0 0 20 6">
                    <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"></path>
                </svg>
                Home
            </a>
        </div>
        <div className = "header">
            <h1>My Favorites</h1>
        </div>
        <div className = "favoritesContainer">
            <div className = "favList">
                <div className = "favListHeader">
                    <h2>Buildings</h2>
                </div>
                <div className = "listItemContainer">
                    <ListItem 
                        itemHead = "SHORTCODE"
                        firstRow = "Short building name"/>
                    <ListItem 
                        itemHead = "SHORTCODE"
                        firstRow = "Extremely long building name that takes up multiple lines"/>
                </div>
            </div>
            <div className = "favList">
                <div className = "favListHeader">
                    <h2>Classrooms</h2>
                </div>
                <div className = "listItemContainer">

                </div>
            </div>
            <div className = "favList">
                <div className = "favListHeader">
                    <h2>Courses</h2>
                </div>
                <div className = "listItemContainer">
                    <ListItem 
                        itemHead = "Subject Number"
                        firstRow = "Course Name"/>
                </div>
            </div>
            <div className = "favList">
                <div className = "favListHeader">
                    <h2>Sections</h2>
                </div>
                <div className = "listItemContainer">
                    <ListItem 
                        itemHead = "Type - Number"
                        firstRow = "Course: Subject Number"/>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Favorites;