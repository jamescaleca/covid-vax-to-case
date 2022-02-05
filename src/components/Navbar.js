import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { DataContext } from '../contexts/dataProvider'
import '../css/styles.css'
import { round } from 'mathjs'

export default function Navbar() {
    const { 
        setSelectedState,
        countryView,
        diffStateView,
        setDiffStateCombinedData,
        toggleCountryView, 
        toggleDiffStateView,
        allStatesAbbrevArr,
    } = useContext(DataContext)
    // const { user: { username, countyRes, stateRes}, logout } = useContext(UserContext)

    function handleStateChange(e) {
        const { value } = e.target
        axios
            .get(`https://api.covidactnow.org/v2/county/${value}.timeseries.json?apiKey=`)
            .then(res => {
                if(diffStateView === false){
                    toggleDiffStateView()
                }
                if(countryView === true){
                    toggleCountryView()
                }
                setSelectedState(value)
                
                res.data.map(county => {
                    return setDiffStateCombinedData(prevState => ([
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
        
        combineDiffStateCoordsCovid(e)
    }

    function combineDiffStateCoordsCovid(e) {
        const { value } = e.target
        axios
            .get(`https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-county-boundaries&q=&rows=300&refine.stusab=${value}`)
            .then(res => 
                setDiffStateCombinedData(prevState => {
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

    // useEffect(() => {
    //     getDiffStateData()
    //     handleStateChange()
    //     combineDiffStateCoordsCovid()
    // }, [getDiffStateData, handleStateChange, combineDiffStateCoordsCovid])

    return (
        <div id='navbar'>
            <button onClick={logout}>Logout</button>
            {countryView === true ? 
                <>
                    <button onClick={() => toggleCountryView()}>
                        View your state and county
                    </button>
                </> :
                <>
                    <button onClick={() => toggleCountryView()}>View the country</button>
                </>
            }
            
            {/* {countryView === true ? 
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
                </div> :
                <div>
                    <label htmlFor='stateSelect'>View another state:</label>
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
                </div>
            } */}
            <p><i>{username}</i> - {countyRes.county}, {stateRes}</p>
        </div>
    )
}