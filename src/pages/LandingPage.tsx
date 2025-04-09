import axios from 'axios'
import { useEffect } from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { Spinner } from '../components/Spinner'
import { BACKEND_URL } from '../config'
//@ts-ignore
async function CheckToken(token: string, navigate : NavigateFunction) {
    try{
        let res = await axios.get(`${BACKEND_URL}/api/v1/user/get`, {headers:{ Authorization: localStorage.getItem("token")}})
        if(res.data.detail){
            navigate('/signin')
        }
        else{
            navigate('/blogs')
        }
    }
    catch{
        localStorage.removeItem('token')
        navigate('/signin')
    }
}

function LandingPage() {

    const navigate = useNavigate()
    let token = localStorage.getItem('token')

    useEffect(() => {
        if(token){
            CheckToken(token, navigate)
        }
        else{
            navigate('/signup')
        }
    }, [])

    return (
        <div className='items-center flex justify-center h-screen'>
            <Spinner/>
        </div>
    )
}

export default LandingPage