import React from 'react'

const GraphNode = ({cx, cy,text}) => {
    return (
        <svg height="50" width="50" x={cx} y={cy} >
            <ellipse cx="25" cy="25" rx="20" ry="20" style={{fill:"white",stroke:"purple",strokeWidth:2}}/>
            <text x="20" y="30" fill="darkblue">{text}</text>
        </svg>
    )
}

// style={{position:"absolute",top:`${cx}px`,left:`${cy}px`}}
export default GraphNode
