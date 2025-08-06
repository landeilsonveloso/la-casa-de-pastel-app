"use client"

import AuthProvider from "src/contexts/AuthContext"
import Div from "src/containers/Div"
import Input from "src/components/Input"
import Loading from "src/components/Loading"
import Option from "src/components/Option"
import Select from "src/components/Select"
import Table from "src/components/Table"
import Title from "src/components/Title"
import useDashboard from "src/hooks/useDashboard"
import useUtilities from "src/hooks/useUtilities"

export default function DashboardPage() {
    const {
        filtered,
        filterType,
        setFilterType,
        filteredValues,
        selectedDate,
        setSelectedDate,
        loading,
        columns
    } = useDashboard()

    const {
        formatToBRL
    } = useUtilities()

    if (loading) {
        return <Loading/>
    }
    
    return (
        <AuthProvider>
            <Div className="text-white min-h-screen bg-black">
                <Div className="flex justify-between items-center mb-6">
                    <Title>Entrada: {formatToBRL(filteredValues.inflow)}</Title>
                    <Title>Saída: {formatToBRL(filteredValues.outflow)}</Title>
                    <Title>Lucro: {formatToBRL(filteredValues.lucre)}</Title>
                </Div>

                <Div className="w-full flex items-center justify-center gap-4 mb-8">
                    <Title>Filtrar</Title>
                    
                    <Select className="w-1/5 bg-black border rounded px-4 py-2 mb-4" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                        <Option value="">
                            
                        </Option>

                        <Option value="day">
                            Dia
                        </Option>

                        <Option value="week">
                            Semana
                        </Option>

                        <Option value="month">
                            Mês
                        </Option>
                    </Select>

                    <Input
                        className="border rounded px-4 py-2 mb-4 custom-date-icon"
                        id="date"
                        name="date"
                        type="date"
                        value={selectedDate ? selectedDate.toISOString().split("T")[0] : ""}
                        onChange={(e) => {e.target.value ? setSelectedDate(new Date(e.target.value)) : setSelectedDate(null)}}
                    />
                </Div>
                
                <Table
                    name="dashboard"
                    columns={columns}
                    data={filtered}
                />
            </Div>
        </AuthProvider>
    )
}
