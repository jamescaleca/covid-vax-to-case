import React, { useContext } from 'react'
import { UserContext } from '../contexts/userProvider'
import { DataContext } from '../contexts/dataProvider'
import Map from './Map'
import CountyResData from './CountyResData'
import CountryData from './CountryData'
import StateResData from './StateResData'
import DiffStateData from './DiffStateData'
import '../css/styles.css'

function Home() {
    // const { user: { username } } = useContext(UserContext)
    const { countyResData, stateResData, countryView, diffStateView, diffStateCoords, diffStateSelectData } = useContext(DataContext)

    const aboutMap = (
        <li className='about-map'>
            <p>The more red a county appears on the map, the higher the percentage of that area's population is vaccinated.</p>
            <p>The more green each area appears, the lower the percentage of the population is vaccinated.</p>
        </li> 
    )

    const footer = 
        <footer>
            <p>COVID data courtesy of 
                <a href='https://covidactnow.org'>Covid Act Now</a>
            </p>
            <p>Coordinates data courtesy of 
                <a href='https://www.opendatasoft.com/'>opendatasoft</a>
            </p>
        </footer>


    return (
        <>
        { countryView === false && diffStateView === false ?
            <>{ stateResData.length !== 0 && countyResData.length !== 0 ?
                <div className='home'>
                    <ul className='main-content' style={{paddingLeft: '0'}}>
                        <li className='data-block'><CountyResData /></li>
                        <li className='data-block'><StateResData /></li>
                    </ul>
                    <Map />
                    {aboutMap}
                    {footer}
                </div> : 
                <h1>Loading data...</h1>
            }</>
        : countryView === true && diffStateView === false ? 
            <div className='home'>
                <div id='home-page-title'>
                    <h1>Welcome <i>{username}</i></h1>
                </div>
                <ul className='main-content'>
                    <li className='data-block'><CountryData /></li>
                </ul>
                <Map />
                {aboutMap}
                {footer}
            </div>
        : countryView === false && diffStateView === true ?
            <>{ diffStateCoords !== [] && diffStateSelectData !== [] ? 
                <div className='home'>
                    <ul id='main-content' style={{paddingLeft: '0'}}>
                        {diffStateSelectData.length > 0 ? 
                            <li>
                                <DiffStateData />
                            </li> : null
                        }
                        <li>
                            <Map />
                        </li>
                        {aboutMap}
                    </ul>
                    {footer}
                </div> : 
                <h1>Loading data...</h1>
            }</>
        : null
        }
        </>
    )
}

export default Home