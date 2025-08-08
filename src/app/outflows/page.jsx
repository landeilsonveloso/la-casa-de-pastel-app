"use client"

import AuthProvider from "src/contexts/AuthContext"
import Button from "src/components/Button"
import Div from "src/containers/Div"
import Form from "src/components/Form"
import Input from "src/components/Input"
import Label from "src/containers/Label"
import Loading from "src/components/Loading"
import { MdAdd, MdCategory, MdClose, MdMoneyOff, MdNotes } from "react-icons/md"
import Modal from "src/components/Modal"
import Option from "src/components/Option"
import Select from "src/components/Select"
import Spinner from "src/components/Spinner"
import Table from "src/components/Table"
import Title from "src/components/Title"
import useOutflow from "src/hooks/useOutflow"
import useUtilities from "src/hooks/useUtilities"

export default function OutflowsPage() {
    const {
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
    } = useOutflow()

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
                    <Title>Saída: {formatToBRL(filtered.reduce((sum, item) => sum + (parseFloat(item.firstValue) + parseFloat(item.secondValue) + parseFloat(item.thirdValue)), 0))}</Title>

                    <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-800 text-white px-4 py-2 cursor-pointer rounded-md transition" onClick={handleAdd}>
                        <MdAdd size={20}/>
                        Nova Saída
                    </Button>
                </Div>

                <Div className="w-full flex items-center justify-center gap-4 mb-8">
                    <Title>Filtrar</Title>
                    
                    <Select className="w-1/5 bg-black border rounded px-4 py-[10px] mb-4" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                        <Option value=""></Option>
                        <Option value="day">Dia</Option>
                        <Option value="week">Semana</Option>
                        <Option value="month">Mês</Option>
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
                    name="outflows"
                    columns={columns}
                    data={filtered}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />

                {isOpen && tag === "Create" ? (
                    <Modal>
                        <Form onSubimit={createOutflow}>
                            <Div className="w-full flex justify-end">
                                <MdClose className="cursor-pointer" size={30} onClick={handleCancel} title="Fechar Modal"/>
                            </Div>
                            
                            <Title className="text-center mb-4 text-xl font-bold">Novo Saída</Title>
                            
                            <Div className="space-y-4">
                                <Label className="font-medium" htmlFor="description">Descrição</Label>

                                <Div className="flex items-center border rounded-lg p-2 mt-1">
                                    <MdNotes className="text-gray-600 mr-2"/>

                                    <Input
                                        className="w-full outline-none bg-transparent"
                                        id="description"
                                        name="description"
                                        type="text"
                                        maxLength={60}
                                        placeholder="Descrição"
                                        onChange={(e) => setDescription(e.target.value)}
                                        required={true}
                                    />
                                </Div>

                                <Label className="font-medium" htmlFor="date">Data</Label>

                                <Div className="flex items-center border rounded-lg p-2 mt-1">
                                    <Input
                                        className="w-full outline-none bg-transparent"
                                        id="date"
                                        name="date"
                                        type="date"
                                        onChange={(e) => setDate(e.target.value)}
                                        required={true}
                                    />
                                </Div>

                                <Label className="font-medium">Método de Pagamento</Label>

                                <Div className="flex items-center border rounded-lg p-2 mt-1">
                                    <MdCategory className="text-gray-600 mr-2"/>

                                    <Select className="w-full p-0.5 cursor-pointer bg-transparent outline-none" onChange={(e) => setFirstMethod(e.target.value)} required={true}>
                                        <Option value=""></Option>
                                        <Option value="Cartão">Cartão</Option>
                                        <Option value="Espécie">Espécie</Option>
                                        <Option value="Pix">Pix</Option>
                                    </Select>
                                </Div>

                                <Label className="font-medium" htmlFor="firstValue">Valor</Label>

                                <Div className="flex items-center border rounded-lg p-2 mt-1">
                                    <MdMoneyOff className="text-gray-600 mr-2"/>

                                    <Input
                                        className="w-full outline-none bg-transparent"
                                        id="firstValue"
                                        name="firstValue"
                                        type="number"
                                        step={0.01}
                                        placeholder="0,00"
                                        onChange={(e) => setFirstValue(e.target.value)}
                                        required={true}
                                    />
                                </Div>

                                {showSecondMethod ? (
                                    <Div className="mt-1 pt-4">
                                        <Div className="flex justify-between items-center">
                                            <Label className="font-medium">Método de Pagamento</Label>
                                            <MdClose className="text-red-600 hover:text-red-80 cursor-pointer" size={20} onClick={handleRemoveSecondMethod}/>
                                        </Div>

                                        <Div className="flex items-center border rounded-lg p-2 mt-1 mb-4">
                                            <MdCategory className="text-gray-600 mr-2"/>

                                            <Select className="w-full p-0.5 cursor-pointer bg-transparent outline-none" onChange={(e) => setSecondMethod(e.target.value)} required={true}>
                                                <Option value=""></Option>
                                                <Option value="Cartão">Cartão</Option>
                                                <Option value="Espécie">Espécie</Option>
                                                <Option value="Pix">Pix</Option>
                                            </Select>
                                        </Div>

                                        <Label className="font-medium" htmlFor="secondValue">Valor</Label>

                                        <Div className="flex items-center border rounded-lg p-2 mt-1">
                                            <MdMoneyOff className="text-gray-600 mr-2"/>

                                            <Input
                                                className="w-full outline-none bg-transparent"
                                                id="secondValue"
                                                name="secondValue"
                                                type="number"
                                                step={0.01}
                                                placeholder="0,00"
                                                onChange={(e) => setSecondValue(e.target.value)}
                                                required={true}
                                            />
                                        </Div>
                                    </Div>
                                ) : 
                                    null
                                }

                                {showThirdMethod ? (
                                    <Div className="mt-1 pt-4">
                                        <Div className="flex justify-between items-center">
                                            <Label className="font-medium">Método de Pagamento</Label>
                                            <MdClose className="text-red-600 hover:text-red-80 cursor-pointer" size={20} onClick={handleRemoveThirdMethod}/>
                                        </Div>

                                        <Div className="flex items-center border rounded-lg p-2 mt-1 mb-4">
                                            <MdCategory className="text-gray-600 mr-2"/>

                                            <Select className="w-full p-0.5 cursor-pointer bg-transparent outline-none" onChange={(e) => setThirdMethod(e.target.value)} required={true}>
                                                <Option value=""></Option>
                                                <Option value="Cartão">Cartão</Option>
                                                <Option value="Espécie">Espécie</Option>
                                                <Option value="Pix">Pix</Option>
                                            </Select>
                                        </Div>

                                        <Label className="font-medium" htmlFor="thirdValue">Valor</Label>

                                        <Div className="flex items-center border rounded-lg p-2 mt-1">
                                            <MdMoneyOff className="text-gray-600 mr-2"/>

                                            <Input
                                                className="w-full outline-none bg-transparent"
                                                id="thirdValue"
                                                name="thirdValue"
                                                type="number"
                                                step={0.01}
                                                placeholder="0,00"
                                                onChange={(e) => setThirdValue(e.target.value)}
                                                required={true}
                                            />
                                        </Div>
                                    </Div>
                                ) : 
                                    null
                                }

                                {!showSecondMethod || !showThirdMethod ? (
                                    <Button className="flex items-center justify-center gap-2 w-full border-2 border-dashed rounded-lg mt-6 py-2 text-gray-600 cursor-pointer hover:border-green-500 hover:text-green-500 transition" type="button" onClick={handleNewMethod}>
                                        <MdAdd size={20}/> Adicionar outro método
                                    </Button>
                                ) :
                                    null
                                }
                            </Div>

                            <Div className="flex justify-end gap-4 mt-6">
                                <Button className="bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded cursor-pointer" type="button" onClick={handleCancel}>
                                    Cancelar
                                </Button>

                                <Button className={`flex justify-center w-28 bg-green-600 text-white py-2 rounded transition ${disabledOutflowsButton ? "cursor-default opacity-70" : "hover:bg-green-800 cursor-pointer"}`} disabled={disabledOutflowsButton}>
                                    {disabledOutflowsButton ? <Spinner/> : <>Adicionar</>}
                                </Button>
                            </Div>
                        </Form>
                    </Modal>
                ) : 
                    null
                }

                {isOpen && tag === "Edit" ? (
                    <Modal>
                        <Form onSubimit={updateOutflow}>
                            <Div className="w-full flex justify-end">
                                <MdClose className="cursor-pointer" size={30} onClick={handleCancel} title="Fechar Modal"/>
                            </Div>
                            
                            <Title className="text-center mb-4 text-xl font-bold">Editar Saída</Title>
                            
                            <Div className="space-y-4">
                                <Label className="font-medium" htmlFor="description">Descrição</Label>

                                <Div className="flex items-center border rounded-lg p-2 mt-1">
                                    <MdNotes className="text-gray-600 mr-2"/>

                                    <Input
                                        className="w-full outline-none bg-transparent"
                                        id="description"
                                        name="description"
                                        type="text"
                                        maxLength={60}
                                        placeholder="Descrição"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required={true}
                                    />
                                </Div>

                                <Label className="font-medium" htmlFor="date">Data</Label>

                                <Div className="flex items-center border rounded-lg p-2 mt-1">
                                    <Input
                                        className="w-full outline-none bg-transparent"
                                        id="date"
                                        name="date"
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        required={true}
                                    />
                                </Div>

                                <Label className="font-medium">Método de Pagamento</Label>

                                <Div className="flex items-center border rounded-lg p-2 mt-1">
                                    <MdCategory className="text-gray-600 mr-2"/>

                                    <Select className="w-full p-0.5 cursor-pointer bg-transparent outline-none" value={firstMethod} onChange={(e) => setFirstMethod(e.target.value)} required={true}>
                                        <Option value=""></Option>
                                        <Option value="Cartão">Cartão</Option>
                                        <Option value="Espécie">Espécie</Option>
                                        <Option value="Pix">Pix</Option>
                                    </Select>
                                </Div>

                                <Label className="font-medium" htmlFor="firstValue">Valor</Label>

                                <Div className="flex items-center border rounded-lg p-2 mt-1">
                                    <MdMoneyOff className="text-gray-600 mr-2"/>

                                    <Input
                                        className="w-full outline-none bg-transparent"
                                        id="firstValue"
                                        name="firstValue"
                                        type="number"
                                        step={0.01}
                                        placeholder="0,00"
                                        value={firstValue}
                                        onChange={(e) => setFirstValue(e.target.value)}
                                        required={true}
                                    />
                                </Div>

                                {showSecondMethod ? (
                                    <Div className="mt-1 pt-4">
                                        <Div className="flex justify-between items-center">
                                            <Label className="font-medium">Método de Pagamento</Label>
                                            <MdClose className="text-red-600 hover:text-red-80 cursor-pointer" size={20} onClick={handleRemoveSecondMethod}/>
                                        </Div>

                                        <Div className="flex items-center border rounded-lg p-2 mt-1 mb-4">
                                            <MdCategory className="text-gray-600 mr-2"/>

                                            <Select className="w-full p-0.5 cursor-pointer bg-transparent outline-none" value={secondMethod} onChange={(e) => setSecondMethod(e.target.value)} required={true}>
                                                <Option value=""></Option>
                                                <Option value="Cartão">Cartão</Option>
                                                <Option value="Espécie">Espécie</Option>
                                                <Option value="Pix">Pix</Option>
                                            </Select>
                                        </Div>

                                        <Label className="font-medium" htmlFor="secondValue">Valor</Label>

                                        <Div className="flex items-center border rounded-lg p-2 mt-1">
                                            <MdMoneyOff className="text-gray-600 mr-2"/>

                                            <Input
                                                className="w-full outline-none bg-transparent"
                                                id="secondValue"
                                                name="secondValue"
                                                type="number"
                                                step={0.01}
                                                placeholder="0,00"
                                                value={secondValue}
                                                onChange={(e) => setSecondValue(e.target.value)}
                                                required={true}
                                            />
                                        </Div>
                                    </Div>
                                ) : 
                                    null
                                }

                                {showThirdMethod ? (
                                    <Div className="mt-1 pt-4">
                                        <Div className="flex justify-between items-center">
                                            <Label className="font-medium">Método de Pagamento</Label>
                                            <MdClose className="text-red-600 hover:text-red-80 cursor-pointer" size={20} onClick={handleRemoveThirdMethod}/>
                                        </Div>

                                        <Div className="flex items-center border rounded-lg p-2 mt-1 mb-4">
                                            <MdCategory className="text-gray-600 mr-2"/>

                                            <Select className="w-full p-0.5 cursor-pointer bg-transparent outline-none" value={thirdMethod} onChange={(e) => setThirdMethod(e.target.value)} required={true}>
                                                <Option value=""></Option>
                                                <Option value="Cartão">Cartão</Option>
                                                <Option value="Espécie">Espécie</Option>
                                                <Option value="Pix">Pix</Option>
                                            </Select>
                                        </Div>

                                        <Label className="font-medium" htmlFor="thirdValue">Valor</Label>

                                        <Div className="flex items-center border rounded-lg p-2 mt-1">
                                            <MdMoneyOff className="text-gray-600 mr-2"/>

                                            <Input
                                                className="w-full outline-none bg-transparent"
                                                id="thirdValue"
                                                name="thirdValue"
                                                type="number"
                                                step={0.01}
                                                placeholder="0,00"
                                                value={thirdValue}
                                                onChange={(e) => setThirdValue(e.target.value)}
                                                required={true}
                                            />
                                        </Div>
                                    </Div>
                                ) : 
                                    null
                                }

                                {!showSecondMethod || !showThirdMethod ? (
                                    <Button className="flex items-center justify-center gap-2 w-full border-2 border-dashed rounded-lg mt-6 py-2 text-gray-600 cursor-pointer hover:border-blue-500 hover:text-blue-500 transition" type="button" onClick={handleNewMethod}>
                                        <MdAdd size={20}/> Editar outro método
                                    </Button>
                                ) :
                                    null
                                }
                            </Div>

                            <Div className="flex justify-end gap-4 mt-6">
                                <Button className="bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded cursor-pointer" type="button" onClick={handleCancel}>
                                    Cancelar
                                </Button>

                                <Button className={`flex justify-center w-28 bg-blue-600 text-white py-2 rounded transition ${disabledOutflowsButton ? "cursor-default opacity-70" : "hover:bg-blue-800 cursor-pointer"}`} disabled={disabledOutflowsButton}>
                                    {disabledOutflowsButton ? <Spinner/> : <>Salvar</>}
                                </Button>
                            </Div>
                        </Form>
                    </Modal>
                ) : 
                    null
                }

                {isOpen && tag === "Delete" ? (
                    <Modal>
                        <Form className="flex flex-col" onSubimit={deleteOutflow}>
                            <Div className="w-full flex justify-end">
                                <MdClose className="cursor-pointer" size={30} onClick={handleCancel} title="Fechar Modal"/>
                            </Div>

                            <Div className="text-center text-xl mt-4 mb-8">
                                Deseja excluir essa saída?
                            </Div>

                             <Div className="flex justify-end gap-3">
                                <Button className="bg-gray-600 text-white px-4 py-2 cursor-pointer rounded hover:bg-gray-800 transition" type="button" onClick={handleCancel}>
                                    Cancelar
                                </Button>

                                <Button className={`flex justify-center w-20 bg-red-600 text-white py-2 rounded transition ${disabledOutflowsButton ? "cursor-default opacity-70" : "hover:bg-red-800 cursor-pointer"}`} disabled={disabledOutflowsButton}>
                                    {disabledOutflowsButton ? <Spinner/> : <>Excluir</>}
                                </Button>
                            </Div>
                        </Form>
                    </Modal>
                ) : 
                    null
                }
            </Div>
        </AuthProvider>
    )
}
