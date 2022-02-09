import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { DataContext } from '../contexts/dataProvider'
import StateMap from './StateMap'
import StateData from './StateData'
import { round } from 'mathjs'
import '../css/styles.css'

function State() {
    const { resetState, homeButton, stateCombinedData } = useContext(DataContext)

    const [ mappedData, setMappedData ] = useState([])

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

    useEffect(() => {
        function mapHeatMapData() {
            const mappedCountiesData = stateCombinedData.map(county => {
                return {
                    lat: county.coordinates[1],
                    lng: county.coordinates[0],
                    weight: round( county.vaxCompleted / 
                        county.population * 100, 2)
                }
            })
            return setMappedData(mappedCountiesData)
        }
        mapHeatMapData()
    }, [ stateCombinedData ])

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

            <StateMap mappedData={mappedData} />
            {aboutMap}
            {footer}
        </div> 
    )
}

export default State