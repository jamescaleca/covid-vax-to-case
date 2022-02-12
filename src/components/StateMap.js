import React, { useContext, useState, useEffect } from 'react'

import GoogleMapReact from 'google-map-react'

import { DataContext } from '../contexts/dataProvider'
import Marker from './Marker.js'

export default function StateMap(props) {
    const { stateCombinedData, allStatesAbbrevArr, selectedState } = useContext(DataContext)

    const { mappedData } = props

    const [ heatMapData, setHeatMapData ] = useState([])
    const [coords] = useState(allStatesAbbrevArr.filter(state => state.state === selectedState))

    useEffect(() => {
        function heatMapFunc() {
            const mapOptions = { radius: 90, opacity: .5 }
            return setHeatMapData({
                positions: mappedData,
                options: mapOptions
            })
        }
        // function stateCoords() {
        //     const filterCoords = allStatesAbbrevArr.filter(state => state.state === selectedState)
        //     console.log(filterCoords)
        //     return setCoords(filterCoords)
            
        // }
        heatMapFunc()
        // stateCoords()
    }, [ mappedData ])


    return (
        <div className='map' >
            <GoogleMapReact
                bootstrapURLKeys={{ 
                    key: `${process.env.REACT_APP_GOOGLE_API_KEY}`,
                    libraries: ['visualization']
                }}
                center={{
                    lat: coords[0].lat, 
                    lng: coords[0].lng
                }}
                defaultZoom={8}
                heatmap={heatMapData}
            >
                {stateCombinedData.map(county => (
                    <Marker 
                        key={county.county}
                        lat={county.coordinates[1]}
                        lng={county.coordinates[0]}
                        show={county.show}
                        text={county.county}
                        countyName={county.county}
                        county={county}
                        percentVaxxed={county.percentVaxxed}
                    />
                ))}
            </GoogleMapReact>
        </div> 
    )
}