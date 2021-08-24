import React, { useEffect, useRef, useState } from 'react'
import { fetchConnetionOfAPerson } from '../../apiCalls/apiCalls'
import { drawConnetionChart } from '../../helpers/drawConnetionChart'
import "./ConnectionChart.css"
const ConnectionChart = ({closeModal,id,persons}) => {
    let currentPerson = persons.filter(p => p.id === id)[0] 
    const [h, setH] = useState(200)
    const [w, setW] = useState(400)
    const canvas = useRef(null)

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = ''
        }
    }, [])

    
    useEffect(() => {
        fetchConnetionOfAPerson(id).then(res =>{
            let ctx = canvas.current.getContext('2d')
            if(res){
                setH(res.length*50+60)
                let idArr = res.map(r => r.p2)
                let out = persons
                .filter(p => idArr.includes(p.id))
                .reduce((result,p)=>{
                    result[p.id.toString()]=p.name
                    return result
                },{})
               
            drawConnetionChart(ctx,res,out,currentPerson.name)
            }else{
               let out={}
            drawConnetionChart(ctx,res,out,currentPerson.name)
            }
        }).catch(err => console.log(err))
    }, [])
    return (
        <div className="canvas__container bg-white p-3">
            <h3>Connection Chart</h3>
            <hr />
            <canvas width={w} height={h} ref={canvas}></canvas>
            <button className="close-btn" onClick={()=> closeModal({status:false}) }>&#10060;</button>
        </div>
    )
}

export default ConnectionChart
