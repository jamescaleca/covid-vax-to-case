import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'
import { round } from 'mathjs'

import StateButton from './StateButton'
import { DataContext } from '../contexts/dataProvider'

export default function StateSelector(){
    const { 
        statePlaceholder, 
        selectedState, 
        countryView, 
        toggleCountryView, 
        setSelectedState,
        setStateCombinedData, 
        allStatesAbbrevArr, 
        homeButton 
    } = useContext(DataContext)


    let allStatesAbbrevDropDown = allStatesAbbrevArr.map(state => (
        <option key={state.state} value={`${state.state}`}>{state.state}</option>
    ))

    function handleStateChange(e) {
        const { value } = e.target
        axios
            .get(`https://api.covidactnow.org/v2/county/${value}.timeseries.json?apiKey=${process.env.REACT_APP_COVID_KEY}`)
            .then(res => {
                if(countryView === true) toggleCountryView()
                setSelectedState(value)
                res.data.map(county => {
                    return setStateCombinedData(prevState => ([
                        ...prevState,
                        {
                            county: county.county,
                            show: false,
                            vaxCompleted: county.actuals.vaccinationsCompleted,
                            population: county.population,
                            percentVaxxed: round(
                                county.actuals.vaccinationsCompleted / 
                                county.population * 100, 2
                            ),
                            coordinates: []
                        }
                    ]))
                })
            })
            .catch((err) => {if(err) console.log(err)})
    }

    return (
        <div id='state-selector'>
            <label htmlFor='stateSelect'>Choose a state:</label>
            <select 
                defaultValue={statePlaceholder}
                name='stateSelect'
                id='stateSelect'
                value={selectedState.value}
                onChange={
                    handleStateChange
                }
            ><option value='default' hidden disabled>State</option>{allStatesAbbrevDropDown}
            </select>
            {
                selectedState !== '' ?
                <StateButton />
                : null
            }
            <Link to='/'>
                <button onClick={homeButton}>Back to home</button>
            </Link>
        </div>
    )
}