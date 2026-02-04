import React, { useEffect, useState } from 'react'
import '../css/home.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
const Login = () => {
    const [isUserValid, setUserValid] = useState(true)
    // const [isUserValid, setUserValid] = useState(true)
    const token = localStorage.getItem('token')
    useEffect(()=>{
        setTimeout(() => {
            if(token.includes('|')){
                location.href='/home'
            }
        }, 1000);
    },[])
    setTimeout(() => {
        setUserValid(true)
    }, 2000);
    const handleLogin = () => {
        Swal.fire({
            title:'Wait a second...',
            text:'Fetching our API',
            showConfirmButton:false,
            toast:true
        })
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value

        const formdata = new FormData()
        formdata.append('email', email)
        formdata.append('password', password)

        axios.post('http://127.0.0.1:8000/api/user/login', formdata)
            .then(data => {
                const fetched = data.data
                console.log(fetched)
                localStorage.setItem('token',fetched.access_token)
                if (fetched.status) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'You have succesfully login to HI-galery',
                        footer: 'Redirecting in 2s',
                        showConfirmButton: false,
                        toast: true
                    })
                    setTimeout(() => {
                        location.href = `/home`
                    }, 2000);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: fetched.data,
                        footer: 'Try again',
                        showConfirmButton: false,
                        toast: true,
                        timer:2000
                    })
                }
            })
    }
    return (
        <div className="h-100dvh d-flex justify-content-center align-items-center">
            <div className='bg-light col-10 col-md-8 col-lg-4 rounded-4 shadow'>
                <form action="" className='p-4 raleway'>
                    <h2>Hello !</h2>
                    <p className='fw-light'>Login to access features</p>
                    <div className="input-group has-validation">
                        <div className={`form-floating ${isUserValid ? '' : 'is-invalid'} mb-2`}>
                            <input type="email" className={`form-control ${isUserValid ? '' : 'is-invalid'}`} id="email"
                                placeholder="Username" required />
                            <label htmlFor="floatingInputGroup2">
                                <i className='bi bi-envelope me-2'></i>
                                Email</label>
                        </div>
                        {!isUserValid && (
                            <div className="invalid-feedback">
                                Please choose a username.
                            </div>
                        )}
                    </div>
                    <div className={`form-floating mb-4`}>
                        <input type="text" className={`form-control`} id="password"
                            placeholder="Username" required />
                        <label htmlFor="floatingInputGroup3">
                            <i className='bi bi-lock me-2'></i>
                            Password</label>
                    </div>
                    <Link to={'/register'} className='text-decoration-none text-secondary link-underline-secondary fs-7'>Doesn't have an account? Register here</Link>
                    <br />
                    <button type="button" className='btn btn-outline-primary w-100 py-2' onClick={() => handleLogin()}>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login