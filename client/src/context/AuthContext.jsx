import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest } from "../utils/services";


export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const [registerError, setRegisterError] = useState(null);
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);

    const [registerInfo, setRegisterInfo] = useState({
        name: '',
        email: '',
        password: '',
    });


    const [loginError, setLoginError] = useState(null);
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: '',
    });
    // console.log("registerInfo", registerInfo);

    console.log("User:", user);
    // console.log("LoginInfo:", loginInfo);

    useEffect(() => {
        const user = localStorage.getItem("User");

        setUser(JSON.parse(user));
    }, []);

    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info)
    }, [])

    const updateLoginInfo = useCallback((info) => {
        setLoginInfo(info)
    }, [])


    const registerUser = useCallback(async (e) => {
        e.preventDefault();
        setIsRegisterLoading(true)
        setRegisterError(null)

        try {
            const response = await postRequest(`${baseUrl}/users/register`, JSON.stringify(registerInfo));

            // Log the response to console
            console.log("Response from server:", response);

            setIsRegisterLoading(false)

            if (response.error) {
                return setRegisterError(response);
            }

            // Store user information and log the result

            localStorage.setItem("User", JSON.stringify(response));
            setUser(response);

            console.log("user Register successfully:", response);
        } catch (error) {
            setIsRegisterLoading(false);
            console.error("Network or server error:", error);
        }


    }, [registerInfo,]);


    const loginUser = useCallback(async (e) => {
        e.preventDefault()
        setIsLoginLoading(true)
        setLoginError(null)

        const response = await postRequest(
            `${baseUrl}/users/login`,
            JSON.stringify(loginInfo)
        );
        setIsLoginLoading(false)

        if (response.error) {
            return setLoginError(response)
        }
        localStorage.setItem("User", JSON.stringify(response))
        setUser(response);

    }, [loginInfo]);

    const logOutUser = useCallback(() => {
        localStorage.removeItem("User");
        setUser(null);
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                registerInfo,
                updateRegisterInfo,
                registerError,
                registerUser,
                isRegisterLoading,
                setIsRegisterLoading,
                logOutUser,
                loginUser,
                loginError,
                loginInfo,
                isLoginLoading,
                updateLoginInfo,
            }}>{children}
        </AuthContext.Provider>
    )

}