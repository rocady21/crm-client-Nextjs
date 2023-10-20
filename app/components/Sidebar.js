'use client'
import React from "react"
import Link from "next/link"
import {useRouter,usePathname} from "next/navigation"


const Sidebar = ()=> {

    const router = usePathname()
    return (
        <aside className="bg-gray-800 w-1/3 sm:w-1/3 xl:w-1/5 sm min-h-screen p-5">
            <div>
                <p className="text-white text-2xl font-black">
                    CRM Clientes
                </p>
            </div>

            <nav className="mt-5 list-none">
                <li className={router.pathname === "/clientes"? "bg-blue-800 p-3" : "p-3"} >
                    <Link href={"/clientes"}  legacyBehavior><a className="text-white" id="link">Clientes</a></Link>
                </li>
                <li className={router.pathname === "/productos"? "bg-blue-800 p-3" : "p-3"}>
                    <Link href={"/productos"}  legacyBehavior><a className="text-white" id="link">Productos</a></Link>
                </li>

                <li className={router.pathname === "/pedidos"? "bg-blue-800 p-3" : "p-3"}>
                    <Link href={"/pedidos"}  legacyBehavior><a className="text-white" id="link">Pedidos</a></Link>
                </li>

            </nav>
        </aside>
    )
}

export default Sidebar