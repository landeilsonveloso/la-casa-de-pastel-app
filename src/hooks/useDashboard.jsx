import { useCallback, useEffect, useState } from "react"
import useInflow from "./useInflow"
import useOutflow from "./useOutflow"

export default function useDashboard() {
    const [transactions, setTransactions] = useState([])
    const [filtered, setFiltered] = useState([])
    const [filterType, setFilterType] = useState("")
    const [filteredValues, setFilteredValues] = useState({})
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [loading, setLoading] = useState(true)

    const {inflows} = useInflow()
    const {outflows} = useOutflow()

    const columns = [
        {key: "date", label: "Data"},
        {key: "inflow", label: "Entrada"},
        {key: "outflow", label: "Saída"},
        {key: "lucre", label: "Lucro"}
    ]

    const groupByDate = useCallback((dataArray) => {
        const grouped = {}
        for (const item of dataArray) {
            const date = new Date(item.date).toISOString().split("T")[0]
            if (!grouped[date]) {
                grouped[date] = []
            }
            grouped[date].push(item)
        }
        return grouped
    }, [])

    const calculateProfitTable = useCallback(async () => {
        const inflowsByDate = groupByDate(inflows)
        const outflowsByDate = groupByDate(outflows)

        const allDates = new Set([
            ...Object.keys(inflowsByDate),
            ...Object.keys(outflowsByDate),
        ])

        const result = []

        for (const date of allDates) {
            const totalInflow = inflowsByDate[date]?.reduce((sum, item) => sum + Number(item.value), 0) || 0
            const totalOutflow = outflowsByDate[date]?.reduce((sum, item) => sum + Number(item.value), 0) || 0

            result.push({
                date,
                inflow: totalInflow,
                outflow: totalOutflow,
                lucre: totalInflow - totalOutflow,
            })
        }

        setTransactions(result.sort((a, b) => new Date(b.date) - new Date(a.date)))
    }, [groupByDate, inflows, outflows])

    const filterByDay = useCallback(() => {
        const selDate = new Date(selectedDate)
        const selDay = selDate.getUTCDate()
        const selMonth = selDate.getUTCMonth()
        const selYear = selDate.getUTCFullYear()

        return transactions.filter(transaction => {
            const transactionDate = new Date(transaction.date)
            return (
                transactionDate.getUTCDate() === selDay &&
                transactionDate.getUTCMonth() === selMonth &&
                transactionDate.getUTCFullYear() === selYear
            )
        })
    }, [transactions, selectedDate])

    const filterByWeek = useCallback(() => {
        const date = new Date(selectedDate)
        const dayOfWeek = date.getUTCDay()

        const startOfWeek = new Date(date)
        startOfWeek.setUTCDate(date.getUTCDate() - dayOfWeek)
        startOfWeek.setUTCHours(0, 0, 0, 0)

        const endOfWeek = new Date(startOfWeek)
        endOfWeek.setUTCDate(startOfWeek.getUTCDate() + 6)
        endOfWeek.setUTCHours(23, 59, 59, 999)

        return transactions.filter(transaction => {
            const transactionDate = new Date(transaction.date)
            return transactionDate >= startOfWeek && transactionDate <= endOfWeek
        })
    }, [transactions, selectedDate])

    const filterByMonth = useCallback(() => {
        const selMonth = selectedDate.getUTCMonth()
        const selYear = selectedDate.getUTCFullYear()

        return transactions.filter(transaction => {
            const transactionDate = new Date(transaction.date)
            return (
                transactionDate.getUTCMonth() === selMonth &&
                transactionDate.getUTCFullYear() === selYear
            )
        })
    }, [transactions, selectedDate])

    const filterTransactions = useCallback(() => {
        switch (filterType) {
            case "day":
                return filterByDay()
            case "week":
                return filterByWeek()
            case "month":
                return filterByMonth()
            default:
                return transactions
        }
    }, [filterType, transactions, filterByDay, filterByWeek, filterByMonth])

    const getTotals = useCallback(() => {
        const inflow = filtered.reduce((sum, item) => sum + item.inflow, 0)
        const outflow = filtered.reduce((sum, item) => sum + item.outflow, 0)
        const lucre = filtered.reduce((sum, item) => sum + item.lucre, 0)
        return { inflow, outflow, lucre }
    }, [filtered])

    useEffect(() => {
        const fetchData = async () => {
            await calculateProfitTable()
            setLoading(false)
        }

        fetchData()
    }, [calculateProfitTable])

    useEffect(() => {
        setFiltered(filterTransactions())
    }, [filterTransactions])

    useEffect(() => {
        setFilteredValues(getTotals())
    }, [getTotals])

    return {
        filtered,
        filterType,
        setFilterType,
        filteredValues,
        selectedDate,
        setSelectedDate,
        loading,
        columns
    }
}
