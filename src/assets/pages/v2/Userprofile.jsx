import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import '../../css/home.css'
import { Link, useParams } from 'react-router-dom'
import Followbase from '../../components/Followbase'

const Userprofile = () => {
    const [user, setUser] = useState()
    const [isFollowing, setFollowing] = useState(false)
    // const token = localStorage.getItem('token')
    const { name } = useParams()
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/user/${name}/all`)
            .then(data => {
                const fetched = data.data
                setUser(fetched)
                console.log(fetched)
            })
    }, [])
    const handleSetFollow = () => {
        setFollowing(!isFollowing)
    }
    return (
        <>
            <Navbar />
            <div className="col-10 col-lg-6 mx-auto mt-4 bg-light rounded-5 shadow-lg p-2 raleway">
                <section className='d-flex flex-column justify-content-center gap-2'>
                    <main className='d-flex gap-4 align-items-center p-2'>
                        <img src={`http://127.0.0.1:8000/${user?.profile_image}`} alt="" className='small-profile-images rounded-circle' id='' />
                        <div className=" d-md-flex gap-4">
                            <div className="flex-column justify-content-center d-none d-md-flex">
                                <span className='fw-semibold m-0'>
                                    @{user?.username}
                                </span>
                                <span className='fw-light text-secondary'>
                                    {user?.name}
                                </span>
                                <Link className='m-0 text-secondary'>
                                    <i className="bi bi-instagram me-2"></i>
                                    <span>anyakawai</span>
                                </Link>
                            </div>
                            <div className="d-md-none">
                                <span className='fw-semibold m-0'>
                                    @{user?.username}
                                </span>
                                <span className='fw-light text-secondary'>
                                    / {user?.name}
                                </span>
                                <br />
                            </div>
                            <div className="d-flex gap-4 mt-2 align-items-center">
                                <div className="text-start">
                                    <span className='fw-semibold'>{user?.postCount}</span>
                                    <p className='m-0 text-secondary fs-7'>Posts</p>
                                </div>
                                <Link to={'/profile/follow'} className="text-start btn p-0">
                                    <span className='fw-semibold'>{user?.followerCount}</span>
                                    <p className='m-0 text-secondary fs-7'>Follower</p>
                                </Link>
                                <Link to={'/profile/follow'} className="text-start btn p-0" onClick={() => handleSetFollow()}>
                                    <span className='fw-semibold'>{user?.followingCount}</span>
                                    <p className='m-0 text-secondary fs-7'>Following</p>
                                </Link>
                            </div>
                        </div>
                    </main>
                    <div className="px-2 fs-7 d-md-none">
                        {user?.bio}
                    </div>
                </section>
                <div className="row row-cols-2 row-cols-md-4 mt-2 p-2">
                    {user?.post?.map((d) => {
                        return (
                            <Link className='pt-2' key={d.id} to={`/post/${d.slug}`}>
                                <div className=" overflow-hidden">
                                    <img src={`http://127.0.0.1:8000/${d.image}`} alt="" className='rounded-4 post-image object-fit-cover w-100' />
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Userprofile