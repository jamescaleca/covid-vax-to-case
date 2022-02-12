import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { round } from 'mathjs'

import { DataContext } from '../contexts/dataProvider'
import StateMap from './StateMap'
import StateData from './StateData'
import '../css/styles.css'

function State() {
    const { 
        resetState, 
        homeButton, 
        stateCombinedData, 
        aboutMap, 
        mapFooter,
        allStatesAbbrevArr,
        selectedState
    } = useContext(DataContext)

    const [ mappedData, setMappedData ] = useState([])
    // const [ coords, setCoords ] = useState([])

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
        // function stateCoords() {
        //     const filterCoords = allStatesAbbrevArr.filter(state => state.state === selectedState)
        //     // console.log(filterCoords)
        //     return setCoords(filterCoords)
        // }
        
        mapHeatMapData()
        // stateCoords()
    }, [ stateCombinedData, allStatesAbbrevArr, selectedState ])

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

            
                <StateMap mappedData={mappedData}   />
                
            
                
                
            

            {aboutMap}
            {mapFooter}
        </div> 
    )
}

export default State