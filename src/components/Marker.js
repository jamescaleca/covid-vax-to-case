import React from 'react'

export default function Marker(props) {
    const markerStyle = {
        border: '1px solid black',
        borderRadius: '10%',
        height: 'auto',
        width: '80px',
        background: 'whitesmoke',
        fontSize: '9px',
        opacity: '.75',
        padding: '3px',
        textAlign: 'center',
    }

    const {show, county, lat, lng, text, percentVaxxed} = props

    return (
        <div className='marker' style={markerStyle}>
            <p style={{opacity: '1.0'}}>{text}, %{percentVaxxed}</p>
        </div>
    )
}