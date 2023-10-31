"use client"

import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import Select from "react-select"
import AsignarCliente from "../components/pedidos/AsignarCliente";

import PedidoContext from "../context/pedidos/PedidoContext";
import AsignarProducto from "../components/pedidos/AsignarProducto";
import ResumenPedido from "../components/pedidos/ResumenPedido";
import Total from "../components/pedidos/Total";
import { useMutation,gql } from "@apollo/client";
import {useRouter} from "next/navigation"
import Swal from "sweetalert2";

const NUEVO_PEDIDO = gql`
    mutation nuevoPedido($input: PedidoInput) {
        nuevoPedido(input : $input) {
            id
        }
    }
`
const NuevoPedido = ()=> {
    // usar context

    const router = useRouter()
    const [ mensaje, setMensaje] = useState(null)
    const {productos,cliente,total} = useContext(PedidoContext)
    const [nuevoPedido] = useMutation(NUEVO_PEDIDO)
    const validarPedido = ()=> {

        // la funcion every es para un array, sirve para mapear y validar condiciones
        return !productos.every(producto => producto.cantidad > 0) || total === 0 || !cliente.id ? "opacity-50 cursor-not-allowed" : ""
    }


    const registrarPedido = async ()=> {

        try {
        // sacar la data que necesitamos para pedidos    
        const productosFinal = productos.map((prod)=> {
            console.log(prod);
            return {
                id:prod.id,
                cantidad:parseInt(prod.cantidad),
                nombre:prod.nombre,
                precio:prod.precio
            }
        }) 


            const {data} = await nuevoPedido({
                variables:{
                    input:{
                        cliente: cliente.id,
                        total:total,
                        pedido:productosFinal,
                    }
                }
            })
            if(data.nuevoPedido) {
                Swal.fire(
                    "Creado",
                    "Pedido Creado Correctamente",
                    "success"
                    )
                router.push("/pedidos")
            }
        } catch (error) {
            console.log(error);
            setMensaje(error.message.replace("GraphQL error: ",""))

            setTimeout(() => {
                setMensaje(null)
            }, 3000);
        }
    }   

    
    const MostrarMensaje = ()=> {
        return (
                <div className="bg-white py-2 px-3 my-3 max-w-sm text-center mx-auto w-full">
                    <p>{mensaje}</p>
                </div>
            )
    }
    return (
        <Layout>
            <h1 className="text 2xl mt-5 text-gray-800 font-light ">Nuevo pedido</h1>
            {
                mensaje && MostrarMensaje()
            }
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <AsignarCliente/>
                    <AsignarProducto/>
                    <ResumenPedido/>
                    <Total/>

                    <button onClick={registrarPedido} className={`bg-gray-800 w-full mt-5 p-2 text-white hover:bg-gray-90 ${validarPedido()}`}>Registrar Pedido</button>
                </div>
            </div>
            
        </Layout>

    )
}

export default NuevoPedido