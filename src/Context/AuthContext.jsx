import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode"


export const AuthContext = createContext(false)

export default function AuthContextProvider({ children }) {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    useEffect(() => {
        try {
            jwtDecode(localStorage.getItem("token"))
            setIsUserLoggedIn(true)
        } catch (error) {
            setIsUserLoggedIn(false)
            localStorage.removeItem("token")
        }
        window.addEventListener("storage", () => {
            try {
                jwtDecode(localStorage.getItem("token"))
                setIsUserLoggedIn(true)
            } catch (error) {
                setIsUserLoggedIn(false)
                localStorage.removeItem("token")
            }
        })
    }, [])





    return <AuthContext.Provider value={{ isUserLoggedIn, setIsUserLoggedIn }} >
        {children}
    </ AuthContext.Provider>
}








AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
