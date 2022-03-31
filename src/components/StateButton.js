import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'

import { DataContext } from '../contexts/dataProvider'

export default function StateButton() {
    const { stateCombinedData, setStateCombinedData, selectedState } = useContext(DataContext)

    useEffect(() => {
        function combineDiffStateCoordsCovid() {
            axios
                .get(`https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-county-boundaries&q=&rows=300&refine.stusab=${selectedState}`)
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
        combineDiffStateCoordsCovid()
    }, [selectedState, setStateCombinedData])

    return (
        <>
            {stateCombinedData !== []? 
            <>
                {stateCombinedData[0] !== undefined &&
                stateCombinedData[0].coordinates !== [] && 
                stateCombinedData[0].coordinates[0] !== undefined
                ? 
                <Link to={`/state/${selectedState}`}>
                    <button>
                        Click here to view heatmap and data for {selectedState}
                    </button>
                </Link> 
                : <h1>Loading... </h1>
                }
            </>
                : <h1>Loading... </h1>
            }
            
        </>
    )
}