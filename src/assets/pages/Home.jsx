import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../css/home.css'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
const Home = () => {
    const [data, setData] = useState([])
    const { uuid } = useParams()
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
                                <div className='col py-2' key={d.id}>
                                    <div className=" overflow-hidden">
                                        <img src={`http://127.0.0.1:8000/${d.image}`} alt="" className='rounded-4 post-image object-fit-cover w-100 my-2' />
                                        {/* <div className="" style={{ backim }}></div> */}
                                        <div className="d-flex align-items-center justify-content-between fs-8 fs-md-6">
                                            <div className="d-flex gap-2">
                                                <span>
                                                    <i className='bi bi-heart me-2'></i>
                                                    {d.likeCount}
                                                </span>
                                                <span>
                                                    <i className='bi bi-chat me-2'></i>
                                                    {d.commentCount}
                                                </span>
                                            </div>
                                            <Link className='text-decoration-none btn btn-sm btn-secondary opacity-50 rounded-5 d-flex align-items-start fs-8 fs-md-6'>
                                                #{d.category?.name}
                                            </Link>
                                        </div>
                                        <Link to={uuid ? `/${uuid}/post/${d.slug}` : `/post/${d.slug}`}
                                            className='text-truncate w-100 pe-2 text-decoration-none text-black fs-7 fs-md-6'>
                                            <span className='fw-semibold'>@{d.user?.username}</span>
                                            <span className='fw-light'> {d.title}</span>
                                        </Link>
                                        <span className='fw-light opacity-75 text-secondary fs-8'>{d.formattedTime}</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home