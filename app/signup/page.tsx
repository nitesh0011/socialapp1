'use client'
import Link from 'next/link'
import React ,{useState}from 'react'
import { useRouter } from 'next/navigation'
import axios  from 'axios'
import { UploadDropzone } from '@/utils/uploadthing'
const SignupPage = () => {
  const router = useRouter();
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);
    const [user,setUser] = useState({
        email:"",
        password: "",
        username:""
    })
    const onSignUp = async ()=>{
        try {
          const response = await axios.post("/api/users/signup", {
            ...user,
            profile: uploadedFileUrl, // Add the uploaded file URL
          });
          console.log("this the code",(await response).data)
          router.push('/login')
        } catch (error:any) {
          console.log(error.message)
        }
    }
  return (
    <div className='min-h-screen flex items-center justify-center flex-col'>
      <h1 className='mb-5 text-2xl'>SignUp</h1>
      <hr/>
      <label htmlFor='username'>username</label>
      <input 
      className='p-2'
      placeholder='username'
      type='text' id='username' value={user.username} onChange={(e)=>{setUser({...user,username:e.target.value})}}/>
      
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
      
      <UploadDropzone
         
        endpoint="imageUploader"
        onClientUploadComplete={(res: any) => {
          // Do something with the response
          setUploadedFileUrl(res[0].url);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
      <button className="p-2 bg-blue-500 active:bg-blue-700 rounded-md mt-2 "onClick={onSignUp}>signUp</button>
      <Link href="/login">visit login page</Link>
    </div>
  )
}

export default SignupPage
