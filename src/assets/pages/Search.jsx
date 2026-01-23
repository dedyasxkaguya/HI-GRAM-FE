import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import '../css/home.css'
import { Link, useParams } from 'react-router-dom'
const Search = () => {
    const [name, setName] = useState('')
    const [data, setData] = useState([])
    const [isNull, setNull] = useState(false)
    const [loading, setLoading] = useState()
    const { uuid } = useParams()
    const handleChange = (e) => {
        setName(e.target.value)
    }
    const handleSearch = () => {
        setLoading(true)
        axios.get(`http://127.0.0.1:8000/api/post/search/${name}`)
            .then(data => {
                const fetched = data.data
                setData(fetched)
                setLoading(false)
                if(fetched.length<1){
                    setNull(true)
                }else{
                    setNull(false)
                }
            })
    }
    return (
        <>
            <Navbar />
            <div className="col-10 mx-auto h-50dvh raleway">
                <p className='text-center fs-4 fw-semibold'>Search HI-gallery</p>
                <div className="d-flex col-6 gap-2 mx-auto">
                    <input type="text" className='form-control w-75' placeholder='Search here' onChange={(e) => handleChange(e)} />
                    <button type="button" className='btn btn-primary ' onClick={() => handleSearch()}>
                        <i className='bi bi-search me-2'></i>
                        Search
                    </button>
                </div>
                <p>Showing result for {name}</p>
                {loading && (
                    <>
                        <span>Wait a minute...</span>
                        <span>Fetching our API</span>
                        <br />
                    </>
                )}
                {isNull && (
                    <span>Tidak ada postingan dengan judul atau caption <i className='fw-semibold'>{name}</i></span>
                )}
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
        </>
    )
}

export default Search