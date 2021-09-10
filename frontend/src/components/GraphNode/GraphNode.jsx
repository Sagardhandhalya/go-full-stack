import React, { useState } from 'react'
import "./GraphNode.css"
const GraphNode = ({ cx, cy, text, person,up,down,move }) => {
    const [isPopUpOn, setIsPopUpOn] = useState(false)
    return (
        <>
            <svg height="50" width="50" x={cx} y={cy} tabIndex={cx}
                onPointerDown={(e)=>down(e,person)}
                onPointerUp={(e)=>up(e,person)}
                onPointerMove={(e)=>move(e,person)} 
                onKeyDown={ (e) => e.keyCode != 13 || setIsPopUpOn(!isPopUpOn) }
                onDoubleClick={() => setIsPopUpOn(!isPopUpOn)} >
                <ellipse cx="25" cy="25" rx="20" ry="20" style={{ fill: "white", stroke: "purple", strokeWidth: 2 }} />
                <text x="20" y="30" fill="darkblue">{text}</text>
            </svg>
            {isPopUpOn ? <foreignObject x={cx - 20} y={cy - 100} width="100" height="100">
                <div className="graphnode__popup">
                    <img src={person?.photoUrl} className="card-image" alt={person?.name}/>
                    <p>{person?.name}</p>
                </div>
            </foreignObject>
                : <div />
            }
        </>
    )
}

export default GraphNode
