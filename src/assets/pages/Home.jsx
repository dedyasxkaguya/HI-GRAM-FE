import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../css/home.css'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
const Home = () => {
    const [data, setData] = useState([])
    const token = localStorage.getItem('token')
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/posts')
            .then(data => {
                const fetched = data.data
                setData(fetched)
            })
        axios.get('http://127.0.0.1:8000/api/user/account',{
            headers:{
                Authorization:`Bearer ${token}`,
                Accept:'application/json'
            }
        })
            .then(data => {
                const fetched = data.data
                // setData(fetched)
                console.log(fetched)
            })
    }, [])
    return (
        <>
            <Navbar />
            <div className='bg-light h-100dvh w-100 d-flex justify-content-center'>
                <div className="col-10">
                    {/* <button className='btn btn-primary'>Niggggaaa</button> */}
                    <div className="row row-cols-lg-4 row-cols-md-3 row-cols-2">
                        {data.map((d) => {
                            return (
                                <Link className='col text-decoration-none ' key={d.id} to={`/post/${d.slug}`}>
                                    <div className=" overflow-hidden">
                                        <img src={`http://127.0.0.1:8000/${d.image}`} alt="" className='rounded-4 post-image object-fit-cover w-100 my-2' />
                                        <span className='text-truncate w-100 pe-2 text-decoration-none text-black fs-7 fs-md-6'>
                                            <span className='fw-semibold'>@{d.user?.username}</span>
                                            <span className='fw-light'> {d.title}</span>
                                        </span>
                                        <p className='fw-light opacity-75 text-secondary fs-8 m-0'>{d.formattedTime}</p>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home