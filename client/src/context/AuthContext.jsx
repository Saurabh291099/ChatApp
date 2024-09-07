import { createContext, useCallback, useState } from "react";
import { baseUrl, postRequest } from "../utils/services";


export const AuthContext = createContext()

export const AuthoContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const [registerError, setRegisterError] = useState(null);

    const [isRegisterLoading, setIsRegisterLoading] = useState(false);


    const [registerInfo, setRegisterInfo] = useState({
        name: '',
        email: '',
        password: '',
    });
    // console.log("registerInfo", registerInfo);


    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info)
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
            }}>{children}
        </AuthContext.Provider>
    )

}