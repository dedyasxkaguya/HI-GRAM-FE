import React, { useEffect, useState } from 'react'
import { Link, } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../../components/Navbar'
import Followbase from '../../components/Followbase'

const Userfollow = () => {
    // const { type } = useParams()
    const [user, setUser] = useState()
    const [follow, setFollow] = useState([])
    const [following, setFollowing] = useState([])
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
                setFollow(fetched.followers)
                setFollowing(fetched.following)
                console.log(following)
            })
        console.log(follow)
    }, [])
    return (
        <>
            <Navbar />
            <div className='d-flex flex-column flex-md-row raleway' style={{ minHeight: '100dvh' }}>
                <div className="d-flex flex-column flex-md-row">
                    <div className="m-4 d-flex flex-column gap-2" id='follower'>
                        <Link to={'#following'} className='text-black'>
                            <span className='fw-semibold'>@{user?.username}'s </span>
                            <span>Followers</span>
                        </Link>
                        <input type="text" placeholder='Search' className='form-control' />
                        {
                            follow.map((f) => {
                                return (
                                    <Followbase f={f} user={user} />
                                )
                            })
                        }
                    </div>
                    <div className="m-4 d-flex flex-column gap-2" id='following'>
                        <Link to={'#follower'} className='text-black'>
                            <span className='fw-semibold'>@{user?.username}'s</span>
                            <span> Followings</span>
                        </Link>
                        <input type="text" placeholder='Search' className='form-control' />
                        {
                            following.map((f) => {
                                return (
                                    <Followbase f={f} user={user} />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Userfollow