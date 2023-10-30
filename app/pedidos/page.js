"use client"

import React from "react"
import Layout from "../components/Layout"
import { useRouter,useSearchParams } from "next/navigation"
import Link from "next/link"
import { useQuery,gql } from "@apollo/client"
import Pedido from "../components/Pedido"


const OBTENER_PEDIDOS = gql`
    query obtenerPedidos {
        obtenerPedidos {
        cliente,
        creado,
        estado,
        id,
        pedido {
            cantidad
            id
        },
        total,
        vendedor
        }
    }
`

const Pedidos = ()=> {
    

    const {data,loading,error} = useQuery(OBTENER_PEDIDOS)

    if(loading === true) return "Cargando..."

    const {obtenerPedidos} = data
    return (
        <>
            <Layout>
                <h1 className="text-2xl mb-5 text-gray-800 font-light">Pedidos xd:D</h1>
                <Link legacyBehavior href={"/nuevoPedido"}>
                    <a className="bg-blue-800 py-2 px-4 mt-3 text-white shadow hover:bg-gray-800 mb-3 font-bold uppercase text-sm">Nuevo Pedido</a>
                </Link>
                
                {obtenerPedidos.lenght === 0 ? (
                    <a className="mt-5 text-center text-2xl">No hay pedidos</a>
                    ) : obtenerPedidos.map((pedido)=>{
                        return <Pedido/>
                    })
                }
                <div>
                
                </div>
            </Layout>
        </>

    )
}

export default Pedidos
