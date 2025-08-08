import axios from "axios"
import config from "src/config/config"
import { toast } from "react-toastify"
import { useCallback, useEffect, useState } from "react"
import useModal from "./useModal"
import { useRouter } from "next/navigation"

export default function useOutflow() {
    const [id, setId] = useState(0)
    const [description, setDescription] = useState("")
    const [date, setDate] = useState(new Date())
    const [firstMethod, setFirstMethod] = useState("")
    const [firstValue, setFirstValue] = useState(0)
    const [secondMethod, setSecondMethod] = useState("")
    const [secondValue, setSecondValue] = useState(0)
    const [thirdMethod, setThirdMethod] = useState("")
    const [thirdValue, setThirdValue] = useState(0)
    const [outflows, setOutflows] = useState([])
    const [filtered, setFiltered]  = useState([])
    const [filterType, setFilterType] = useState("")
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [showSecondMethod, setShowSecondMethod] = useState(false)
    const [showThirdMethod, setShowThirdMethod] = useState(false)
    const [disabledOutflowsButton, setDisabledOutflowsButton] = useState(false)
    const [loading, setLoading] = useState(true)
    
    const {isOpen, openingModal, closingModal, tag, setTag} = useModal()

    const router = useRouter()

    const apiUrlBase = config.API_URL_BASE

    const readOutflowsUrl = `${apiUrlBase}/outflows`
    const createOutflowUrl = `${apiUrlBase}/outflows`
    const updateOutflowUrl = `${apiUrlBase}/outflows/${id}`
    const deleteOutflowUrl = `${apiUrlBase}/outflows/${id}`

    const columns = [
        {key: "description", label: "Descrição"},
        {key: "date", label: "Data"},
        {key: "method", label: "Método de Pagamento"},
        {key: "valueTotal", label: "Valor Total"}
    ]
    
    const readOutflows = useCallback(async () => {
        try {
            const headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }

            const res = await axios.get(readOutflowsUrl, {headers})

            if (res.status === 200) {
                setOutflows(res.data)
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
    }, [readOutflowsUrl, router])

    const createOutflow = useCallback(async (e) => {
        e.preventDefault()

        setDisabledOutflowsButton(true)
        
        try {
            const headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }

            const res = await axios.post(createOutflowUrl, {description, date, firstMethod, firstValue, secondMethod, secondValue, thirdMethod, thirdValue}, {headers})

            if (res.status === 201) {
                toast.success(res.data)
                closingModal()
                setShowSecondMethod(false)
                setShowThirdMethod(false)
                readOutflows()
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
            setDisabledOutflowsButton(false)
        }
    }, [createOutflowUrl, description, date, firstMethod, firstValue, secondMethod, secondValue, thirdMethod, thirdValue, closingModal, readOutflows, router])

    const updateOutflow = useCallback(async (e) => {
        e.preventDefault()

        setDisabledOutflowsButton(true)

        try {
            const headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }

            const res = await axios.put(updateOutflowUrl, {description, date, firstMethod, firstValue,secondMethod, secondValue, thirdMethod, thirdValue}, {headers})

            if (res.status === 200) {
                toast.success(res.data)
                closingModal()
                setShowSecondMethod(false)
                setShowThirdMethod(false)
                readOutflows()
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
            setDisabledOutflowsButton(false)
        }
    }, [updateOutflowUrl, description, date, firstMethod, firstValue, secondMethod, secondValue, thirdMethod, thirdValue, closingModal, readOutflows, router])

    const deleteOutflow = useCallback(async (e) => {
        e.preventDefault()

        setDisabledOutflowsButton(true)

        try {
            const headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }

            const res = await axios.delete(deleteOutflowUrl, {headers})

            if (res.status === 200) {
                toast.success(res.data)
                closingModal()
                readOutflows()
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
            setDisabledOutflowsButton(false)
        }
    }, [deleteOutflowUrl, closingModal, readOutflows, router])

    useEffect(() => {
        const fetch = async () => {
            await readOutflows()
            setLoading(false)
        }

        fetch()
    }, [readOutflows])

    const filterByDay = useCallback(() => {
        const selDate = new Date(selectedDate)
        const selDay = selDate.getUTCDate()
        const selMonth = selDate.getUTCMonth()
        const selYear = selDate.getUTCFullYear()

        return outflows.filter(outflow => {
            const outflowDate = new Date(outflow.date)
            return (
                outflowDate.getUTCDate() === selDay &&
                outflowDate.getUTCMonth() === selMonth &&
                outflowDate.getUTCFullYear() === selYear
            )
        })
    }, [outflows, selectedDate])

    const filterByWeek = useCallback(() => {
        const date = new Date(selectedDate)
        const dayOfWeek = date.getUTCDay()

        const startOfWeek = new Date(date)
        startOfWeek.setUTCDate(date.getUTCDate() - dayOfWeek)
        startOfWeek.setUTCHours(0, 0, 0, 0)

        const endOfWeek = new Date(startOfWeek)
        endOfWeek.setUTCDate(startOfWeek.getUTCDate() + 6)
        endOfWeek.setUTCHours(23, 59, 59, 999)

        return outflows.filter(outflow => {
            const outflowDate = new Date(outflow.date)
            return outflowDate >= startOfWeek && outflowDate <= endOfWeek
        })
    }, [outflows, selectedDate])
    
    const filterByMonth = useCallback(() => {
        const selMonth = selectedDate.getUTCMonth()
        const selYear = selectedDate.getUTCFullYear()

        return outflows.filter(outflow => {
            const outflowDate = new Date(outflow.date)
            return (
                outflowDate.getUTCMonth() === selMonth &&
                outflowDate.getUTCFullYear() === selYear
            )
        })
    }, [outflows, selectedDate])


    const filterOutflows = useCallback(() => {
        switch (filterType) {
            case "day":
                return filterByDay()

            case "week":
                return filterByWeek()

            case 'month':
                return filterByMonth()

            default:
                return outflows
        }
    }, [filterType, outflows, filterByDay, filterByWeek, filterByMonth])

    useEffect(() => {
        setFiltered(filterOutflows())
    }, [filterOutflows])

    const handleAdd = useCallback(() => {
        setTag("Create")
        setShowSecondMethod(false)
        setShowThirdMethod(false)
        openingModal()
    }, [openingModal])

    const handleEdit = useCallback((item) => {
        setTag("Edit")
        setShowSecondMethod(false)
        setShowThirdMethod(false)
        openingModal()
        setId(item.id)
        setDescription(item.description)
        setDate(item.date)
        setFirstMethod(item.firstMethod)
        setFirstValue(item.firstValue)
        setSecondMethod(item.secondMethod)
        setSecondValue(item.secondValue)
        setThirdMethod(item.thirdMethod)
        setThirdValue(item.thirdValue)
    }, [openingModal])

    const handleDelete = useCallback((item) => {
        setTag("Delete")
        openingModal()
        setId(item.id)
    }, [openingModal])

    const handleCancel = useCallback(() => {
        closingModal()
        setShowSecondMethod(false)
        setShowThirdMethod(false)
    }, [closingModal])

    const handleNewMethod = useCallback(() => {
        if (!showSecondMethod) {
            setShowSecondMethod(true)
        }

        else if (!showThirdMethod) {
            setShowThirdMethod(true)
        }
    }, [showSecondMethod, showThirdMethod])

    const handleRemoveSecondMethod = useCallback(() => {
        setShowSecondMethod(false)
    }, [])

    const handleRemoveThirdMethod = useCallback(() => {
        setShowThirdMethod(false)
    }, [])

    return {
        description,
        setDescription,
        date,
        setDate,
        firstMethod,
        setFirstMethod,
        firstValue,
        setFirstValue,
        secondMethod,
        setSecondMethod,
        secondValue,
        setSecondValue,
        thirdMethod,
        setThirdMethod,
        thirdValue,
        setThirdValue,
        outflows,
        filtered,
        filterType,
        setFilterType,
        selectedDate,
        setSelectedDate,
        showSecondMethod,
        setShowSecondMethod,
        showThirdMethod,
        setShowThirdMethod,
        disabledOutflowsButton,
        loading,
        isOpen,
        tag,
        columns,
        createOutflow,
        updateOutflow,
        deleteOutflow,
        handleAdd,
        handleEdit,
        handleDelete,
        handleCancel,
        handleNewMethod,
        handleRemoveSecondMethod,
        handleRemoveThirdMethod
    }
}
