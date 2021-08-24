import React, { useState, useEffect } from 'react'
import { fetchAllPerson, fetchAllRelations } from '../../apiCalls/apiCalls'
import GraphEdge from '../../components/GraphEdge/GraphEdge'
import GraphNode from '../../components/GraphNode/GraphNode'
import "./GraphView.css"
const GraphView = () => {
    const [persons, setPersons] = useState([])
    const [relation, setRelation] = useState([])

    useEffect(() => {
        fetchAllPerson().then((data) => {
            console.log(data);
            setPersons(data)
        }).catch(err => console.log(err))

        fetchAllRelations().then((data) => {
            console.log(data);
            setRelation(data)
        }).catch(err => console.log(err))
    }, [])


    let x = 0, y = 50;
    let personObjs = persons.map((p, i) => {
        if (i % 3 === 0 && i!= 0) {
            y += 100+ Math.random()*100;
            x=0
        }
        else{
            x+=Math.random()*100+100;
        }
        p.x = x + Math.random()*(50);
        p.y = y + + Math.random()*(100);
        return p
    }
        )
    return (
        <div className="graphview__container">
            <svg className="main__svg">
                {
                    personObjs.map((p, i) => {
                        return <GraphNode key={i} cx={p.x} cy={p.y} text={p.id} />
                    })
                }

                {
                    relation.map((r,i) => {
                        let p1= personObjs.filter(p => p.id === r.p1)[0]
                        let p2= personObjs.filter(p => p.id === r.p2)[0]
                        return <GraphEdge key={i} x1={p1.x+10} x2={p2.x+10} y1={p1.y+10} y2={p2.y+10} />
                    })
                }
            </svg>
        </div>
    )
}

export default GraphView
