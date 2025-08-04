"use client"

import { useCallback, useState } from "react"

export default function useModal() {
    const [isOpen, setIsOpen] = useState(false)
    const [tag, setTag] = useState("")

    const openingModal = useCallback(() => {
        setIsOpen(true)
    }, [])

    const closingModal = useCallback(() => {
        setIsOpen(false)
    }, [])

    return {
        isOpen,
        openingModal,
        closingModal,
        tag,
        setTag
    }
}
