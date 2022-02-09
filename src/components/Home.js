import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { DataContext } from '../contexts/dataProvider'
import CountryMap from './CountryMap'
import CountryData from './CountryData'
import { round } from 'mathjs'
import '../css/styles.css'

function Home() {
    const { countryData, toggleCountryView, allStatesData } = useContext(DataContext)

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
            const mappedStatesData = allStatesData.map(state => {
                return {
                    lat: state.coordinates[0].lat,
                    lng: state.coordinates[0].lng,
                    weight: round( state.vaxCompleted / 
                        state.population * 100, 2 )
                }
            })
            return setMappedData(mappedStatesData)
        }
        mapHeatMapData()
    }, [allStatesData])

    return (
        <div className='home'>
            <div id='home-page-title'>
                <h1>Welcome</h1>
            </div>
            <Link to='/state'>
                <button onClick={() => toggleCountryView()}>
                    View a specific state
                </button>
            </Link>
            { countryData === {} ? <h1>Loading...</h1> :
                <ul className='main-content'>
                    <li className='data-block'><CountryData /></li>
                </ul>
            }
            <CountryMap mappedData={mappedData}/>
            {aboutMap}
            {footer}
        </div>
    )
}

export default Home