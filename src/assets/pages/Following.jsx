import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Following = () => {
    const [user, setUser] = useState()
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
                    setUser(fetch_user)
                    document.querySelectorAll('nav .placeholder').forEach((a) => {
                        a.classList.remove('placeholder')
                    })
                })
        } else {
            setTimeout(() => {
                document.querySelectorAll('nav .placeholder').forEach((a) => {
                    a.classList.remove('placeholder')
                })
            }, 1000);
        }
    }, [])
    return (
        <div>{user?.name}</div>
    )
}

export default Following