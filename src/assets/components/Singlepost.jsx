import React from 'react'
import { Link } from 'react-router-dom'

const Singlepost = (d) => {
    const data = d.data
    // const isLoaded = isLoad
    // console.log(isLoad)
    return (
        <Link className='col text-decoration-none placeholder-glow mb-4' key={data.id} to={`/post/${data.slug}`}>
            <div className=" overflow-hidden">
                <img src={`http://127.0.0.1:8000/${data.image}`} alt="" className='rounded-4 post-image object-fit-cover w-100 my-2 placeholder' />
                <div className='text-truncate w-100 pe-2 text-decoration-none text-black fs-7 fs-md-6'>
                    <span className='fw-semibold placeholder'>@{data.user?.username}</span> in
                    <span className='fw-light text-capitalize'> #{data.category?.name}</span>
                    <br />
                    <span className='fw-light placeholder'> {data.title}</span>
                </div>
                <p className='fw-light opacity-75 text-secondary fs-8 m-0 placeholder'>{data.formattedTime}</p>
            </div>
        </Link>
    )
}

export default Singlepost