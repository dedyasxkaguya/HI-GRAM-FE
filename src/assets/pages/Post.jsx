import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
// import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import '../css/post.css'

const Post = () => {
    const [data, setData] = useState()
    const [user, setUser] = useState()
    const { post } = useParams()
    const { uuid } = useParams()
    // console.log(slug)
    useEffect(() => {
        if (uuid) {
            axios.get(`http://127.0.0.1:8000/api/user/${uuid}`)
                .then(data => {
                    const fetch_user = data.data
                    if (user !== 'null blyat') {
                        setUser(fetch_user)
                        console.log(user)
                    }
                })
        }
        axios.get(`http://127.0.0.1:8000/api/post/${post}`)
            .then(data => {
                const fetched = data.data
                setData(fetched)
            })
    }, [])
    return (
        <>
            <div className="overflow-x-hidden">

                <Navbar />
                <div className="row justify-content-center">
                    <div className='col-lg-5 col-10' key={data?.id}>
                        <div className=" overflow-hidden">
                            <img src={`http://127.0.0.1:8000/${data?.image}`} alt="" className='rounded-4 post-image-single object-fit-cover w-100 my-2' />
                            {/* <div className="" style={{ backim }}></div> */}
                        </div>
                    </div>
                    <div className="col-4 bg-light rounded-4 my-2 d-flex flex-column justify-content-between">
                        <div className="d-flex gap-2 align-items-center text-center px-2">
                            <img src={`http://127.0.0.1:8000/${data?.user?.profile_image}`} alt="" className='rounded-circle profile-image-post object-fit-cover my-3' />
                            <span className='fw-semibold'>@{data?.user?.username}</span>
                            <i className="bi bi-circle-fill fs-10 fs-5"></i>
                            <Link to={'/'} className='text-primary text-decoration-none'>Follow</Link>
                        </div>
                        <div className="comment-box-dekstop pb-2">
                            <div className="p-2">
                                <img src={`http://127.0.0.1:8000/${data?.user?.profile_image}`} alt="" className='rounded-circle profile-image-post-small me-2 object-fit-cover' />
                                <span className='fw-semibold'>@{data?.user?.username}</span>
                                <span className='fw-light fs-6'> {data?.caption}</span><br />
                                <span className='fw-light opacity-75 text-secondary fs-7'>{data?.formattedTime}</span>
                            </div>
                            <div className="d-flex gap-2 flex-column p-2">
                                {data?.comment?.map((c) => {
                                    return (
                                        <div className="d-flex align-items-center my-2">
                                            <img src={`http://127.0.0.1:8000/${c?.user?.profile_image}`} alt="" className='rounded-circle profile-image-post me-2 object-fit-cover' />
                                            <div className="m-0 d-flex flex-column">
                                                <span className='fw-semibold lh-1 fs-7'>@{c.user?.username}
                                                    {data?.user?.username == c.user?.username ? <span className='text-secondary opacity-75'> Pembuat</span> : ''}</span>
                                                <span className='fw-light lh-base'>{c.comment}</span>
                                                <span className='fw-ultralight text-secondary fs-7 opacity-75 lh-1'>{c.formattedTime}</span>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="d-flex gap-2 fs-6 py-2">
                            <span>
                                <i className='bi bi-heart me-2'></i>
                                {data?.likeCount}
                            </span>
                            <span>
                                <i className='bi bi-chat me-2'></i>
                                {data?.commentCount}
                            </span>
                        </div>
                        <div className="fs-7 d-flex gap-2 py-2">
                            <input type="text" className="form-control w-75" id="floatingInput" placeholder="Write a comment" />
                            <button className='p-2 w-25 btn btn-outline-primary d-flex justify-content-center align-items-center'>Post</button>
                        </div>
                        {/* <button type='button'>Post</button> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Post