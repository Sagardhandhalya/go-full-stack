import React,{useEffect,useState} from 'react'

const UpdatePersonForm = ({person,onUpdate,onCreate,closeModal}) => {

    const [name, setName] = useState(person?.name || "")
    const [city, setCity] = useState(person?.city || "")
    const [contactNo, setContactNo] = useState(person?.contactNo || "")
    const [photoUrl, setPhotoUrl] = useState(person?.photoUrl || "")

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = ''
        }
    }, [])

    

    return (
        <div className="bg-white rounded-5  p-4">
            <h2>{person ? "update Person Form" : "Create New Person"}</h2>
            <hr />
            <div className="input">
                <label className="form-label">Name</label>
                <input className="form-control  mb-1" type="text" name="name" value={name} onChange={(e)=> setName(e.target.value)} />
            </div>
            <div className="input">
                <label className="form-label">City</label>
                <input className="form-control  mb-1" type="text" name="city" value={city} onChange={(e)=> setCity(e.target.value)} />
            </div>
            <div className="input">
                <label className="form-label">Contact No</label>
                <input className="form-control  mb-1" type="text" name="contactNo" value={contactNo} onChange={(e)=> setContactNo(e.target.value)} />
            </div>
            <div className="input">
                <label className="form-label">Photo Url</label>
                <input className="form-control  mb-1" type="text" name="photoUrl" value={photoUrl} onChange={(e)=> setPhotoUrl(e.target.value)} />
            </div>
            <button className="btn btn-primary mt-3 me-3 center" onClick={()=> person ? onUpdate(person?.id, {name,city,contactNo,photoUrl}) 
            : onCreate( {name,city,contactNo,photoUrl }) }>Submit</button>
             <button className="btn btn-outline-primary mt-3 center" onClick={()=> person ? closeModal([false,{}]) 
            : closeModal(false) }>Close</button>
        </div>
    )
}

export default UpdatePersonForm
