import React, { useState, useEffect } from 'react'
import { fetchAllPerson } from '../../apiCalls/apiCalls'
import GraphEdge from '../../components/GraphEdge/GraphEdge'
import GraphNode from '../../components/GraphNode/GraphNode'
import "./GraphView.css"
const GraphView = () => {
    const [persons, setPersons] = useState([])

    useEffect(() => {
        fetchAllPerson().then((data) => {
            console.log(data);
            setPersons(data)
        }).catch(err => console.log(err))
    }, [])
    let x = 0, y = 50;
    return (
        <div className="graphview__container">
            <svg className="main__svg">
                {
                    persons.map((p, i) => {
                        if (i % 3 === 0 && i!= 0) {
                            y += 200;
                            x=0
                        }
                        else{
                            x+=100;
                        }

                        return <GraphNode key={i} cx={x} cy={y} text={p.id} />
                    })
                }
                <GraphEdge x1={10} y1={10} x2={400} y1={100} />
                <GraphEdge x1={20} y1={0} x2={200} y1={200} />
                <GraphEdge x1={30} y1={80} x2={300} y1={300} />
                <GraphEdge x1={400} y1={70} x2={400} y1={400} />
            </svg>
        </div>
    )
}

export default GraphView
