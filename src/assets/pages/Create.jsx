import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import '../css/post.css'
const Create = () => {
    const [user, setUser] = useState()
    const [categories, setCategory] = useState([])
    const [image, setImage] = useState()
    const token = localStorage.getItem('token')
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/user/account', {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
        }).then(data => {
            const fetched = data.data
            setUser(fetched)
        })
        setTimeout(() => {
            axios.get('http://127.0.0.1:8000/api/categories')
                .then(data => {
                    const fetched = data.data
                    setCategory(fetched)
                })
        }, 1000);
    }, [])
    const handleImage = (e) => {
        let img = e.target.files
        console.log(img[0])
        setImage(URL.createObjectURL(img[0]))
    }
    const handlePost = () => {
        const title = document.getElementById('title').value
        const caption = document.getElementById('caption').value
        const category_id = document.getElementById('category').value
        const imageElem = document.getElementById('image').files[0]
        if (title && caption && category_id && imageElem) {

            const formdata = new FormData()
            formdata.append('title', title)
            formdata.append('caption', caption)
            formdata.append('category_id', category_id)
            formdata.append('image', imageElem)
            formdata.append('user_id', user.id)

            axios.post('http://127.0.0.1:8000/api/post/add', formdata, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json'
                }
            })
                .then(data => {
                    const fetched = data.data
                    console.log(fetched)
                })
        } else {
            console.log('nga')
        }
    }
    console.log(user)

    return (
        <>
            <Navbar />
            <form action="" className='col-10 col-lg-6 mx-auto shadow rounded-4 p-4'>
                {/* Create a new Post for @{user?.username} */}
                <p className='fs-4 m-0 fw-semibold'>Create a new Post</p>
                <p className='fs-6 m-0 fw-light'>Express yourself with art into HI-gallery</p>
                <div className="d-flex flex-column gap-2 mt-4">
                    <img src={image ? image : '/vite.svg'} alt="" className='post-image-single rounded-4 w-50' />
                    <input type="text" placeholder='Add a title' className='form-control' id='title'/>
                    <input type="text" placeholder='Add a caption' className='form-control' id='caption'/>
                    <select name="" id="category" className='form-select'>
                        <option defaultValue value="default" hidden>Select a category</option>
                        {categories.map((c) => {
                            return (
                                <option value={c.id} className='text-capitalize'>{c.name}</option>
                            )
                        })}
                    </select>
                    <input type="file" name="" id="image" accept='image/*' className='form-control' onChange={(e) => handleImage(e)} />
                    <button type="button" className='btn btn-primary' onClick={()=>handlePost()}>Post</button>
                </div>
            </form>
        </>
    )
}

export default Create