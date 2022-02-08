import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { DataContext } from '../contexts/dataProvider'
import CountryMap from './CountryMap'
import StateMap from './StateMap'
import CountryData from './CountryData'
import StateData from './StateData'
import '../css/styles.css'

function State() {
    const { setSelectedState, setStateCombinedData, toggleCountryView, resetState, homeButton } = useContext(DataContext)


    const aboutMap = (
        <li className='about-map'>
            <p>The more red a county appears on the map, the higher the percentage of that area's population is vaccinated.</p>
            <p>The more green each area appears, the lower the percentage of the population is vaccinated.</p>
        </li> 
    )

    const footer = (
        <footer>
            <p>COVID data courtesy of 
                <a href='https://covidactnow.org'> Covid Act Now</a>
            </p>
            <p>Coordinates data courtesy of 
                <a href='https://www.opendatasoft.com/'> opendatasoft</a>
            </p>
        </footer>
    )

    return (
        <div className='home'>
            <div id='home-page-title'>
                <h1>Welcome</h1>
            </div>
            
        <ul className='main-content'>
            <li className='data-block'><StateData /></li>
            <Link to='/state'>
                <button onClick={resetState}>Go back to state selection</button>
            </Link>
            <Link to='/'>
                <button onClick={homeButton}>Back to home</button>
            </Link>
        </ul>

        <StateMap />
        {aboutMap}
        {footer}
        </div> 
    )
}

export default State