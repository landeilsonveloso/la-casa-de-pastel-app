import axios from "axios"
import config from "src/config/config"
import { toast } from "react-toastify"
import { useCallback, useEffect, useState } from "react"
import useModal from "./useModal"
import { useRouter } from "next/navigation"

export default function useItem() {
    const [id, setId] = useState(0)
    const [description, setDescription] = useState("")
    const [quantity, setQuantity] = useState(0)
    const [unitMeasure, setUnitMeasure] = useState("")
    const [value, setValue] = useState(0)
    const [items, setItems] = useState([])
    const [filtered, setFiltered] = useState([])
    const [search, setSearch] = useState("")
    const [disabledItemsButton, setDisabledItemsButton] = useState(false)
    const [loading, setLoading] =useState(true)

    const {isOpen, openingModal, closingModal, tag, setTag} = useModal()

    const router = useRouter()

    const apiUrlBase = config.API_URL_BASE

    const readItemsUrl = `${apiUrlBase}/items`
    const createItemUrl = `${apiUrlBase}/items`
    const updateItemUrl = `${apiUrlBase}/items/${id}`
    const deleteItemUrl = `${apiUrlBase}/items/${id}`

    const columns = [
        {key: "description", label: "Descrição"},
        {key: "quantityWithUnit", label: "Quantidade"},
        {key: "value", label: "Valor"}
    ]
    
    const readItems = useCallback(async () => {
        try {
            const headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }

            const res = await axios.get(readItemsUrl, {headers})

            if (res.status === 200) {
                setItems(res.data)
            }
                        
            else if (res.status === 401) {
                localStorage.clear()
                router.replace("/")
            }
        }
        
        catch (err) {
            if (err.response?.status === 401) {
                localStorage.clear()
                router.replace("/")
            }

            else if (err.response?.status >= 500) {
                toast.error("Erro no servidor, recarregue a página!")
            }

            else {
                toast.error("Erro inespirado.")
            }
        }
    }, [readItemsUrl, router])

    const createItem = useCallback(async (e) => {
        e.preventDefault()

        setDisabledItemsButton(true)
        
        try {
            const headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }

            const res = await axios.post(createItemUrl, {description, quantity, unitMeasure, value}, {headers})

            if (res.status === 201) {
                toast.success(res.data)
                closingModal()
                readItems()
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
            setDisabledItemsButton(false)
        }
    }, [createItemUrl, description, quantity, unitMeasure, value, closingModal, readItems, router])

    const updateItem = useCallback(async (e) => {
        e.preventDefault()

        setDisabledItemsButton(true)

        try {
            const headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }

            const res = await axios.put(updateItemUrl, {description, quantity, unitMeasure, value}, {headers})

            if (res.status === 200) {
                toast.success(res.data)
                closingModal()
                readItems()
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
            setDisabledItemsButton(false)
        }
    }, [updateItemUrl, description, quantity, unitMeasure, value, closingModal, readItems, router])

    const deleteItem = useCallback(async (e) => {
        e.preventDefault()

        setDisabledItemsButton(true)

        try {
            const headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }

            const res = await axios.delete(deleteItemUrl, {headers})

            if (res.status === 200) {
                toast.success(res.data)
                closingModal()
                readItems()
            }

            else if (res.status === 401) {
                localStorage.clear()
                router.replace("/")
            }
        }
        
        catch (err) {
            if (err.response?.status === 401) {
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
            setDisabledItemsButton(false)
        }
    }, [deleteItemUrl, closingModal, readItems, router])

    useEffect(() => {
        const fetch = async () => {
            await readItems()
            setLoading(false)
        }

        fetch()
    }, [readItems])

    useEffect(() => {
        const term = search.trim().toLowerCase()

        if (!term) {
            const sorted = [...items].sort((a, b) =>
                a.description.localeCompare(b.description, undefined, {numeric: true, sensitivity: "base"})
            )

            setFiltered(sorted)
            return
        }

        const results = items.filter((item) =>
            item.description.toLowerCase().includes(term)
        )

        const sorted = results.sort((a, b) =>
            a.description.localeCompare(b.description, undefined, {numeric: true, sensitivity: "base"})
        )

        setFiltered(sorted)
    }, [search, items])

    const handleAdd = useCallback(() => {
        setTag("Create")
        openingModal()
    }, [openingModal])

    const handleEdit = useCallback((item) => {
        setTag("Edit")
        openingModal()
        setId(item.id)
        setDescription(item.description)
        setQuantity(item.quantity)
        setUnitMeasure(item.unitMeasure)
        setValue(item.value)
    }, [openingModal])

    const handleDelete = useCallback((item) => {
        setTag("Delete")
        openingModal()
        setId(item.id)
    }, [openingModal])

    const handleCancel = useCallback(() => {
        closingModal()
    }, [closingModal])

    return {
        description,
        setDescription,
        quantity,
        setQuantity,
        unitMeasure,
        setUnitMeasure,
        value,
        setValue,
        filtered,
        search,
        setSearch,
        disabledItemsButton,
        loading,
        isOpen,
        tag,
        columns,
        createItem,
        updateItem,
        deleteItem,
        handleAdd,
        handleEdit,
        handleDelete,
        handleCancel
    }
}
