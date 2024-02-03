import Link from 'next/link'
import React from 'react'
import Logout from './Logout'

const Navbar = () => {
  return (
    <div className='w-full h-[6vh] flex items-center justify-center gap-4 bg-gray-200'>
      <Link href='/'>Home</Link>
      <Link href='/create'>create</Link>
      <Link href='/profile'>profile</Link>
      <div><Logout/></div>
    </div>
  )
}

export default Navbar
