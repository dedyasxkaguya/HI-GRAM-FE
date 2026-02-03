import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import '../../css/home.css'
import { Link, useParams } from 'react-router-dom'
import Followbase from '../../components/Followbase'
import Swal from 'sweetalert2'

const Userprofile = () => {
    const [data, setData] = useState()
    const [user, setUser] = useState()
    const [isFollowing, setFollowing] = useState(false)
    const [isFollow, setFollow] = useState(false)
    const token = localStorage.getItem('token')
    const { name } = useParams()
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/user/${name}/all`)
            .then(data => {
                const fetched = data.data
                setData(fetched)
                console.log(fetched)
                
                setTimeout(() => {
                    
                    document.querySelectorAll('.placeholder').forEach((a) => {
                        a.classList.remove('placeholder')
                    })
                    document.querySelectorAll('.placeholder-glow').forEach((a) => {
                        a.classList.remove('placeholder-glow')
                    })

                }, 1000);
                
                const formdata = new FormData()
                formdata.append('following_id', fetched.id)
                axios.post('http://127.0.0.1:8000/api/follow/check', formdata, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json'
                    }
                }).then(data => {
                    const fetched_check = data.data
                    console.log(fetched_check)
                    if (fetched_check.status) {
                        setFollow(false)
                    } else {
                        setFollow(true)
                    }
                })
            })
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
    const handleSetFollow = () => {
        setFollowing(!isFollowing)
    }
    const handleFollow = () => {
        const formdata = new FormData()
        formdata.append('following_id', data?.id)
        axios.post('http://127.0.0.1:8000/api/follow', formdata, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
        }).then(dataFollow => {
            const fetched = dataFollow.data
            console.log(fetched)
            if (fetched.status) {
                Swal.fire({
                    icon: 'success',
                    title: 'Congratulation',
                    text: 'You have follow @' + data?.username,
                    toast: true,
                    showConfirmButton: false
                })
                const formdata0 = new FormData()
                formdata0.append('user_id', data?.id)
                formdata0.append('type', 'FOLLOW')
                formdata0.append('body', 'Following You')
                axios.post(`http://127.0.0.1:8000/api/notification/add`, formdata0, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json'
                    }
                })
                setTimeout(() => {
                    navigation.reload()
                }, 1024);
            } else {
                Swal.fire({
                    icon: 'success',
                    // title:'Its okay',
                    text: 'You have unfollow @' + data?.username,
                    toast: true,
                    showConfirmButton: false
                })
                setTimeout(() => {
                    navigation.reload()
                }, 1024);
            }
        })
    }
    return (
        <>
            <Navbar />
            <div className="col-10 col-lg-6 mx-auto mt-4 bg-light rounded-5 shadow-lg p-2 raleway placeholder-glow">
                <section className='d-flex flex-column justify-content-center gap-2'>
                    <main className='d-flex gap-4 align-items-center p-2'>
                        <img src={`http://127.0.0.1:8000/${data?.profile_image}`} alt="" className='small-profile-images rounded-circle d-none d-md-block placeholder' id='' />
                        <div className="d-flex flex-column d-md-none justify-content-center align-items-center gap-2">
                            <img src={`http://127.0.0.1:8000/${data?.profile_image}`} alt="" className='small-profile-images rounded-circle placeholder' id='' />
                            {data?.id !== user?.id && (
                                <button type='button' onClick={() => handleFollow()} className='btn btn-light text-decoration-none text-primary placeholder'>
                                    {isFollow ? 'Unfollow' : 'Follow'}
                                </button>
                            )}
                        </div>
                        <div className=" d-md-flex gap-4">
                            <div className="flex-column justify-content-center d-none d-md-flex">
                                <span className='fw-semibold m-0 placeholder'>
                                    @{data?.username}
                                </span>
                                <span className='fw-light text-secondary placeholder'>
                                    {data?.name}
                                </span>
                                {data?.id !== user?.id && (
                                    <button type='button' onClick={() => handleFollow()} className='btn btn-light text-decoration-none text-primary placeholder'>
                                        {isFollow ? 'Unfollow' : 'Follow'}
                                    </button>
                                )}
                                {/* <Link className='m-0 text-secondary'>
                                    <i className="bi bi-instagram me-2"></i>
                                    <span>anyakawai</span>
                                    </Link> */}

                            </div>
                            <div className="d-md-none placeholder">
                                <span className='fw-semibold m-0'>
                                    @{data?.username}
                                </span>
                                <span className='fw-light text-secondary'>
                                    / {data?.name}
                                </span>
                                <br />
                            </div>
                            <div className="d-flex gap-4 mt-2 align-items-center placeholder">
                                <div className="text-start">
                                    <span className='fw-semibold'>{data?.postCount}</span>
                                    <p className='m-0 text-secondary fs-7'>Posts</p>
                                </div>
                                <Link to={'/profile/follow'} className="text-start btn p-0">
                                    <span className='fw-semibold'>{data?.followerCount}</span>
                                    <p className='m-0 text-secondary fs-7'>Follower</p>
                                </Link>
                                <Link to={'/profile/follow'} className="text-start btn p-0" onClick={() => handleSetFollow()}>
                                    <span className='fw-semibold'>{data?.followingCount}</span>
                                    <p className='m-0 text-secondary fs-7'>Following</p>
                                </Link>
                            </div>
                        </div>
                    </main>
                    <div className="px-2 fs-7 d-md-none placeholder">
                        {data?.bio}
                    </div>
                </section>
                <div className="row row-cols-2 row-cols-md-4 mt-2 p-2">
                    {data?.post?.map((d) => {
                        return (
                            <Link className='pt-2' key={d.id} to={`/post/${d.slug}`}>
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

export default Userprofile