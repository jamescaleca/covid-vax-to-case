import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './components/Home'
import State from './components/State'
import StateSelector from './components/StateSelector'

console.log(process.env.REACT_APP_COVID_KEY)

export default function App(){
    return (
        <div className='app'>
            <Switch>
                <Route exact path='/'>
                    <Home />
                </Route>
                <Route exact path='/state'>
                    <StateSelector />
                </Route>
                <Route exact path='/state/:selectedState'>
                    <State />
                </Route>
            </Switch>
        </div>
    )
}