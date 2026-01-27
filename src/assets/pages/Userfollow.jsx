import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import axios from 'axios'
import Followbase from '../components/Followbase'

const Userfollow = () => {
  const { type } = useParams()
  const [user, setUser] = useState()
  const [follow, setFollow] = useState([])
  const [following, setFollowing] = useState([])
  const token = localStorage.getItem('token')
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/user/account`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    })
      .then(data => {
        const fetched = data.data
        setUser(fetched)
        axios.get(`http://127.0.0.1:8000/api/user/follows/${fetched.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
          }
        })
          .then(data => {
            const fetched_follows = data.data
            setFollow(fetched_follows.followers)
            setFollowing(fetched_follows.following)
            console.log(following)
          })
      })
    console.log(follow)
  }, [])
  return (
    <>
      <Navbar />
      <div className='d-flex flex-column flex-md-row raleway' style={{ minHeight: '100dvh' }}>
        <div className="p-4 sideBar bg-gray d-flex align-items-center gap-4 flex-column bg-light">
          <div className='px-4 p-2 bg-white rounded-pill shadow'>
            <span className='text-secondary'>Following and Follower</span> @{user?.username}
          </div>
          <img src={`http://127.0.0.1:8000/${user?.profile_image}`} alt="" className='small-profile-images rounded-circle' id='profile' />
        </div>
        <div className="">
          <div className="row row-cols-2 m-2 w-100">
            <div className="col d-flex justify-content-center align-items-start">
              <Link to={'/profile/following'} className={`${type == 'following' ? 'text-decoration-underline text-primary offset-1 ' : ''} btn btn-light`}>Following</Link>
            </div>
            <div className="col d-flex justify-content-center align-items-start">
              <Link to={'/profile/follower'} className={`${type == 'follower' ? 'text-decoration-underline text-primary offset-1 ' : ''} btn btn-light`}>Follower</Link>
            </div>
          </div>
          <div className="m-4 d-flex flex-column gap-2">

            <input type="text" placeholder='Search' className='form-control' />
            {type == 'follower' &&
              follow.map((f) => {
                return (
                  <Followbase f={f} user={user} />
                )
              })
            }
            {type == 'following' &&
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