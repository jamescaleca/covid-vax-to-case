import React, { useContext } from 'react'
import { DataContext } from '../contexts/dataProvider'

export default function CountryData() {
    const { countryData } = useContext(DataContext)

    const { population, vaxCompleted, cases, percentVaxxed } = countryData

    return (
        <ul id='us-data-ul'>
            <li><h1>US Data</h1></li>
            <li>Population: <b>{population}</b></li>
            <li>Vaccinations Completed: <b>{vaxCompleted}</b></li>
            <li>Total Cases: <b>{cases}</b></li>
            <li>
                Percentage of population fully vaccinated: 
                {' '}<b>{percentVaxxed}%</b>
            </li>
        </ul>
    )
}