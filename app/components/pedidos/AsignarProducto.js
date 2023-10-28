import React, { useContext, useEffect, useState } from "react";
import Select from "react-select"
import { gql,useQuery } from "@apollo/client";
import PedidoContext from "@/app/context/pedidos/PedidoContext";

const OBTENER_PRODUCTOS = gql`
    query obtenerProductos {
        obtenerProductos {
        id,
        nombre,
        precio,
        existencia,
        creado
        }
    }
`

const AsignarProducto = ()=> {

    // accediendo a mi context
    const [Productos,setProductos] = useState([])
    const {agregarProducto} = useContext(PedidoContext)
    const {data,loading,error} = useQuery(OBTENER_PRODUCTOS)
    
        useEffect(()=> {
            console.log(Productos);
            agregarProducto(Productos)
        },[Productos])

    if(loading === true) return true

    const {obtenerProductos} = data

    const agregarProductoState = (productos)=> {
        setProductos(productos)
    }

    return (
        <>
        <h1 className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">Asigna Pedido al cliente</h1>
            <Select
            isMulti
            className="mt-3"
            options={obtenerProductos}
            onChange={(opcion)=> agregarProductoState(opcion)}
            getOptionValue={opcion=> opcion.id}
            getOptionLabel={opcion=> `${opcion.nombre} - ${opcion.existencia} Disponibles`}
            />
        </>
    )
}

export default AsignarProducto