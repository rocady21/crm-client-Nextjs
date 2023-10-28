import React, { useContext, useEffect, useState } from "react";
import Select from "react-select"
import { gql,useQuery } from "@apollo/client";
import PedidoContext from "@/app/context/pedidos/PedidoContext";

const OBTENER_CLIENTES = gql`
    query obtenerClientesVendedor{
        obtenerClientesVendedor{
        id,
        nombre,
        apellido,
        empresa,
        email
        }
    }
`

const AsignarCliente = ()=> {

    // accediendo a mi context
    const {agregarCliente} = useContext(PedidoContext)

    const [optionsSelected,setSelected] = useState([])
    const {data,loading,error} = useQuery(OBTENER_CLIENTES)

    if(loading === true) return true

    const {obtenerClientesVendedor} = data

    const agregarClienteState = (cliente)=> {
        agregarCliente(cliente)
    }

    return (
        <>
        <h1 className="mt-10 my-2 bg-white border-l-4 border-gray-900 text-gray-700 p-2 text-sm font-bold">Asigna Pedido al cliente</h1>
            <Select
            className="mt-3 "
            options={obtenerClientesVendedor}
            onChange={(opcion)=> agregarClienteState(opcion)}
            getOptionValue={opcion=> opcion.id}
            getOptionLabel={opcion=> opcion.nombre}
            />
        </>
    )
}

export default AsignarCliente