import { React, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
const Navbar = () => {

    const { user, logOutUser } = useContext(AuthContext)

    return (
        <>
            <nav className='flex justify-between items-center py-2 pl-2 pr-10 border-b-2'>
                <h1 className='text-2xl font-bold'>ChatApp</h1>

                <span className='font-semibold'>Logged in as {user ? user.name : '...'}</span>
                {
                    user && (
                        <>
                            <Link onClick={() => logOutUser()} to='/login'>Logout</Link>
                        </>
                    )
                }
                {
                    !user && (
                        <>
                            <div className='flex justify-center items-center gap-5'>
                                <Link to='/login' className='text-black'>Login</Link>
                                <Link to='/signup' className='text-black'>Signup</Link>
                            </div>
                        </>
                    )
                }
            </nav>
        </>
    )
}

export default Navbar
