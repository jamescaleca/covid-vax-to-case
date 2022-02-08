import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './components/Home'
import State from './components/State'
import StateSelector from './components/StateSelector'

export default function App(){
    return (
        <div className='app'>
            
            <Switch>
                <Route 
                    exact path='/'
                    component={Home}
                />
                <Route 
                    exact path='/state'
                    component={StateSelector}
                />
                <Route 
                    exact path='/state/:selectedState'
                    component={State}
                />
            </Switch>
        </div>
    )
}