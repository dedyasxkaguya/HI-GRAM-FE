import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import Followbase from '../components/Followbase'

const Profile = () => {
    const [user, setUser] = useState()
    const [flag, setFlag] = useState(false)
    const [nation, setNation] = useState([])
    const token = localStorage.getItem('token')
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/user/account/all`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
        })
            .then(data => {
                const fetched = data.data
                setUser(fetched)
                console.log(fetched)
                setFlag(false)
            })
        setTimeout(() => {
            axios.get('https://restcountries.com/v3.1/independent?status=true&fields=name')
                .then(data => {
                    const fetched = data.data
                    setNation(fetched)
                })
        }, 1000);
    }, [])
    const handleProfileImage = (e) => {
        console.log(URL.createObjectURL(e.target.files[0]))
    }
    const handleNationality = (e) => {
        axios.get(`https://restcountries.com/v3.1/name/${e.target.value}?fields=flags`)
            .then(data => {
                const fetched = data.data
                setFlag(fetched[0].flags.svg)
            })
    }

    // const handleLogout = () => {
    //     Swal.fire({
    //         icon: 'warning',
    //         title: 'Are you sure',
    //         text: 'Do you want to log out from dedyasnime',
    //         showCancelButton: true,
    //         cancelButtonText: 'No , i am not',
    //         confirmButtonColor: '#198754',
    //         confirmButtonText: 'Yes',
    //         cancelButtonColor: '#ffc107'
    //     }).then(res => {
    //         if (res.isConfirmed) {
    //             Swal.fire({
    //                 icon: 'success',
    //                 title: 'success',
    //                 text: 'Redirecting to home screen',
    //                 showConfirmButton: false,
    //                 toast: true
    //             })
    //             setTimeout(() => {
    //                 location.href = '/'
    //             }, 2000);
    //         }
    //     })
    // }
    const handleUsername = (e) => {
        if (e.target.value.includes(' ')) {
            document.getElementById('invalidUsername').style.display = 'block'
        } else {
            document.getElementById('invalidUsername').style.display = 'none'
        }
    }
    return (
        <>
            <Navbar />
            <div className='d-flex flex-column flex-md-row raleway' style={{ minHeight: '100dvh' }}>
                <div className="p-4 sideBar bg-gray d-flex align-items-center gap-4 flex-column bg-light">
                    <div className='px-4 p-2 bg-white rounded-pill shadow'>
                        <span className='text-secondary'>Profile</span> @{user?.username}
                    </div>
                    <img src={`http://127.0.0.1:8000/${user?.profile_image}`} alt="" className='big-profile-images rounded-circle' id='profile' />
                    <div className=" d-flex justify-content-center gap-2">
                        <Link type='button' className='btn btn-light fs-7 fw-semibold' to={'/profile/follower'}>Follower {user?.followerCount}</Link>
                        <Link type='button' className='btn btn-light fs-7 fw-semibold' to={'/profile/following'}>Following  {user?.followingCount}</Link>
                    </div>
                    <div className="d-flex gap-2 align-items-end flex-md-column align-items-md-start">
                        <label htmlFor="" className='' style={{ fontSize: '12px' }}>Change your profile picture
                            <input type="file" name="" id="imageElem" className='form-control' accept='image/*' onChange={(e) => handleProfileImage(e)} />
                        </label>
                        <button type="button" className='btn btn-outline-success'>
                            <i className='bi bi-save me-2 d-none d-md-inline'></i>
                                Save 
                            <span className='d-none d-md-inline ms-md-1'>
                                 Changes
                            </span>
                        </button>
                    </div>
                    {/* <div className="d-flex gap-2 my-auto flex-column">
                        <button type='button' className='btn btn-danger' onClick={() => handleLogout()}>Logout</button>
                        <button type="button" className='btn btn-outline-danger'>Delete account</button>
                    </div> */}
                </div>
                <div className="mainBar p-4 d-flex flex-column justify-content-between">
                    <div className="row row-cols-1 row-cols-md-2">
                        <div className="">
                            <span className='p-2 fw-bold'>
                                Profile Setting
                            </span>
                            <form action="" className='p-4 d-flex gap-2 flex-column w-100'>
                                <label>Username</label>
                                <input type="text" id='name' placeholder={`@${user?.username}`} className='form-control' onChange={(e) => handleUsername(e)} />
                                <span className='invalid-feedback' id='invalidUsername'>Username cant have space</span>
                                <label>Full Name</label>
                                <input type="text" id='full_name' placeholder={user?.name} className='form-control' />
                                <label>Email</label>
                                <input type="email" id='email' placeholder={user?.email} className='form-control' disabled />
                                <label>Nationality</label>
                                <div className="d-flex gap-4">
                                    <img src={flag ? flag : user?.flag} alt="" className='flag-image-preview border rounded shadow' />
                                    <select name="" id="nationality" className='form-control' onChange={(e) => handleNationality(e)}>
                                        <option value={user?.nationality}>{user?.nationality}</option>
                                        {
                                            nation.map((n) => {
                                                return (
                                                    <option value={n.name.official} key={n.name.official}>{n.name.common}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div className="">
                            {/* <span className='p-2 fw-bold'>
                                Top Comments
                            </span>
                            <div className="p-2">
                                {user?.comment.map((c) => {
                                    return (
                                        <>
                                            <div className='p-2 my-2 rounded-2 border'>
                                                <span className='fw-semibold'>{c?.anime_name ? c?.anime_name : c.anime_id}</span>
                                                <br />
                                                <p className='m-0'>
                                                    <span className='fw-semibold me-2'>@{user?.username}</span>
                                                    <span>{c.comment}</span>
                                                </p>
                                                <span className='fs-8 text-secondary opacity-75'>{c.formattedTime}</span>
                                            </div>
                                        </>
                                    )
                                })}
                            </div> */}
                            <span className='p-2 fw-bold'>
                                Favorites Anime
                            </span>
                            <div className="favoriteBox p-2 my-2">
                                {/* <HandleComment /> */}
                                {/* {favorites.map((c) => {
                                return (
                                    <>
                                        <div className='p-2 my-2 rounded-4 border d-flex flex-column' >
                                            <img src={c.image} alt="" className='rounded-2' style={{ maxWidth: '10dvw' }} />
                                            <span className='fw-semibold text-truncate' style={{ maxWidth: '10dvw' }}>{c.title}</span>
                                        </div>
                                    </>
                                )
                            })} */}
                            </div>
                        </div>
                    </div>
                    <div className="p-4 col-12">
                        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4">
                            {user?.post?.map((d) => {
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
                                                {/* <Link className='text-decoration-none btn btn-sm btn-secondary opacity-50 rounded-5 d-flex align-items-start fs-8 fs-md-6'>
                                                    #{d.category?.name}
                                                </Link> */}
                                            </div>
                                            <Link to={`/post/${d.slug}`}
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
            </div>
        </>
    )
}

export default Profile