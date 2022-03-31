// import React from 'react'

// export default function InfoWindow(props)  {
//     const infoWindowStyle = {
//         position: 'relative',
//         bottom: 150,
//         left: '-45px',
//         width: 220,
//         backgroundColor: 'white',
//         boxShadow: '0 2px 7px 1px rgba(0, 0, 0, 0.3)',
//         padding: 10,
//         fontSize: 14,
//         zIndex: 100
//     }

//     const { county } = props

//     const { county, population, vaxCompleted } = county

//     return (
//         <div style={infoWindowStyle}>
//             <div style={{ fontSize: 16 }}>
//                 {county}
//             </div>
//             <div style={{ fontSize: 14 }}>
//                 <span style={{ color: 'grey' }}>
//                     <p>Population: {population}</p>
//                     {' '}
//                 </span>
//                 <span style={{ color: 'grey'}}>
//                     <p>Vaccinations completed: {vaxCompleted}</p>
//                 </span>
//             </div>
//         </div>
//     )
// }