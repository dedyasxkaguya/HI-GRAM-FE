import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'

const Update = () => {
    const token = localStorage.getItem('token')
    const [user, setUser] = useState()
    const [image, setImage] = useState(false)
    useEffect(() => {
        if (token) {
            axios.get(`http://127.0.0.1:8000/api/user/account`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json'
                }
            })
                .then(data => {
                    const fetch_user = data.data
                    setUser(fetch_user)
                })
        }
    }, [])
    const handleImage = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]))
    }
    return (
        <>
            <Navbar />
            <div className=" m-4 row row-cols-lg-3 row-cols-1">
                <form action="" className='d-flex flex-column gap-2'>
                    <div className="">
                        <label htmlFor="floatingInput">Username</label>
                        <input type="text" className="form-control" id="floatingInput" placeholder={`@${user?.username}`} />
                    </div>
                    <div className="">
                        <label htmlFor="">Name</label>
                        <input type="text" className="form-control" id="" placeholder={user?.name} />
                    </div>
                    <div className="">
                        <label htmlFor="">Name</label>
                        <input type="text" className="form-control" id="" placeholder={user?.name} />
                    </div>
                    <div className="form-floating">
                        <input type="email" className="form-control" disabled id="" placeholder={user?.email} />
                        <label htmlFor="">{user?.email}</label>
                    </div>
                    <div className="form-floating">
                        <input type="text" className="form-control" id="" placeholder={user?.name} />
                        <label htmlFor="">New Password</label>
                    </div>
                    <div className="form-floating">
                        <input type="text" className="form-control" id="" placeholder={user?.name} />
                        <label htmlFor="">Confirm Password</label>
                    </div>
                </form>
                <div className="">
                    <img src={image ? image : `http://127.0.0.1:8000/${user?.profile_image}`} alt="" className='w-50 ratio ratio-1x1 object-fit-cover rounded-circle mt-4' style={{ 'aspectRatio': '1/1' }} />
                    <div className="">
                        <label htmlFor="">Profile Picture</label>
                        <input type="file" className="form-control" id="" onChange={(e) => handleImage(e)} />
                    </div>
                    <div className="">
                        <label htmlFor="floatingTextarea">Bio</label>
                        <textarea className="form-control" placeholder={user?.bio} id="floatingTextarea" cols={'40'} rows={'8'}>{user?.bio}</textarea>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Update