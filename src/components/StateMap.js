import React, { useContext, useState, useEffect } from 'react'
import GoogleMapReact from 'google-map-react'
import Marker from './Marker.js'
import { DataContext } from '../contexts/dataProvider'

export default function StateMap(props) {
    const { stateCombinedData, allStatesAbbrevArr, selectedState } = useContext(DataContext)

    const [ heatMapData, setHeatMapData ] = useState([])

    const { mappedData } = props

    useEffect(() => {
        function heatMapFunc() {
            const mapOptions = { radius: 90, opacity: .5 }
            return setHeatMapData({
                positions: mappedData,
                options: mapOptions
            })
        }
        heatMapFunc()
    }, [ mappedData ])

    const stateCoords = allStatesAbbrevArr.filter(state => state.state === selectedState)

    return (
        <div className='map' >
            <GoogleMapReact
                bootstrapURLKeys={{ 
                    key: `${process.env.REACT_APP_GOOGLE_API_KEY}`,
                    libraries: ['visualization']
                }}
                center={{
                    lat: stateCoords[0].lat, 
                    lng: stateCoords[0].lng
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