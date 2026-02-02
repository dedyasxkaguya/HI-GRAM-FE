import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
// import '../css/post.css'
const Followbase = ({ f, user }) => {
  const token = localStorage.getItem('token')
  const [isFollow, setFollow] = useState()
  useEffect(() => {
    const formdata = new FormData()
    formdata.append('following_id', f.id)
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
  }, [])
  const handleFollow = () => {
    console.log(token)
    const formdata = new FormData()
    formdata.append('following_id', f.id)
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
          text: 'You have follow @' + f.username,
          toast: true,
          showConfirmButton: false
        })
        setTimeout(() => {
          navigation.reload()
        }, 1024);
      } else {
        Swal.fire({
          icon: 'success',
          // title:'Its okay',
          text: 'You have unfollow @' + f.username,
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
    <div className="w-100 bg-light rounded-4">
      <div className="d-flex align-items-center my-2 p-2 justify-content-between">
        <div className="m-0 d-flex align-items-center flex-grow-1">
          <img src={`http://127.0.0.1:8000/${f?.profile_image}`} alt="" className='rounded-circle profile-image-follow me-2 object-fit-cover' />
          <div className="d-flex flex-column">
            <span className='fw-semibold lh-1 fs-6'>@{f.username}</span>
            <span className='fw-light lh-base'>{f.name}</span>
            {/* <small className='fw-light lh-base text-secondary fs-7'>{f.bio}</small> */}
            <small className='text-secondary text-truncate bio'>
              {f.bio}
            </small>
          </div>
        </div>
        {/* <span className='fw-ultralight text-secondary fs-7 opacity-75 lh-1'>{data.formattedTime}</span> */}
        {f.user?.id !== user?.id && (
          <>
            <button type='button' onClick={() => handleFollow()} className='btn btn-light text-decoration-none text-primary ms-4'>
              {isFollow ? 'Unfollow' : 'Follow'}
              {/* Follow */}
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Followbase