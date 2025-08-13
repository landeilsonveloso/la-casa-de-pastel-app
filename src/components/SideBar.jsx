'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {MdClose, MdDashboard, MdInventory, MdLogout, MdMenu, MdMonetizationOn, MdMoneyOff} from 'react-icons/md'

export default function SideBar() {
    const [isOpen, setIsOpen] = useState(true)

    return (
        isOpen ? (
            <nav className="mr-72">
                <aside className="w-72 h-full fixed top-0 left-0 bg-gradient-to-br from-black via-red-900 to-black text-white py-5 px-4 shadow-lg flex flex-col justify-between">
                    <div>
                        <div className="w-full text-end">
                            <button className="cursor-pointer p-4 rounded-full hover:bg-gray-600 hover:text-white" type="button" onClick={() => setIsOpen(false)}>
                                <MdClose title="Fechar Menu" size={20}/>
                            </button>
                        </div>

                        <nav className="flex flex-col gap-4">
                            <NavItem href="/dashboard" label="Painel" icon={<MdDashboard size={20}/>} />
                            <NavItem href="/items" label="Estoque" icon={<MdInventory size={20}/>} />
                            <NavItem href="/inflows" label="Entradas" icon={<MdMonetizationOn size={20}/>} />
                            <NavItem href="/outflows" label="Saídas" icon={<MdMoneyOff size={20}/>} />
                        </nav>
                    </div>

                    <NavItem href="/" label="Sair" icon={<MdLogout size={20}/>}/>
                </aside>
            </nav>
        ) : (
            <nav className="mr-20">
                <aside className="w-20 h-full fixed top-0 left-0 bg-gradient-to-br from-black via-red-900 to-black text-white py-5 px-4 shadow-lg flex flex-col justify-between">
                    <div>
                        <button className="cursor-pointer p-4 rounded-full hover:bg-gray-600 hover:text-white" type="button" onClick={() => setIsOpen(true)}>
                            <MdMenu title="Abrir Menu" size={20}/>
                        </button>

                        <nav className="flex flex-col items-center gap-4">
                            <NavItem href="/dashboard" icon={<MdDashboard title="Painel" size={20}/>}/>
                            <NavItem href="/items" icon={<MdInventory title="Estoque" size={20}/>}/>
                            <NavItem href="/inflows" icon={<MdMonetizationOn title="Entradas" size={20}/>} />
                            <NavItem href="/outflows" icon={<MdMoneyOff title="Saídas" size={20}/>} />
                        </nav>
                    </div>

                    <NavItem href="/" icon={<MdLogout title="Sair" size={20}/>}/>
                </aside>
            </nav>            
        )
    )
}

function NavItem({href, label, icon}) {
    const pathName = usePathname()
    const isActive = pathName === href

    return (
        <Link className={`flex px-4 py-3 gap-3 rounded-md transition hover:bg-blue-600 hover:text-white ${isActive ? "bg-blue-600" : ""} ${href === "/" ? "hover:bg-red-600" : ""}`} href={href}>
            {icon}
            {label}
        </Link>
    )
}
