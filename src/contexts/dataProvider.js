import React, { useEffect, useState } from 'react'
import { round } from 'mathjs'
import axios from 'axios'

export const DataContext = React.createContext()

export default function DataProvider(props) {
    const allStatesAbbrevArr = [ 
        {state: 'AK', lat: 64.2008, lng: -149.4937},
        {state: 'AL', lat: 32.3182, lng: -86.9023},
        {state: 'AR', lat: 35.2010, lng: -91.8318},
        {state: 'AZ', lat: 34.0489, lng: -111.0937}, 
        {state: 'CA', lat: 36.7783, lng: -119.4179},
        {state: 'CO', lat: 39.5501, lng: -105.7821},
        {state: 'CT', lat: 41.6032, lng: -73.0877},
        {state: 'DC', lat: 38.9072, lng: -77.0369}, 
        {state: 'DE', lat: 38.9108, lng: -75.5277},
        {state: 'FL', lat: 27.6648, lng: -81.5158},
        {state: 'GA', lat: 32.1656, lng: -82.9001}, 
        {state: 'HI', lat: 19.8968, lng: -155.5828},
        {state: 'IA', lat: 41.8780, lng: -93.0977},
        {state: 'ID', lat: 44.0682, lng: -114.7420},
        {state: 'IL', lat: 40.6331, lng: -89.3985},
        {state: 'IN', lat: 40.2672, lng: -86.1349},
        {state: 'KS', lat: 39.0119, lng: -98.4842},
        {state: 'KY', lat: 37.8393, lng: -84.2700},
        {state: 'LA', lat: 30.9843, lng: -91.9623},
        {state: 'MA', lat: 46.7296, lng: -94.6859},
        {state: 'MD', lat: 39.0458, lng: -76.6413},
        {state: 'ME', lat: 45.2538, lng: -69.4455},
        {state: 'MI', lat: 44.3148, lng: -85.6024},
        {state: 'MN', lat: 46.7296, lng: -94.6859},
        {state: 'MO', lat: 46.8797, lng: -110.3626},
        {state: 'MP', lat: 15.0979, lng: 145.6739},
        {state: 'MS', lat: 32.3547, lng: -89.3985},
        {state: 'MT', lat: 46.8797, lng: -110.3626},
        {state: 'NC', lat: 35.7596, lng: -79.0193},
        {state: 'ND', lat: 47.5515, lng: -101.0020},
        {state: 'NE', lat: 43.9654, lng: -70.8227},
        {state: 'NH', lat: 43.1939, lng: -71.5724},
        {state: 'NJ', lat: 40.0583, lng: -74.4057},
        {state: 'NM', lat: 34.5199, lng: -105.8701},
        {state: 'NV', lat: 38.8026, lng: -116.4194},
        {state: 'NY', lat: 40.7128, lng: -74.0060},
        {state: 'OH', lat: 40.4173, lng: -82.9071},
        {state: 'OK', lat: 35.0078, lng: -97.0929},
        {state: 'OR', lat: 43.8041, lng: -120.5542},
        {state: 'PA', lat: 41.2033, lng: -77.1945},
        {state: 'PR', lat: 18.2208, lng: -66.5901}, 
        {state: 'RI', lat: 41.5801, lng: -71.4774},
        {state: 'SC', lat: 33.8361, lng: -81.1637},
        {state: 'SD', lat: 43.9695, lng: -99.9018},
        {state: 'TN', lat: 35.5175, lng: -86.5804},
        {state: 'TX', lat: 31.9686, lng: -99.9018},
        {state: 'UT', lat: 39.3210, lng: -111.0937},
        {state: 'VA', lat: 37.4316, lng: -78.6569},
        {state: 'VT', lat: 44.5588, lng: -72.5778},
        {state: 'WA', lat: 47.7511, lng: -120.7401},
        {state: 'WI', lat: 43.7844, lng: -88.7879},
        {state: 'WV', lat: 38.5976, lng: -80.4549}, 
        {state: 'WY', lat: 43.0760, lng: -107.2903} 
    ]

    const statesUrl = 'https://api.covidactnow.org/v2/states.timeseries.json?apiKey='

    // const countiesUrl = `https://api.covidactnow.org/v2/counties.timeseries.json?apiKey=`

    const [countryData, setCountryData] = useState({})
    const [statePlaceholder, setStatePlaceholder] = useState('default')
    const [selectedState, setSelectedState] = useState('')
    const [countryView, setCountryView] = useState(true)
    const [allStatesData, setAllStatesData] = useState([])
    const [stateCombinedData, setStateCombinedData] = useState([])

    function toggleCountryView() {
        return setCountryView(prev => !prev)
    }

    function resetState() {
        setSelectedState('')
        setStateCombinedData([])
    }

    function homeButton() {
        toggleCountryView()
        resetState()
    }


    const diffStateCoords = allStatesAbbrevArr.filter(state => {
        if(state.state === selectedState){
            return state
        }
    })

    const getCountryData = () => {
        axios
            .get('https://api.covidactnow.org/v2/country/US.timeseries.json?apiKey=')
            .then(res => {
                return setCountryData({
                    population: res.data.population.toLocaleString(),
                    cases: res.data.actuals.cases.toLocaleString(),
                    vaxCompleted: res.data.actuals.vaccinationsCompleted.toLocaleString(),
                    percentVaxxed: round(
                        res.data.actuals.vaccinationsCompleted /
                        res.data.population * 100, 2
                    )
                })
            })
            .catch(err => console.log(err))
    }

    const getAllStatesData = () => {
        axios
            .get(statesUrl)
            .then(res => {
                let statesArray = res.data.map(state => ({
                    name: state.state,
                    population: state.population,
                    cases: state.actuals.cases,
                    vaxDist: state.actuals.vaccinesDistributed,
                    vaxCompleted: state.actuals.vaccinationsCompleted,
                    coordinates: allStatesAbbrevArr.filter(stateAbbr => {
                        if(state.state === stateAbbr.state){
                            return stateAbbr.lat, stateAbbr.lng
                        }
                    })
                }))
                return setAllStatesData(statesArray)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getCountryData()
        getAllStatesData()
    }, [])

    // const onChildClickCallback = (countyName) => {
    //     setCountiesCombinedData(prevCounties => {
    //         countiesCombinedData.filter(county => {
    //             if(countyName === county.county){
    //                 return county.show = !county.show
    //             }
    //         })
            
    //     })
    // }

    return (
        <DataContext.Provider value={{
            toggleCountryView,
            countryData,
            countryView,
            selectedState,
            setSelectedState,
            statePlaceholder,
            setStatePlaceholder,
            allStatesData,
            allStatesAbbrevArr,
            stateCombinedData, 
            setStateCombinedData,
            resetState,
            homeButton,
            diffStateCoords
        }}>{props.children}
        </DataContext.Provider>
    )
}