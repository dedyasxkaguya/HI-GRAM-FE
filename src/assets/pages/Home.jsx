import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../css/home.css'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Singlepost from '../components/Singlepost'
const Home = () => {
    const [data, setData] = useState([])
    const token = localStorage.getItem('token')
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/posts')
            .then(data => {
                const fetched = data.data
                setData(fetched)
                setTimeout(() => {
                    
                    document.querySelectorAll('.placeholder').forEach((a) => {
                        a.classList.remove('placeholder')
                    })
                    document.querySelectorAll('.placeholder-glow').forEach((a) => {
                        a.classList.remove('placeholder-glow')
                    })

                }, 1000);
            })
        axios.get('http://127.0.0.1:8000/api/user/account', {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
        })
            .then(data => {
                const fetched = data.data
                // setData(fetched)
                console.log(fetched)
            })
    }, [])
    return (
        <>
            <Navbar />
            <div className='bg-light h-100dvh w-100 d-flex justify-content-center'>
                <div className="col-10">
                    {/* <button className='btn btn-primary'>Niggggaaa</button> */}
                    <main className="row row-cols-lg-4 row-cols-md-3 row-cols-2">
                        {data.map((d) => {
                            return (
                                <Singlepost data={d} isLoad={false}/>
                            )
                        })}
                    </main>
                </div>
            </div>
        </>
    )
}

export default Home