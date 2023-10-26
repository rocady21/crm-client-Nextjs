"use client"

import React from "react"
import Layout from "../components/Layout"
import { useRouter,useSearchParams } from "next/navigation"
import Link from "next/link"

const Pedidos = ()=> {
    
    return (
        <>
            <Layout>
                <h1 className="text-2xl mb-5 text-gray-800 font-light">Pedidos xd:D</h1>
                <Link legacyBehavior href={"/nuevoPedido"}>
                    <a className="bg-blue-800 py-2 px-4 mt-3 text-white shadow hover:bg-gray-800 mb-3 font-bold uppercase text-sm">Nuevo Pedido</a>
                </Link>
                <div>
                
                </div>
            </Layout>
        </>

    )
}

export default Pedidos
