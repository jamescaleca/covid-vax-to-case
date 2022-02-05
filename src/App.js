import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './components/Home'

export default function App(){
    return (
        <div className='app'>
            <Home />
        </div>
    )
}