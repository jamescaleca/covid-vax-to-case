import React, { useContext } from 'react'
import GoogleMapReact from 'google-map-react'
import Marker from './Marker.js'
import { round } from 'mathjs'
import { DataContext } from '../contexts/dataProvider'

const AnyReactComponent = ({ text }) => <div>{text}</div>

export default function CountryMap() {
    const defaultCountryProps = {
        center: {
            lat: 39.5,
            lng: -98.35
        },
        zoom: 4.5
    }

    const { onChildClickCallback, allStatesData, } = useContext(DataContext)


    const allStatesMappedData = allStatesData.map(state => {
        return {
            lat: state.coordinates[0].lat,
            lng: state.coordinates[0].lng,
            weight: round( state.vaxCompleted / 
                state.population * 100, 2
            )
        }
    })

    const countryHeatMapData = {
        positions: allStatesMappedData,
        options: {
            radius: 100,
            opacity: .5
        }
    }

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

    return (
        <div className='map' >
            <GoogleMapReact
                bootstrapURLKeys={{ 
                    key: '',
                    libraries: ['visualization'] 
                }}
                defaultCenter={{
                    lat: defaultCountryProps.center.lat, 
                    lng: defaultCountryProps.center.lng
                }}
                defaultZoom={5}
                heatmap={countryHeatMapData}
                onChildClick={onChildClickCallback}
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