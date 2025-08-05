"use client"

import axios from "axios"
import config from "src/config/config"
import { useCallback, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

export default function useUser() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [disabledUserButton, setDisabledUserButton] = useState(false)

    const router = useRouter()

    const apiUrlBase = config.API_URL_BASE

    const signInUrl = `${apiUrlBase}/users/signin`
    const forgotPasswordUrl = `${apiUrlBase}/users/forgotpassword`
    const redefinePasswordUrl = `${apiUrlBase}/users/redefinepassword`

    const verifyToken = useCallback(() => {
        const token = localStorage.getItem("token")

        if (!token) {
            router.replace("/")
        }
    }, [router])

    const signIn = useCallback(async (e) => {
        e.preventDefault()

        setDisabledUserButton(true)

        try {
            const res = await axios.post(signInUrl, {email, password})

            if (res.status === 200) {
                toast.success("Login realizado com sucesso!")
                localStorage.setItem("token", res.data)
                router.replace("/dashboard")
            }
            
            else if (res.status === 400) {
                toast.error(res.data)
            }
        }
        
        catch (err) {
            if (err.response?.status === 400) {
                toast.error(err.response.data)
            }
            
            else if (err.response?.status >= 500) {
                toast.error("Erro no servidor, recarregue a página!")
            }
            
            else {
                toast.error("Erro inesperado.")
            }
        }
        
        finally {
            setDisabledUserButton(false)
        }
    }, [router, signInUrl, email, password])

    const forgotPassword = useCallback(async (e) => {
        e.preventDefault()
        setDisabledUserButton(true)

        try {
            const res = await axios.post(forgotPasswordUrl, {email})

            if (res.status === 200) {
                toast.success("Pedido de solicitação enviado para seu email!")
                localStorage.setItem("token", res.data)
            }
            
            else if (res.status === 400) {
                toast.error(res.data)
            }
        }
        
        catch (err) {
            if (err.response?.status === 400) {
                toast.error(err.response.data)
            }
            
            else if (err.response?.status >= 500) {
                toast.error("Erro no servidor, recarregue a página!")
            }
            
            else {
                toast.error("Erro inesperado.")
            }
        }
        
        finally {
            setDisabledUserButton(false)
        }
    }, [forgotPasswordUrl, email])

    const redefinePassword = useCallback(async (e) => {
        e.preventDefault()

        setDisabledUserButton(true)

        try {
            const res = await axios.put(redefinePasswordUrl, {password, confirmPassword}, {headers: {"Accept": "application/json", "Content-Type": "application/json", "Authorization": localStorage.getItem("token")}})

            if (res.status === 200) {
                toast.success(res.data)
                localStorage.clear()
                router.replace("/")
            }

            else if (res.status === 400) {
                toast.error(res.data)
            }

            else if (res.status === 401) {
                localStorage.clear()
                router.replace("/")
            }
        }
        
        catch (err) {
            if (err.response?.status === 400) {
                toast.error(err.response.data)
            }

            else if (err.response?.status === 401) {
                localStorage.clear()
                router.replace("/")
            }

            else if (err.response?.status >= 500) {
                toast.error("Erro no servidor, recarregue a página!")
            }
            
            else {
                toast.error("Erro inesperado.")
            }
        }

        finally {
            setDisabledUserButton(false)
        }
    }, [router, redefinePasswordUrl, password, confirmPassword])

    return {
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        disabledUserButton,
        verifyToken,
        signIn,
        forgotPassword,
        redefinePassword
    }
}
