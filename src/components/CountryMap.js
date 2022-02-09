import React, { useContext, useState, useEffect } from 'react'
import GoogleMapReact from 'google-map-react'
import Marker from './Marker.js'
import { round } from 'mathjs'
import { DataContext } from '../contexts/dataProvider'

export default function CountryMap(props) {
    const { allStatesData, } = useContext(DataContext)

    const [ heatMapData, setHeatMapData ] = useState([])

    const { mappedData } = props

    const defaultCountryProps = {
        center: {
            lat: 39.5,
            lng: -98.35
        },
        zoom: 4.5
    }

    useEffect(() => {
        function heatMapFunc() {
            const mapOptions = { radius: 100, opacity: .5 }
            return setHeatMapData({
                positions: mappedData,
                options: mapOptions
            })
        }
        heatMapFunc()
    }, [ mappedData ])

    return (
        <div className='map' >
            <GoogleMapReact
                bootstrapURLKeys={{ 
                    key: `${process.env.REACT_APP_GOOGLE_API_KEY}`,
                    libraries: ['visualization'] 
                }}
                defaultCenter={{
                    lat: defaultCountryProps.center.lat, 
                    lng: defaultCountryProps.center.lng
                }}
                defaultZoom={5}
                heatmap={heatMapData}
            >
                {allStatesData.map(state => (
                    <Marker 
                        key={state.name}
                        lat={state.coordinates[0].lat}
                        lng={state.coordinates[0].lng}
                        text={state.name}
                        countyName={state.name}
                        state={state}
                        percentVaxxed={round(state.vaxCompleted / 
                            state.population * 100, 2)
                        }
                    />
                ))}
            </GoogleMapReact>
        </div> 
    )
}