import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import '../../css/home.css'
import { Link } from 'react-router-dom'
import Followbase from '../../components/Followbase'

const Profile = () => {
    const [user, setUser] = useState()
    const [isFollowing, setFollowing] = useState(false)
    const token = localStorage.getItem('token')
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/user/account/full`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
        })
            .then(data => {
                const fetched = data.data
                setUser(fetched)
                
                setTimeout(() => {
                    
                    document.querySelectorAll('.placeholder').forEach((a) => {
                        a.classList.remove('placeholder')
                    })
                    document.querySelectorAll('.placeholder-glow').forEach((a) => {
                        a.classList.remove('placeholder-glow')
                    })

                }, 2000);
            })
    }, [])
    const handleSetFollow = () => {
        setFollowing(!isFollowing)
    }
    return (
        <>
            <Navbar />
            <div className="col-10 col-lg-6 mx-auto mt-4 bg-light rounded-5 shadow-lg p-2 raleway placeholder-glow">
                <section className='d-flex gap-4 align-items-center justify-content-center'>
                    <img src={`http://127.0.0.1:8000/${user?.profile_image}`} alt="" className='small-profile-images rounded-circle placeholder' id='' />
                    <div className=" d-md-flex gap-4">
                        <div className="flex-column justify-content-center d-none d-md-flex">
                            <span className='fw-semibold m-0 placeholder'>
                                @{user?.username}
                            </span>
                            <span className='fw-light text-secondary placeholder'>
                                {user?.name}
                            </span>
                            <Link className='m-0 text-secondary placeholder'>
                                <i className="bi bi-instagram me-2"></i>
                                <span>anyakawai</span>
                            </Link>
                        </div>
                        <div className="d-md-none">
                            <span className='fw-semibold m-0 placeholder'>
                                @{user?.username}
                            </span>
                            <span className='fw-light text-secondary placeholder'>
                                / {user?.name}
                            </span>
                            <br />
                        </div>
                        <div>
                            <div className="d-flex gap-4 mt-2">
                                <div className="text-start placeholder">
                                    <span className='fw-semibold'>{user?.postCount}</span>
                                    <p className='m-0 text-secondary fs-7'>Posts</p>
                                </div>
                                <Link to={'/profile/follow'} className="text-start btn p-0">
                                    <span className='fw-semibold placeholder'>{user?.followerCount}</span>
                                    <p className='m-0 text-secondary fs-7 placeholder'>Follower</p>
                                </Link>
                                <Link to={'/profile/follow'} className="text-start btn p-0" onClick={() => handleSetFollow()}>
                                    <span className='fw-semibold placeholder'>{user?.followingCount}</span>
                                    <p className='m-0 text-secondary fs-7 placeholder'>Following</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="row row-cols-2 row-cols-md-4 mt-4 p-2">
                    {user?.post?.map((d) => {
                        return (
                            <Link className='py-2' key={d.id} to={`/post/${d.slug}`}>
                                <div className=" overflow-hidden">
                                    <img src={`http://127.0.0.1:8000/${d.image}`} alt="" className='rounded-4 post-image object-fit-cover w-100 placeholder' />
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Profile