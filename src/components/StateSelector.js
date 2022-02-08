import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { round } from 'mathjs'
import { DataContext } from '../contexts/dataProvider'

export default function StateSelector(){
    const { statePlaceholder, selectedState, countryView, toggleCountryView, setSelectedState, setStateCombinedData, allStatesAbbrevArr, homeButton } = useContext(DataContext)

    let allStatesAbbrevDropDown = allStatesAbbrevArr.map(state => (
        <option key={state.state} value={`${state.state}`}>{state.state}</option>
    ))

    function handleStateChange(e) {
        const { value } = e.target
        axios
            .get(`https://api.covidactnow.org/v2/county/${value}.timeseries.json?apiKey={process.env.REACT_APP_COVID_KEY}`)
            .then(res => {
                if(countryView === true){
                    toggleCountryView()
                }
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
            .then(combineDiffStateCoordsCovid(e))
            .catch((err) => {if(err) console.log(err)})
    }

    function combineDiffStateCoordsCovid(e) {
        const { value } = e.target
        axios
            .get(`https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-county-boundaries&q=&rows=300&refine.stusab=${value}`)
            .then(res => 
                setStateCombinedData(prevState => {
                    const map = {}
                    for(let i = 0; i < res.data.records.length; i++){
                        map[res.data.records[i].fields.namelsad] = res.data.records[i].geometry.coordinates
                    }
                    return prevState.map(county => {
                        return {
                            ...county,
                            coordinates: map[county.county]
                        }
                    })
                })
            )
            .catch(err => console.log(err))
    }


    return (
        <>
            <div>
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
                    <Link to={`/state/${selectedState}`}>
                        <button>
                            Click here to view heatmap and data for {selectedState}
                        </button>
                    </Link>
                    : null
                }

                <Link to='/'>
                    <button onClick={homeButton}>Back to home</button>
                </Link>
            </div>
        </>

        
    )
}