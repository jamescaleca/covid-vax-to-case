import React, { useContext } from 'react'
import GoogleMapReact from 'google-map-react'
import Marker from './Marker.js'
import { round } from 'mathjs'
import { DataContext } from '../contexts/dataProvider'

// const AnyReactComponent = ({ text }) => <div>{text}</div>

export default function StateMap() {
    const { stateCombinedData, allStatesAbbrevArr, selectedState } = useContext(DataContext)

    // const tempStateMapData = stateCombinedData.map(county => {
    //     // county.coordinates !== undefined || county !== undefined
    //     return {
    //         lat: county.coordinates[1],
    //         lng: county.coordinates[0],
    //         weight: round( county.vaxCompleted / 
    //             county.population * 100, 2)
    //     }
    // })



    // const defaultCountryProps = {
    //     center: {
    //         lat: 39.5,
    //         lng: -98.35
    //     },
    //     zoom: 4.5
    // }

    let stateHeatMapData = {
        positions: stateCombinedData.map(county => {
            return {
            lat: county.coordinates[1],
            lng: county.coordinates[0],
            weight: round( county.vaxCompleted / 
                county.population * 100, 2)
            }
        }),
        options: {
            radius: 90,
            opacity: .5
        },
    }

    console.log(stateHeatMapData)

    // const defaultMap = 
    //     <div className='map'>
    //         <GoogleMapReact
    //             bootstrapURLKeys={{ 
    //                 key: '',
    //                 libraries: ['visualization']
    //             }}
    //             center={defaultCountryProps.center }
    //             defaultZoom={defaultCountryProps.zoom}
    //         >
    //             <AnyReactComponent 
    //                 lat={defaultCountryProps.center.lat}
    //                 lng={defaultCountryProps.center.lng}
    //                 text='My marker'
    //             />
    //         </GoogleMapReact>
    //     </div>

    // MAYBE TRY A USEEFFECT THAT CALLS A FUNCTION THAT FIRES THE .MAP METHOD

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
                heatmap={stateHeatMapData}
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