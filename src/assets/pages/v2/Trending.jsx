import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Singlepost from '../../components/Singlepost'

const Trending = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/post/trend/top')
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
    }, [])
    // let i = 0
    return (
        <>
            <Navbar />
            <div className="col-10 mx-auto h-50dvh raleway">
                <p className='text-center fs-4 fw-semibold'>Trending(s) in HI-Galery</p>
                <div className="row row-cols-lg-4 row-cols-md-3 row-cols-2">
                    {data.map((d) => {
                        // i++
                        // let color = i==1 ? '#B9F2FF' : i==2 ? '#FFD700' : i==3 ? '#C0C0C0' : i<=7 ? '#CD7F32' : ''
                        return (
                            <Singlepost data={d}/>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Trending