import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const Login = () => {

    const { loginUser, loginInfo, isLoginLoading, loginError, updateLoginInfo } = useContext(AuthContext);
    return (
        <>
            <div class="w-full container border h-[100vh] m-0 flex justify-center items-center">
                <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={loginUser}>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                            Email
                        </label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" onChange={(e) => { updateLoginInfo({ ...loginInfo, email: e.target.value }) }} />
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                            Password
                        </label>
                        <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" onChange={(e) => { updateLoginInfo({ ...loginInfo, password: e.target.value }) }} />
                        {/* <p class="text-red-500 text-xs italic">Please choose a password.</p> */}
                    </div>
                    <div class="flex items-center justify-between gap-4">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Login In
                        </button>
                        <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                            Forgot Password?
                        </a>

                        {loginError?.error && (<p>{loginError?.message}</p>)}
                    </div>

                </form>

            </div>
        </>
    )
}

export default Login
