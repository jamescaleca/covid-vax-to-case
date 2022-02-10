import React, { useContext } from 'react'

import { round } from 'mathjs'

import { DataContext } from '../contexts/dataProvider'

export default function StateData() {
    const { stateCombinedData, selectedState, allStatesData } = useContext(DataContext)

    let currentState = allStatesData.filter(state => 
        selectedState === state.name
    )

    const { population, vaxCompleted, cases } = currentState[0]

    return (
        <>
        {stateCombinedData.length > 0 ?
            <ul id='state-data-ul' style={{listStyle: 'none'}}>
                <li>
                    <h2>Data for {selectedState}:</h2>
                </li>
                <li>Population: <b>{population.toLocaleString()}</b></li>
                <li>
                    Vaccinations completed: <b>{vaxCompleted.toLocaleString()}</b>
                </li>
                <li>
                    Total cases: <b>{cases.toLocaleString()}</b>
                </li>
                <li>
                    Percentage of population fully vaccinated: 
                    <b> {' '}
                        {round(vaxCompleted / population * 100, 2)
                        }%
                    </b>
                </li>
            </ul> : null
        }
        </>
    )
}