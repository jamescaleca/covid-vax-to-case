import React, { useContext } from 'react'
import { DataContext } from '../contexts/dataProvider'

export default function CountryData() {
    const { countryData } = useContext(DataContext)

    return (
        <div>
            <ul id='us-data-ul'>
                <li><h1>US Data</h1></li>
                <li>Population: <b>{countryData.population}</b></li>
                <li>Vaccinations Completed: <b>{countryData.vaxCompleted}</b></li>
                <li>Total Cases: <b>{countryData.cases}</b></li>
                <li>Percentage of population fully vaccinated: {' '}<b>{countryData.percentVaxxed}%</b></li>
            </ul>
        </div>
    )
}