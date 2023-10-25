"use client"

import React from "react"
import Layout from "../components/Layout"
import { useRouter,useSearchParams } from "next/navigation"

const Pedidos = ()=> {

    const params = useSearchParams()
    

    console.log(params);
    return (
        <>
            <Layout>
                <h1 className="text-2xl text-gray-800 font-light">Pedidos xd:D</h1>
            </Layout>
        </>

    )
}

export default Pedidos
