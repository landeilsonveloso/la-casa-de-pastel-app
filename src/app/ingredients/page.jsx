"use client"

import AuthProvider from "src/contexts/AuthContext"
import Button from "src/components/Button"
import Div from "src/containers/Div"
import Form from "src/components/Form"
import Input from "src/components/Input"
import Loading from "src/components/Loading"
import { MdAdd, MdCategory, MdClose, MdMonetizationOn, MdMoneyOff, MdNotes, MdNumbers } from "react-icons/md"
import Modal from "src/components/Modal"
import Table from "src/components/Table"
import Title from "src/components/Title"
import useIngredient from "src/hooks/useIngredient"
import Spinner from "src/components/Spinner"
import Select from "src/components/Select"
import Option from "src/components/Option"

export default function IngredientsPage() {
    const {
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
    } = useIngredient()

    if (loading) {
        return <Loading/>
    }
    
    return (
        <AuthProvider>
            <Div className="text-white min-h-screen bg-black">
                <Div className="flex justify-between items-center mb-6">
                    <Title>Ingredientes</Title>

                    <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-800 text-white px-4 py-2 cursor-pointer rounded-md transition" onClick={handleAdd}>
                        <MdAdd size={20}/>
                        Novo Ingrediente
                    </Button>
                </Div>

                <Input
                    className="w-full p-3 mb-16 rounded-md bg-white text-black focus:outline-none"
                    id="search"
                    name="search"
                    type="search"
                    placeholder="Busque por um ingrediente..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                
                <Table
                    name="ingredients"
                    columns={columns}
                    data={filtered}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />

                {isOpen && tag === "Create" ? (
                    <Modal>
                        <Form onSubimit={createIngredient}>
                            <Div className="w-full flex justify-end">
                                <MdClose className="cursor-pointer" size={30} onClick={handleCancel}/>
                            </Div>

                            <Title>Novo Ingrediente</Title>

                            <Div className="flex items-center w-full mb-6 p-3 border border-gray-400 rounded-lg focus-within:ring-2 focus-within:ring-gray-400 transition-all">
                                <MdNotes className="text-gray-600 text-xl mr-2"/>

                                <Input
                                    className="w-full placeholder-gray-500 px-2 outline-none bg-transparent"
                                    id="description"
                                    name="description"
                                    type="text"
                                    maxLength={60}
                                    placeholder="Descrição"
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Div>

                            <Div className="flex items-center w-full mb-6 p-3 border border-gray-400 rounded-lg focus-within:ring-2 focus-within:ring-gray-400 transition-all">
                                <MdNumbers className="text-gray-600 text-xl mr-2"/>

                                <Input
                                    className="w-full placeholder-gray-500 px-2 outline-none bg-transparent"
                                    id="quantity"
                                    name="quantity"
                                    type="number"
                                    placeholder="Quantidade"
                                    step={0.01}
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </Div>

                            <Div className="flex items-center w-full mb-6 p-3 border border-gray-400 rounded-lg focus-within:ring-2 focus-within:ring-gray-400 transition-all">
                                <MdCategory className="text-gray-600 text-xl mr-2"/>
                                
                                <Select className="w-full px-2 outline-none" onChange={(e) => setUnitMeasure(e.target.value)}>
                                    <Option value="">
                                        
                                    </Option>

                                    <Option value="un">
                                        Un
                                    </Option>

                                    <Option value="mg">
                                        Mg
                                    </Option>

                                    <Option value="g">
                                        G
                                    </Option>

                                    <Option value="kg">
                                        Kg
                                    </Option>

                                    <Option value="ml">
                                        Ml
                                    </Option>

                                    <Option value="l">
                                        L
                                    </Option>
                                </Select>
                            </Div>

                            <Div className="flex items-center w-full mb-6 p-3 border border-gray-400 rounded-lg focus-within:ring-2 focus-within:ring-gray-400 transition-all">
                                <MdMonetizationOn className="text-gray-600 text-xl mr-2"/>

                                <Input
                                    className="w-full placeholder-gray-500 px-2 outline-none bg-transparent"
                                    id="value"
                                    name="value"
                                    type="number"
                                    placeholder="Valor"
                                    step={0.01}
                                    onChange={(e) => setValue(e.target.value)}
                                />
                            </Div>

                            <Div className="flex justify-end gap-3">
                                <Button className="w-24 bg-red-600 text-white px-4 py-2 cursor-pointer rounded hover:bg-red-800 transition" type="button" onClick={handleCancel}>
                                    Cancelar
                                </Button>

                                <Button className={`flex justify-center w-28 bg-green-600 text-white px-4 py-2 rounded transition ${disabledIngredientsButton ? "cursor-default opacity-70" : "hover:bg-green-800 cursor-pointer"}`} disabled={disabledIngredientsButton}>
                                    {disabledIngredientsButton ? <Spinner/> : <>Adicionar</>}
                                </Button>
                            </Div>
                        </Form>
                    </Modal>
                ) : 
                    null
                }

                {isOpen && tag === "Edit" ? (
                    <Modal>
                        <Form onSubimit={updateIngredient}>
                            <Div className="w-full flex justify-end">
                                <MdClose className="cursor-pointer" size={30} onClick={handleCancel}/>
                            </Div>

                            <Title>Editar Ingrediente</Title>

                            <Div className="flex items-center w-full mb-6 p-3 border border-gray-400 rounded-lg focus-within:ring-2 focus-within:ring-gray-400 transition-all">
                                <MdNotes className="text-gray-600 text-xl mr-2"/>

                                <Input
                                    className="w-full placeholder-gray-500 px-2 outline-none bg-transparent"
                                    id="description"
                                    name="description"
                                    type="text"
                                    maxLength={60}
                                    placeholder="Descrição"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Div>

                            <Div className="flex items-center w-full mb-6 p-3 border border-gray-400 rounded-lg focus-within:ring-2 focus-within:ring-gray-400 transition-all">
                                <MdNumbers className="text-gray-600 text-xl mr-2"/>

                                <Input
                                    className="w-full placeholder-gray-500 px-2 outline-none bg-transparent"
                                    id="quantity"
                                    name="quantity"
                                    type="number"
                                    placeholder="Quantidade"
                                    step={0.01}
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </Div>

                            <Div className="flex items-center w-full mb-6 p-3 border border-gray-400 rounded-lg focus-within:ring-2 focus-within:ring-gray-400 transition-all">
                                <MdCategory className="text-gray-600 text-xl mr-2"/>
                                
                                <Select className="w-full px-2 outline-none" value={unitMeasure} onChange={(e) => setUnitMeasure(e.target.value)}>
                                    <Option value="">
                                        
                                    </Option>

                                    <Option value="un">
                                        Un
                                    </Option>

                                    <Option value="mg">
                                        Mg
                                    </Option>

                                    <Option value="g">
                                        G
                                    </Option>

                                    <Option value="kg">
                                        Kg
                                    </Option>

                                    <Option value="ml">
                                        Ml
                                    </Option>

                                    <Option value="l">
                                        L
                                    </Option>
                                </Select>
                            </Div>

                            <Div className="flex items-center w-full mb-6 p-3 border border-gray-400 rounded-lg focus-within:ring-2 focus-within:ring-gray-400 transition-all">
                                <MdMonetizationOn className="text-gray-600 text-xl mr-2"/>

                                <Input
                                    className="w-full placeholder-gray-500 px-2 outline-none bg-transparent"
                                    id="value"
                                    name="value"
                                    type="number"
                                    placeholder="Valor"
                                    step={0.01}
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                />
                            </Div>

                            <Div className="flex justify-end gap-3">
                                <Button className="w-24 bg-red-600 text-white py-2 cursor-pointer rounded hover:bg-red-800 transition" type="button" onClick={handleCancel}>
                                    Cancelar
                                </Button>

                                <Button className={`flex justify-center w-20 bg-blue-600 text-white py-2 rounded transition ${disabledIngredientsButton ? "cursor-default opacity-70" : "hover:bg-blue-800 cursor-pointer"}`} disabled={disabledIngredientsButton}>
                                    {disabledIngredientsButton ? <Spinner/> : <>Salvar</>}
                                </Button>
                            </Div>
                        </Form>
                    </Modal>
                ) : 
                    null
                }

                {isOpen && tag === "Delete" ? (
                    <Modal>
                        <Form className="flex flex-col" onSubimit={deleteIngredient}>
                            <Div className="w-full flex justify-end">
                                <MdClose className="cursor-pointer" size={30} onClick={handleCancel}/>
                            </Div>

                            <Div className="text-center text-xl mt-4 mb-8">
                                Deseja excluir esse ingrediente?
                            </Div>

                             <Div className="flex justify-end gap-3">
                                <Button className="w-24 bg-gray-600 text-white px-4 py-2 cursor-pointer rounded hover:bg-gray-800 transition" type="button" onClick={handleCancel}>
                                    Cancelar
                                </Button>

                                <Button className={`flex justify-center w-20 bg-red-600 text-white py-2 rounded transition ${disabledIngredientsButton ? "cursor-default opacity-70" : "hover:bg-red-800 cursor-pointer"}`} disabled={disabledIngredientsButton}>
                                    {disabledIngredientsButton ? <Spinner/> : <>Excluir</>}
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
