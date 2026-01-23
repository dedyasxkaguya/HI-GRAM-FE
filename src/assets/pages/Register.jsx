import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Register = () => {
    const [isUserValid, setUserValid] = useState(true)
    const [isEmailValid, setEmailValid] = useState(true)
    const [isPasswordValid, setPasswordValid] = useState(true)
    const [countries, setCountry] = useState([])
    const [country,setNationality] = useState()
    const [flag,setFlag] = useState(false)
    useEffect(()=>{
        axios.get('https://restcountries.com/v3.1/all?fields=name')
        .then(data=>{
            const fetched = data.data
            setCountry(fetched)
        })
    },[])
    const handleCountry = (e) => {
        setNationality(e.target.value)
        axios.get(`https://restcountries.com/v3.1/name/${e.target.value}?fields=flags`)
        .then(data=>{
            const fetched = data.data
            setFlag(fetched[0].flags.svg)
        })
    }
    const handleRegister = () => {
        if(country && flag && isUserValid){
            const name = document.getElementById('name').value
            const email = document.getElementById('email').value
            const password = document.getElementById('password').value
            const formdata = new FormData()
            formdata.append('name',name)
            formdata.append('email',email)
            formdata.append('password',password)
            formdata.append('nationality',country)
            formdata.append('flag',flag)
            axios.post('http://127.0.0.1:8000/api/user/register',formdata)
            .then(data=>{
                const fetched = data.data
                console.log(fetched)
                Swal.fire({
                    icon:'success',
                    title:'Success',
                    text:'Welcome to HI-galery!',
                    footer:'Redirecting in 2s',
                    showConfirmButton:false,
                    toast:true
                })
                setTimeout(() => {
                    location.href=`/${fetched.slug}/home`
                }, 3000);
            })
            .catch(e=>{
                if(e.status==422){
                    console.log('Username tersebut sudah diambil')
                }
            })
        }else{
            console.log('smth wrong nigga')
        }
    }
const handleName = (e) => {
    if(e.target.value.includes(' ')){
        setUserValid(false)
    }else{
        setUserValid(true)
    }
}    
const handleEmail = (e) => {
    if(e.target.value.includes('@') && e.target.value.includes('.')){
        setEmailValid(true)
    }else{
        setEmailValid(false)
    }
}
const handlePassword = (e) => {
    if(e.target.value.length<8){
        setPasswordValid(false)
    }else{
        setPasswordValid(true)
    }
}

    return (
        <div className="h-100dvh d-flex justify-content-center align-items-center">
            <div className='bg-light col-10 col-md-8 col-lg-4'>
                <form action="" className='p-4 rounded-4 shadow-sm raleway'>
                    <h2>Welcome !</h2>
                    <p className='fw-light'>Create your account now</p>
                    {/* Username */}
                    <div className={`form-floating ${isUserValid ? '' : 'is-invalid'} mb-2`}>
                        <input type="username" className={`form-control ${isUserValid ? '' : 'is-invalid'}`} id="name"
                            placeholder="Username" required autoFocus onChange={(e)=>handleName(e)}/>
                        <label htmlFor="floatingInputGroup1">
                            <i className='bi bi-person me-2'></i>
                            Username</label>
                    </div>
                    {!isUserValid && (
                        <div className="invalid-feedback">
                            Username cant contain space
                        </div>
                    )}
                    {/* Email */}
                    <div className={`form-floating ${isEmailValid ? '' : 'is-invalid'} mb-2`}>
                        <input type="email" className={`form-control ${isEmailValid ? '' : 'is-invalid'}`} id="email"
                            placeholder="email" required onChange={(e)=>{handleEmail(e)}}/>
                        <label htmlFor="floatingInputGroup2">
                            <i className='bi bi-envelope me-2'></i>
                            Email</label>
                    </div>
                    {!isEmailValid && (
                        <div className="invalid-feedback">
                            Please enter correct email
                        </div>
                    )}
                    {/* Password */}
                    <div className={`form-floating ${isPasswordValid ? '' : 'is-invalid'} mb-2`}>
                        <input type="password" className={`form-control ${isPasswordValid ? '' : 'is-invalid'}`} id="password"
                            placeholder="password" required onChange={(e)=>handlePassword(e)}/>
                        <label htmlFor="floatingInputGroup3">
                            <i className='bi bi-lock me-2'></i>
                            Password</label>
                    </div>
                    {!isPasswordValid && (
                        <div className="invalid-feedback">
                            Min 8 characters...
                        </div>
                    )}
                    {/* Nationality */}
                    <div className="d-flex gap-2 align-items-center">
                        <div className="">
                            <img src={flag ? flag : 'https://flagcdn.com/w320/jp.png'} alt="" className='border rounded-2 flag-image' />
                        </div>
                        <select className="form-select" aria-label="" onChange={(e)=>{handleCountry(e)}}>
                            <option defaultValue={true} hidden>Nationality</option>
                            {countries.map((c)=>{
                                return(
                                    <option value={c.name.official} key={c.name.official}>{c.name.common}</option>
                                )
                            })}
                        </select>
                    </div>
                    <Link to={'/login'} className='text-decoration-none text-secondary link-underline-secondary fs-7'>Already have an account? Login here</Link>
                    <br />
                    <button type="button" className='btn btn-outline-primary w-100 py-2' onClick={()=>handleRegister()}>Register</button>
                </form>
            </div>
        </div>
    )
}

export default Register