import { useCallback, useState } from "react"

export default function useUtilities() {
    const [passwordVisibility, setPasswordVisibility] = useState(false)
    const [passwordConfirmVisibility, setConfirmPasswordVisibility] = useState(false)

    const formatToBRL = useCallback((value) => {
        return new Intl.NumberFormat("pt-BR", {style: "currency", currency: "BRL"}).format(value)
    }, [])
    
    return {
        passwordVisibility,
        setPasswordVisibility,
        passwordConfirmVisibility,
        setConfirmPasswordVisibility,
        formatToBRL
    }
}
