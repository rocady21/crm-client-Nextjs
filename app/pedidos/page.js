"use client"

import React from "react"
import Layout from "../components/Layout"
import { useRouter,useSearchParams } from "next/navigation"
import Link from "next/link"
import { useQuery,gql } from "@apollo/client"
import Pedido from "../components/Pedido"


const OBTENER_PEDIDOS = gql`
    query obtenerPedidosVendedor {
        obtenerPedidosVendedor {
        cliente {
            id,
            nombre,
            apellido,
            email,
            telefono
        }
        creado,
        estado,
        id,
        pedido {
            id
            cantidad
            nombre,
            precio
        },
        total,
        vendedor
        }
    }
`

const Pedidos = ()=> {
    

    const {data,loading,error} = useQuery(OBTENER_PEDIDOS)

    if(loading === true) return "Cargando..."

    const {obtenerPedidosVendedor} = data
    return (
        <>
            <Layout>
                <h1 className="text-2xl mb-5 text-gray-800 font-light">Pedidos</h1>
                <Link legacyBehavior href={"/nuevoPedido"}>
                    <a className="bg-blue-800 py-2 px-4 mt-3 text-white shadow hover:bg-gray-800 mb-3 font-bold uppercase text-sm">Nuevo Pedido</a>
                </Link>
                
                {obtenerPedidosVendedor.lenght === 0 ? (
                    <a className="mt-5 text-center text-2xl">No hay pedidos</a>
                    ) : obtenerPedidosVendedor.map((pedido)=>{
                        return <Pedido key={pedido.id} pedido={pedido}/>
                    })
                }
                <div>
                
                </div>
            </Layout>
        </>

    )
}

export default Pedidos
