"use client"

import { createContext, useEffect } from "react"
import useUser from "src/hooks/useUser"

const AuthContext = createContext()

export default function AuthProvider({children}) {
    const {verifyToken} = useUser()

    useEffect(() => {
        verifyToken()
    }, [verifyToken])

    return (
        <AuthContext.Provider value={null}>
            {children}
        </AuthContext.Provider>
    )
}
