import React, { useState, useEffect } from 'react'
import { fetchAllPerson, fetchAllRelations } from '../../apiCalls/apiCalls'
import GraphEdge from '../../components/GraphEdge/GraphEdge'
import GraphNode from '../../components/GraphNode/GraphNode'
import "./GraphView.css"
const GraphView = () => {
    const [relation, setRelation] = useState([])
    const [personObjs, setPersonObjs] = useState([])
    const [active, setActive] = useState(false)
    const [offset, setOffset] = useState({})
    useEffect(() => {
        fetchAllPerson().then((data) => {
            console.log(data);
            let x = 200, y = 150;
            let persons = data.map((p, i) => {
                if (i % 3 === 0 && i != 0) {
                    y += 150 + Math.random() * 100;
                    x = 200
                }
                else {
                    x += Math.random() * 100 + 150;
                }
                p.x = x + Math.random() * (50);
                p.y = y + + Math.random() * (100);
                return p
            }
            )
            setPersonObjs(persons)
        }).catch(err => console.log(err))

        fetchAllRelations().then((data) => {
            console.log(data);
            setRelation(data)
        }).catch(err => console.log(err))
    }, [])

    const handleMounseDown = (e, person) => {
        console.log(e);
        console.log("down");
        const el= e.currentTarget;
        console.log(e.pointerId);
        const bbox = e.target.getBoundingClientRect();
        const x = e.clientX - bbox.left;
        const y = e.clientY - bbox.top;
        el.setPointerCapture(e.pointerId);
        setActive(true)
        setOffset({x,y})
    }

    const handleMounseDrag = (e, person) => {
        const bbox = e.target.getBoundingClientRect();
        const x = e.clientX - bbox.left;
        const y = e.clientY - bbox.top;
        console.log(e.clientX, e.clientY,bbox.left,bbox.top);
        console.log(x,y);
        if (active) {
            let persons = personObjs.map((p, i) => {
                if (p.id === person.id) {
                    p.x -=offset.x- x;
                    p.y -= offset.y-y;
                    return p;
                } else {
                    return p;
                }
            }
            )
            setPersonObjs(persons)
        }

    }

    const handleMounseUp = (e, person) => {
        console.log("uo");
        const el= e.target;
        el.releasePointerCapture(e.pointerId)
        setActive(false)
    }


    return (
        <div className="graphview__container">
            <svg className="main__svg">
                {relation.map((r, i) => {
                    let p1 = personObjs.filter(p => p.id === r.p1)[0]
                    let p2 = personObjs.filter(p => p.id === r.p2)[0]
                    return <GraphEdge key={i} x1={p1.x + 10} x2={p2.x + 10} y1={p1.y + 10} y2={p2.y + 10} relation={r} />
                })}
                {personObjs.map((p, i) => {
                    return <GraphNode key={i} cx={p.x}
                        cy={p.y} text={p.id} person={p}
                        up={handleMounseUp}
                        down={handleMounseDown}
                        move={handleMounseDrag}
                    />
                })}

            </svg>
        </div>
    )
}

export default GraphView
