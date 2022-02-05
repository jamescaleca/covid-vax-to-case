import React, { useContext } from 'react'
import GoogleMapReact from 'google-map-react'
import Marker from './Marker.js'
import { round } from 'mathjs'
import { DataContext } from '../contexts/dataProvider'
import { UserContext } from '../contexts/userProvider.js'
import DiffStateMap from './DiffStateMap.js'

const AnyReactComponent = ({ text }) => <div>{text}</div>

export default function CountyMap() {
    const defaultCountryProps = {
        center: {
            lat: 39.5,
            lng: -98.35
        },
        zoom: 4.5
    }

    const { 
        stateResData,
        stateResCoord, 
        countyData,
        countiesCombinedData, 
        countyResCoords, 
        onChildClickCallback ,
        countryView,
        allStatesData,
        diffStateView,
        allStatesAbbrevArr,
        selectedState,
        diffStateCombinedData,
        diffStateSelectData,
        diffStateMapData,
        diffStateHeatMapData,
        diffStateCoords
    } = useContext(DataContext)

    const { user: { countyRes } } = useContext(UserContext)

    const allStatesMappedData = allStatesData.map(state => {
        return {
            lat: state.coordinates[0].lat,
            lng: state.coordinates[0].lng,
            weight: round( state.vaxCompleted / 
                state.population * 100, 2
            )
        }
    })

    // const diffStateMapData = diffStateCombinedData.map(county => {
    //     return {
    //         lat: county.coordinates[1],
    //         lng: county.coordinates[0],
    //         weight: round( county.vaxCompleted / 
    //             county.population * 100, 2)
    //     }
    // })

    const countyHeatMapData = {
        positions: countyData,
        options: {
            radius: 90,
            opacity: .5
        },
    }

    const countryHeatMapData = {
        positions: allStatesMappedData,
        options: {
            radius: 100,
            opacity: .5
        }
    }

    // const diffStateHeatMapData = {
    //     positions: diffStateMapData,
    //     options: {
    //         radius: 90,
    //         opacity: .5
    //     }
    // }
    // console.log(diffStateHeatMapData)

    const defaultMap = 
        <div className='map'>
            <GoogleMapReact
                bootstrapURLKeys={{ 
                    key: '',
                    libraries: ['visualization']
                }}
                center={defaultCountryProps.center }
                defaultZoom={defaultCountryProps.zoom}
            >
                <AnyReactComponent 
                    lat={defaultCountryProps.center.lat}
                    lng={defaultCountryProps.center.lng}
                    text='My marker'
                />
            </GoogleMapReact>
        </div>

    // WRITE ANOTHER FUNCTION THAT GRABS THE CENTERPOINT COORDINATES FOR THE DIFFSTATE

    // const diffStateCoords = allStatesAbbrevArr.filter(state => {
    //     if(state.state === selectedState){
    //         return state
    //     }
    // })

    // console.log(diffStateCoords)

    return (
        <>
            {countryView === false  && diffStateView === false ?
                <>{stateResData !== {} ? 
                    <div className='map' >
                        <GoogleMapReact
                            bootstrapURLKeys={{ 
                                key: '',
                                libraries: 'visualization'
                            }}
                            defaultCenter={{
                                lat: stateResData.coordinates[0].lat, 
                                lng: stateResData.coordinates[0].lng
                            }}
                            defaultZoom={8}
                            heatmap={countyHeatMapData}
                            onChildClick={onChildClickCallback}
                        >
                            {countiesCombinedData.map(county => (
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
                    :
                    <>{defaultMap}</>
                }</> 
            : countryView === true && diffStateView === false ?
                <>{stateResData !== {} ?  
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
                    : 
                    <>{defaultMap}</>
                }</> 
            : countryView === false && diffStateView === true ?
                <>
                    <div className='map' >
                        {diffStateCoords.length > 0 && diffStateSelectData.length > 0 && diffStateMapData.length > 0 && diffStateCombinedData.length > 0 && diffStateHeatMapData.positions.length > 0 ?  
                            <DiffStateMap /> 
                        : null}
                    </div> 
                </> 
                : <>{defaultMap}</>
            }
        </>
    )
}