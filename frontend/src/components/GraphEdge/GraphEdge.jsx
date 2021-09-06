import React,{useState} from 'react'
import "./GraphEdge.css"
const GraphEdge = ({ x1, y1, x2, y2,relation }) => {
    const [isPopUpOn, setIsPopUpOn] = useState(false)

    return (
        <>
            <line  className="line" x1={x1} y1={y1} x2={x2} y2={y2} onClick={() => setIsPopUpOn(!isPopUpOn)} />
            {isPopUpOn ? <foreignObject  x={(x2+x1)/2} y={(y2+y1)/2} width="100" height="100">
                <p className="graphedge__popup">{relation.name}</p>
            </foreignObject>
                : <div />
            }
        </>
    )



}

export default GraphEdge
