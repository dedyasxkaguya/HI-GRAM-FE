import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../css/home.css'
import Swal from 'sweetalert2'
const Navbar = () => {
    const [user, setUser] = useState(false)
    const token = localStorage.getItem('token')
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
    const location = useLocation().pathname
    const handleLogout = () => {
        console.log(token)
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure ?',
            text: 'You need to login again afterward',
            showCancelButton: true,
            confirmButtonText: 'Yes im sure',
        }).then(res => {
            if (res.isConfirmed) {
                axios.post(`http://127.0.0.1:8000/api/user/logout`, {} , {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json'
                    }
                })
                    .then(data => {
                        const fetch_user = data.data
                        console.log(fetch_user)
                        localStorage.removeItem('token')
                        window.location.href = '/'
                    })
            }
        })
    }
    return (
        <nav className="py-2">
            <div className="col-10 d-flex justify-content-between align-items-center mx-auto">
                {location.includes('home') && (
                    <span className='fw-semibold'>Welcome to HI-Galery</span>
                )}
                {!location.includes('home') && (
                    <Link to={'/home'} className='text-decoration-none btn btn-light'>
                        <i className=' bi bi-chevron-left'></i>
                        <span className='fw-semibold'>Back to home</span>
                    </Link>
                )}
                {!user && (
                    <div className="d-flex gap-2">
                        <Link to={'/login'} className='btn btn-light shadow-sm'>Login</Link>
                    </div>
                )}
                {user && (
                    <>
                        {/* <div className="d-flex gap-2">
                            <Link to={'/'} className='btn btn-light shadow-sm rounded rounded-2'>
                                <img src={`http://127.0.0.1:8000/${user?.profile_image}`} alt="" className='profile-image rounded-circle me-2' />
                                <span>@{user?.username}</span>
                            </Link>
                        </div> */}
                        <div className="pages d-none align-items-center gap-2 gap-md-4 d-md-flex">
                            <Link to={'/trending'} className='text-decoration-none btn btn-link'>
                                <i className='bi bi-arrow-up me-2'></i>
                                Trending
                            </Link>
                            <Link to={'/search'} className='text-decoration-none btn btn-link'>
                                <i className='bi bi-search me-2'></i>
                                Search
                            </Link>
                            <Link to={'/'} className='text-decoration-none btn btn-link'>
                                <i className='bi bi-patch-check-fill me-2'></i>
                                Following
                            </Link>
                        </div>
                        <div className="dropdown">
                            <button className="btn btn-light dropdown-toggle rounded rounded-3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src={`http://127.0.0.1:8000/${user?.profile_image}`} alt="" className='profile-image rounded-circle me-2' />
                                <span className='fw-semibold'>@{user?.username}</span>
                            </button>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to={'/profile'}><i className='bi bi-person me-2'></i>Profile</Link></li>
                                <li><Link className="dropdown-item" to={'/'}><i className='bi bi-plus-square me-2'></i>Post</Link></li>
                                <li><Link className="dropdown-item" to={'/'}><i className='bi bi-heart me-2'></i>Favorite</Link></li>
                                <li><Link className="dropdown-item d-md-none" to={'/'}><i className='bi bi-arrow-up me-2'></i>Trending</Link></li>
                                <li><Link className="dropdown-item d-md-none" to={'/'}><i className='bi bi-search me-2'></i>Search</Link></li>
                                <li><Link className="dropdown-item d-md-none" to={'/'}><i className='bi bi-patch-check me-2'></i>Following</Link></li>
                                <li className='d-flex justify-content-center'>
                                    <button type='button' className="btn btn-danger w-75" onClick={() => handleLogout()}>
                                        <i className='bi bi-box-arrow-left me-2'></i>Logout</button>
                                </li>
                            </ul>
                        </div>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navbar