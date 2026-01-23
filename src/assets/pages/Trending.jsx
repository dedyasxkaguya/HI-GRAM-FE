import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'

const Trending = () => {
    const [data, setData] = useState([])
    const { uuid } = useParams()
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/post/trend/top')
            .then(data => {
                const fetched = data.data
                setData(fetched)
            })
    }, [])
    let i = 0
    return (
        <>
            <Navbar />
            <div className="col-10 mx-auto h-50dvh raleway">
                <p className='text-center fs-4 fw-semibold'>Trending(s) in HI-Galery</p>
                <div className="row row-cols-lg-4 row-cols-md-3 row-cols-2">
                    {data.map((d) => {
                        i++
                        let color = i==1 ? '#B9F2FF' : i==2 ? '#FFD700' : i==3 ? '#C0C0C0' : i<=7 ? '#CD7F32' : ''
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
                                        <div className="d-flex">
                                            <span className='btn me-2 rounded-4' style={{ backgroundColor:color }}>#{i}</span>
                                            <Link className='text-decoration-none btn btn-sm btn-secondary opacity-50 rounded-5 d-flex align-items-start fs-8 fs-md-6'>
                                                #{d.category?.name}
                                            </Link>
                                        </div>
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
        </>
    )
}

export default Trending