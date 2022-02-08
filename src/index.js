import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import DataProvider from './contexts/dataProvider'

ReactDOM.render(
    <Router>
        <DataProvider>
            <App />
        </DataProvider>
    </Router>
    ,
    document.getElementById('root')
)