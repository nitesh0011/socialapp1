'use client'
import Link from 'next/link'
import React,{useState} from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
const LoginPage = () => {
  const router = useRouter();
  const [user,setUser] = useState({
    email:"",
    password: "",
    
})
const onLogin = async ()=>{
  try {
    const response = axios.post("/api/users/login",user)
    console.log((await response).data)

    router.push('/profile')
  } catch (error:any) {
    console.log(error.message)
  }
}
return (
<div className='min-h-screen flex items-center justify-center flex-col'>
  <h1 className='mb-5 text-2xl'>Login</h1>
  <hr/>
  <label htmlFor='password'>password</label>
  
  <input 
  className='p-2'
  placeholder='password'
  type='password' id='password' value={user.password} onChange={(e)=>{setUser({...user,password:e.target.value})}}/>
  
  <label htmlFor='email'>email</label>
  <input 
  className='p-2'
  placeholder='email'
  type='email' id='email' value={user.email} onChange={(e)=>{setUser({...user,email:e.target.value})}}/>
  

  <button className="p-2 bg-blue-500 active:bg-blue-700 rounded-md mt-2 "onClick={onLogin}>Login</button>
  <Link href="/signup">visit signup page</Link>
</div>
)
}

export default LoginPage
