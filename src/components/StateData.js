import React, { useContext } from 'react'
import { round } from 'mathjs'
import { DataContext } from '../contexts/dataProvider'

export default function StateData() {
    const { stateCombinedData, selectedState, allStatesData } = useContext(DataContext)

    let currentState = allStatesData.filter(state => 
        selectedState === state.name
    )

    return (
        <>
        {stateCombinedData.length > 0 ?
            <ul id='state-data-ul' style={{listStyle: 'none'}}>
                <li>
                    <h2>Data for {selectedState}:</h2>
                </li>
                <li>Population: <b>{currentState[0].population.toLocaleString()}</b></li>
                <li>
                    Vaccinations completed: <b>{currentState[0].vaxCompleted.toLocaleString()}</b>
                </li>
                <li>
                    Total cases: <b>{currentState[0].cases.toLocaleString()}</b>
                </li>
                <li>
                    Percentage of population fully vaccinated: 
                    <b> {' '}
                        {round(currentState[0].vaxCompleted / 
                            currentState[0].population * 100, 2)
                        }%
                    </b>
                </li>
            </ul> : null
        }
        </>
    )
}