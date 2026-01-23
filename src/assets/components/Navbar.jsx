import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import '../css/home.css'
const Navbar = () => {
    const [user, setUser] = useState(false)
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
    }, [])
    const location = useLocation().pathname
    console.log(location.includes('post'))
    return (
        <nav className="py-4">
            <div className="col-10 d-flex justify-content-between align-items-center mx-auto">
                {!location.includes('post') && (
                    <span className='fw-semibold'>Welcome to HI-Galery</span>
                )}
                {location.includes('post') && (
                    <Link to={uuid ? `/${uuid}` : '/ '} className='text-decoration-none btn btn-light'>
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
                            <Link to={''} className='text-decoration-none btn btn-link'>
                                <i className='bi bi-arrow-up me-2'></i>
                                Trending
                            </Link>
                            <Link to={''} className='text-decoration-none btn btn-link'>
                                <i className='bi bi-search me-2'></i>
                                Search
                            </Link>
                            <Link to={''} className='text-decoration-none btn btn-link'>
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
                                <li><Link className="dropdown-item" to={'/'}><i className='bi bi-person me-2'></i>Profile</Link></li>
                                <li><Link className="dropdown-item" to={'/'}><i className='bi bi-plus-square me-2'></i>Post</Link></li>
                                <li><Link className="dropdown-item" to={'/'}><i className='bi bi-heart me-2'></i>Favorite</Link></li>
                                <li><Link className="dropdown-item d-md-none" to={'/'}><i className='bi bi-arrow-up me-2'></i>Trending</Link></li>
                                <li><Link className="dropdown-item d-md-none" to={'/'}><i className='bi bi-search me-2'></i>Search</Link></li>
                                <li><Link className="dropdown-item d-md-none" to={'/'}><i className='bi bi-patch-check me-2'></i>Following</Link></li>
                                <li><Link className="dropdown-item text-danger" to={'/login'}><i className='bi bi-box-arrow-left me-2'></i>Logout</Link></li>
                            </ul>
                        </div>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navbar