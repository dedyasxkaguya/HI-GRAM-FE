import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import bad_word from '../../data/words.json'
// import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import '../../css/post.css'
import Swal from 'sweetalert2'

const Post = () => {
    const [data, setData] = useState()
    const [user, setUser] = useState()
    const [isFollow, setFollow] = useState(false)
    const [isLike, setLike] = useState(false)
    const [isOnline, setOnline] = useState(false)
    const [comment, setComment] = useState()
    const [isComment, setCommentOpen] = useState()
    const { post } = useParams()
    let i = 0
    const token = localStorage.getItem('token')
    useEffect(() => {
        if (token !== null) {
            axios.get(`http://127.0.0.1:8000/api/user/account`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json'
                }
            })
                .then(data => {
                    const fetch_user = data.data
                    if (user !== 'null blyat') {
                        setUser(fetch_user)
                        console.log(user)
                    }
                })
        }
        axios.get(`http://127.0.0.1:8000/api/post/${post}`)
            .then(data => {
                const fetched = data.data
                setData(fetched)
                // console.log(fetched)
                console.log(fetched?.user?.profile_image?.includes('https://') ? setOnline(true) : setOnline(false))
                axios.get(`http://127.0.0.1:8000/api/post/like/${fetched.id}/check`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json'
                    }
                })
                    .then(data => {
                        const checkLike = data.data
                        console.log(checkLike)
                        setLike(checkLike.status)

                        setTimeout(() => {

                            document.querySelectorAll('.placeholder').forEach((a) => {
                                a.classList.remove('placeholder')
                            })
                            document.querySelectorAll('.placeholder-glow').forEach((a) => {
                                a.classList.remove('placeholder-glow')
                            })

                        }, 1000);
                    })
                const formdata = new FormData()
                formdata.append('following_id', fetched.user.id)
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
    }, [])

    const check = (text) => {
        let isFound = false
        const checking = text.split(" ")
        checking.forEach(c => {
            bad_word.includes(c) ? isFound = true : false
        });

        return isFound ? true : false

    }

    const handleCommentPost = () => {
        Swal.fire({
            icon: 'info',
            title: 'Wait a second...',
            text: 'Fetching our API',
            showConfirmButton: false,
            toast: true
        })
        if (user !== undefined) {
            if (comment) {
                const isCheck = check(comment)
                if (isCheck == false) {

                    const formdata = new FormData();

                    console.log({
                        'user_id': user?.id,
                        'post_id': data?.id,
                        'comment': comment
                    })

                    formdata.append('user_id', user?.id)
                    formdata.append('post_id', data?.id)
                    formdata.append('comment', comment)

                    axios.post('http://127.0.0.1:8000/api/comment/add', formdata)
                        .then(dataF => {
                            const fetched = dataF.data
                            console.log(fetched)
                            if (user?.id !== data?.user?.id) {
                                const formdata0 = new FormData()
                                formdata0.append('user_id', data?.user?.id)
                                formdata0.append('post_id', data?.id)
                                formdata0.append('type', 'COMMENT')
                                formdata0.append('comment', comment)
                                formdata0.append('body', 'Comment at your post')
                                axios.post(`http://127.0.0.1:8000/api/notification/add`, formdata0, {
                                    headers: {
                                        Authorization: `Bearer ${token}`,
                                        Accept: 'application/json'
                                    }
                                })
                            }
                            Swal.fire({
                                icon: 'success',
                                title: 'success',
                                text: 'Success posting your comment',
                                footer: 'reloading in 1 s',
                                showConfirmButton: false,
                                toast: true
                            })
                            setTimeout(() => {
                                navigation.reload()
                            }, 1000);
                        })
                } else {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Blocked',
                        text: 'Inappropriate content detected',
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                        toast: true
                    })
                }
            } else {
                Swal.fire({
                    icon: 'info',
                    title: 'Uncompleted',
                    text: 'You need to fill the comment',
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                    toast: true
                })
                setTimeout(() => {
                    navigation.reload()
                }, 2400);
            }
        } else {

            Swal.fire({
                icon: 'warning',
                title: 'Unauthorized',
                text: 'You need to login first',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                toast: true
            })
        }


    }
    const handleComment = (e) => {
        setComment(e.target.value)
    }
    const handleFollow = () => {
        const formdata = new FormData()
        formdata.append('following_id', data?.user?.id)
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
                    text: 'You have follow @' + data?.user?.username,
                    toast: true,
                    showConfirmButton: false
                })
                const formdata0 = new FormData()
                formdata0.append('user_id', data?.user?.id)
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
                    text: 'You have unfollow @' + data?.user?.username,
                    toast: true,
                    showConfirmButton: false
                })
                setTimeout(() => {
                    navigation.reload()
                }, 1024);
            }
        })
    }
    const handleCommentOpen = () => {
        setCommentOpen(!isComment)
    }
    const handleLike = () => {
        Swal.fire({
            icon: 'info',
            title: 'Wait a second...',
            text: 'Processing your request',
            showConfirmButton: false,
            toast: true
        })
        axios.get(`http://127.0.0.1:8000/api/post/like/${data.id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
        })
            .then(data0 => {
                const fetched = data0.data
                console.log(fetched)
                if (fetched.status || !fetched.status) {
                    if (fetched.status) {
                        const formdata0 = new FormData()
                        formdata0.append('user_id', data?.user?.id)
                        formdata0.append('post_id', data?.id)
                        formdata0.append('type', 'LIKE')
                        formdata0.append('body', 'Like your post')
                        axios.post(`http://127.0.0.1:8000/api/notification/add`, formdata0, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                Accept: 'application/json'
                            }
                        })
                            .then((notif) => {
                                console.log(notif.data)
                                // navigation.reload()
                            })
                    }
                    setTimeout(() => {
                        navigation.reload()
                    }, 1000);
                }
            })
        // setTimeout(() => {
        // }, 144);
    }
    return (
        <>
            <div className="overflow-x-hidden">
                <Navbar />
                <div className="row justify-content-center placeholder-glow mt-4">
                    <div className='col-lg-5 col-10' key={data?.id}>
                        <div className=" overflow-hidden">
                            <img src={`http://127.0.0.1:8000/${data?.image}`} alt="" className='rounded-4 post-image-single object-fit-cover my-2 placeholder' />
                            {/* <div className="" style={{ backim }}></div> */}
                        </div>
                    </div>
                    <div className="col-lg-4 col-10 bg-light rounded-4 my-2 d-flex flex-column justify-content-between74">
                        <div className="">
                            <div className="d-flex gap-2 align-items-center text-center px-2">
                                <img src={`${isOnline ? `${data?.user?.profile_image}` : `http://127.0.0.1:8000/${data?.user?.profile_image}`} `} alt="" className='rounded-circle profile-image-post object-fit-cover my-3 placeholder' />
                                <span className='fw-semibold placeholder'>@{data?.user?.username}</span>
                                {data?.user?.id !== user?.id && (
                                    <>
                                        <i className="bi bi-circle-fill fs-10 fs-5"></i>
                                        <button type='button' onClick={() => handleFollow()} className='btn btn-light text-decoration-none text-primary placeholder'>
                                            {isFollow ? 'Unfollow' : 'Follow'}
                                        </button>
                                    </>
                                )}
                            </div>
                            <div className="comment-box-dekstop pb-2">
                                <div className="p-2">
                                    <img src={`http://127.0.0.1:8000/${data?.user?.profile_image}`} alt="" className='rounded-circle profile-image-post-small me-2 object-fit-cover placeholder' />
                                    <span className='fw-semibold placeholder'>@{data?.user?.username}</span>
                                    <span className='fw-light fs-6 placeholder'> {data?.caption}</span><br />
                                    <span className='fw-light opacity-75 text-secondary fs-7 placeholder'>{data?.formattedTime}</span>
                                </div>
                            </div>
                            <div className="d-flex gap-2 flex-column p-2">
                                {data?.commentCount == 0 && (
                                    'There is not a comment yet.'
                                )}
                                {data?.comment?.map((c) => {
                                    if (i < 2) {
                                        i++
                                        return (
                                            <div className="d-flex align-items-center my-2">
                                                <img src={`${isOnline ? `${c?.user?.profile_image}` : `http://127.0.0.1:8000/${c?.user?.profile_image}`} `} alt="" className='rounded-circle profile-image-post me-2 object-fit-cover placeholder' />
                                                <div className="m-0 d-flex flex-column">
                                                    <Link className='fw-semibold lh-1 fs-7 text-decoration-none text-black placeholder' to={`/${c.user?.username}`}>
                                                        @{c.user?.username}
                                                        {data?.user?.username == c.user?.username ?
                                                            <span className='text-secondary opacity-75 placeholder'> Creator</span> : ''}
                                                    </Link>
                                                    <span className='fw-light lh-base placeholder'>{c.comment}</span>
                                                    <span className='fw-ultralight text-secondary fs-7 opacity-75 lh-1 placeholder'>{c.formattedTime}</span>
                                                </div>
                                            </div>
                                        )
                                    }
                                })}
                                {data?.commentCount > 3 && (
                                    <a className='' style={{ cursor: 'pointer' }} onClick={() => handleCommentOpen()}>Read more comment</a>
                                )}
                            </div>
                        </div>
                        {isComment && (
                            <section id='commentFloat' className='position-fixed bg-light rounded-4'>
                                <button type="button" className='btn btn-link text-decoration-none' onClick={() => handleCommentOpen()}>
                                    <i className="bi bi-chevron-left"></i>
                                    Exit
                                </button>
                                <div id="box" className='p-2'>
                                    {data?.comment?.map((c) => {
                                        return (
                                            <div className="d-flex align-items-center mb-4 mx-2">
                                                <img src={`http://127.0.0.1:8000/${c?.user?.profile_image}`} alt="" className='rounded-circle profile-image-post me-2 object-fit-cover' />
                                                <div className="m-0 d-flex flex-column">
                                                    <Link className='fw-semibold lh-1 fs-7 text-decoration-none text-black' to={`/${c.user?.username}`}>@{c.user?.username}
                                                        {data?.user?.username == c.user?.username ? <span className='text-secondary opacity-75'> Creator</span> : ''}
                                                    </Link>
                                                    <span className='fw-light lh-sm'>{c.comment}</span>
                                                    <span className='fw-ultralight text-secondary fs-7 opacity-75 lh-1'>{c.formattedTime}</span>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="fs-7 d-flex gap-2 py-2 mx-2">
                                    <input type="text" className="form-control w-75" id="" placeholder="Write a comment" onChange={(e) => handleComment(e)} />
                                    <button className='comment-input p-2 w-25 btn btn-outline-primary d-flex justify-content-center align-items-center' onClick={() => handleCommentPost()}>Post</button>
                                </div>
                            </section>
                        )}
                        <section>
                            <div className="d-flex gap-2 fs-6 py-2 placeholder">
                                <a className=' text-decoration-none text-black' style={{ cursor: 'pointer' }} onClick={() => handleLike()}>
                                    <i className={`bi me-2 ${isLike ? 'bi-heart-fill text-danger' : 'bi-heart'}`}></i>
                                    {data?.likeCount}
                                </a>
                                <a className='text-decoration-none text-black' style={{ cursor: 'pointer' }} onClick={() => handleCommentOpen()}>
                                    <i className='bi bi-chat me-2'></i>
                                    {data?.commentCount}
                                </a>
                            </div>
                            <div className="fs-7 d-flex gap-2 py-2">
                                <input type="text" className="form-control w-75" id="" placeholder="Write a comment" onChange={(e) => handleComment(e)} />
                                <button className='comment-input p-2 w-25 btn btn-outline-primary d-flex justify-content-center align-items-center' onClick={() => handleCommentPost()}>Post</button>
                            </div>
                        </section>
                        {/* <button type='button'>Post</button> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Post