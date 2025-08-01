"use client"

import axios from "axios"
import config from "src/config/config"
import { useCallback, useState } from "react"
import { useRouter } from "next/navigation"

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
            return router.replace("/")
        }

        return token
    }, [router])

    const signIn = useCallback(async (e) => {
        e.preventDefault()

        setDisabledUserButton(true)
        
        await axios
                    .post(signInUrl, {email, password})
                    .then((res) => {
                        if (res.status === 200) {
                            setDisabledUserButton(false)
                            localStorage.setItem("token", res.data)
                            router.replace("/dashboard")
                            return
                        }

                        else if (res.status === 400) {
                            setDisabledUserButton(false)
                            alert(res.data)
                            return
                        }
                    })
                    .catch((err) => {
                        if (err.response.status === 400) {
                            setDisabledUserButton(false)
                            alert(err.response.data)
                            return
                        }

                        else if (err.response.status >= 500) {
                            setDisabledUserButton(false)
                            alert("Erro no servidor, recarregue a página!")
                            return
                        }
                    })
    }, [router, signInUrl, email, password])

    const forgotPassword = useCallback(async (e) => {
        e.preventDefault()

        setDisabledUserButton(true)

        await axios
                    .post(forgotPasswordUrl, {email})
                    .then((res) => {
                        if (res.status === 200) {
                            setDisabledUserButton(false)
                            alert("Pedido de solicitação enviado para seu email!")
                            localStorage.setItem("token", res.data)
                            return
                        }

                        else if (res.status === 400) {
                            setDisabledUserButton(false)
                            alert(res.data)
                            return
                        }
                    })
                    .catch((err) => {
                        if (err.response.status === 400) {
                            setDisabledUserButton(false)
                            alert(err.response.data)
                            return
                        }

                        else if (err.response.status >= 500) {
                            setDisabledUserButton(false)
                            alert("Erro no servidor, recarregue a página!")
                            return
                        }
                    })
    }, [forgotPasswordUrl, email])

    const redefinePassword = useCallback(async (e) => {
        e.preventDefault()

        setDisabledUserButton(true)

        await axios
                    .put(redefinePasswordUrl, {password, confirmPassword}, {headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }})
                    .then((res) => {
                        if (res.status === 200) {
                            setDisabledUserButton(false)
                            localStorage.clear()
                            router.replace("/")
                            return
                        }

                        else if (res.status === 400) {
                            setDisabledUserButton(false)
                            alert(res.data)
                            return
                        }

                        else if (res.status === 401) {
                            localStorage.clear()
                            router.replace("/")
                            return
                        }
                    })
                    .catch((err) => {
                        if (err.response.status === 400) {
                            setDisabledUserButton(false)
                            alert(err.response.data)
                            return
                        }

                        else if (err.response.status === 401) {
                            localStorage.clear()
                            router.replace("/")
                            return
                        }

                        else if (err.response.status >= 500) {
                            setDisabledUserButton(false)
                            alert("Erro no servidor, recarregue a página!")
                            return
                        }
                    })
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
