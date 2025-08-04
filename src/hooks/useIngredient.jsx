import axios from "axios"
import config from "src/config/config"
import { toast } from "react-toastify"
import { useCallback, useEffect, useState } from "react"
import useModal from "./useModal"
import { useRouter } from "next/navigation"

export default function useIngredient() {
    const [id, setId] = useState(0)
    const [description, setDescription] = useState("")
    const [quantity, setQuantity] = useState(0)
    const [unitMeasure, setUnitMeasure] = useState("")
    const [value, setValue] = useState(0)
    const [ingredients, setIngredients] = useState([])
    const [filtered, setFiltered] = useState([])
    const [search, setSearch] = useState("")
    const [disabledIngredientsButton, setDisabledIngredientsButton] = useState(false)
    const [loading, setLoading] =useState(true)

    const {isOpen, openingModal, closingModal, tag, setTag} = useModal()

    const router = useRouter()

    const apiUrlBase = config.API_URL_BASE

    const readIngredientsUrl = `${apiUrlBase}/ingredients`
    const createIngredientUrl = `${apiUrlBase}/ingredients`
    const updateIngredientUrl = `${apiUrlBase}/ingredients/${id}`
    const deleteIngredientUrl = `${apiUrlBase}/ingredients/${id}`

    const columns = [
        {key: "description", label: "Descrição"},
        {key: "quantity", label: "Quantidade"},
        {key: "unitMeasure", label: "U. de Medida"},
        {key: "value", label: "Valor"}
    ]
    
    const readIngredients = useCallback(async () => {
        await axios
                    .get(readIngredientsUrl, {headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }})
                    .then((res) => {
                        if (res.status === 200) {
                            setIngredients(res.data)
                            return
                        }
                        
                        else if (res.status === 401) {
                            localStorage.clear()
                            router.replace("/")
                            return
                        }
                    })
                    .catch((err) => {
                        if (err.response.status === 401) {
                            localStorage.clear()
                            router.replace("/")
                            return
                        }

                        else if (err.response.status >= 500) {
                            toast.error("Erro no servidor, recarregue a página!")
                            return
                        }
                    })
    }, [readIngredientsUrl, router])

    const createIngredient = useCallback(async (e) => {
        e.preventDefault()

        setDisabledIngredientsButton(true)
        
        await axios
                    .post(createIngredientUrl, {description, quantity, unitMeasure, value}, {headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }})
                    .then((res) => {
                        if (res.status === 201) {
                            setDisabledIngredientsButton(false)
                            toast.success(res.data)
                            closingModal()
                            readIngredients()
                            return
                        }

                        else if (res.status === 400) {
                            setDisabledIngredientsButton(false)
                            toast.error(res.data)
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
                            setDisabledIngredientsButton(false)
                            toast.error(err.response.data)
                            return
                        }

                        else if (err.response.status === 401) {
                            localStorage.clear()
                            router.replace("/")
                            return
                       }

                        else if (err.response.status >= 500) {
                            setDisabledIngredientsButton(false)
                            toast.error("Erro no servidor, recarregue a página!")
                            return
                        }
                    })
    }, [createIngredientUrl, description, quantity, unitMeasure, value, closingModal, readIngredients, router])

    const updateIngredient = useCallback(async (e) => {
        e.preventDefault()

        setDisabledIngredientsButton(true)

        await axios
                    .put(updateIngredientUrl, {description, quantity, unitMeasure, value}, {headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }})
                    .then((res) => {
                        if (res.status === 200) {
                            setDisabledIngredientsButton(false)
                            toast.success(res.data)
                            closingModal()
                            readIngredients()
                            return
                        }

                        else if (res.status === 400) {
                            setDisabledIngredientsButton(false)
                            toast.error(res.data)
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
                            setDisabledIngredientsButton(false)
                            toast.error(err.response.data)
                            return
                        }

                        else if (err.response.status === 401) {
                            localStorage.clear()
                            router.replace("/")
                            return
                        }

                        else if (err.response.status >= 500) {
                            setDisabledIngredientsButton(false)
                            toast.error("Erro no servidor, recarregue a página!")
                            return
                        }
                    })
    }, [updateIngredientUrl, description, quantity, unitMeasure, value, closingModal, readIngredients, router])

    const deleteIngredient = useCallback(async (e) => {
        e.preventDefault()

        setDisabledIngredientsButton(true)

        await axios
                    .delete(deleteIngredientUrl, {headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }})
                    .then((res) => {
                        if (res.status === 200) {
                            setDisabledIngredientsButton(false)
                            toast.success(res.data)
                            closingModal()
                            readIngredients()
                            return
                        }

                        else if (res.status === 401) {
                            localStorage.clear()
                            router.replace("/")
                            return
                        }
                    })
                    .catch((err) => {
                        if (err.response.status === 401) {
                            localStorage.clear()
                            router.replace("/")
                            return
                        }

                        else if (err.response.status >= 500) {
                            setDisabledIngredientsButton(false)
                            toast.error("Erro no servidor, recarregue a página!")
                            return
                        }
                    })
                    
    }, [deleteIngredientUrl, closingModal, readIngredients, router])

    useEffect(() => {
        const fetch = async () => {
            await readIngredients()
            setLoading(false)
        }

        fetch()
    }, [readIngredients])

    useEffect(() => {
        const term = search.trim().toLowerCase()

        if (!term) {
            const sorted = [...ingredients].sort((a, b) =>
                a.description.localeCompare(b.description, undefined, {numeric: true, sensitivity: "base"})
            )

            setFiltered(sorted)
            return
        }

        const results = ingredients.filter((item) =>
            item.description.toLowerCase().includes(term)
        )

        const sorted = results.sort((a, b) =>
            a.description.localeCompare(b.description, undefined, {numeric: true, sensitivity: "base"})
        )

        setFiltered(sorted)
    }, [search, ingredients])

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
        disabledIngredientsButton,
        loading,
        isOpen,
        tag,
        columns,
        createIngredient,
        updateIngredient,
        deleteIngredient,
        handleAdd,
        handleEdit,
        handleDelete,
        handleCancel
    }
}
