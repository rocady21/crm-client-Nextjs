import React,{useReducer} from "react"
import PedidoContext from "./PedidoContext"
import {
    SELECCIONAR_CANTIDAD_PRODUCTOS,
    SELECCIONAR_CLIENTE,
    SELECCIONAR_PRODUCTO
} from "../../../types"
import PedidosReducer from "./PedidosReducer"

const PedidoState = ({children})=> {
    // State de pedidos

    const initialState = {
        cliente:{},
        productos:[],
        total:0
    }
    const [state, dispach] = useReducer(PedidosReducer,initialState)

    // modifica el cliente
    const agregarCliente = (cliente)=> {
        console.log(cliente);

        // dispach para actualizar el state
        dispach({
            type: SELECCIONAR_CLIENTE,
            payload: cliente
        })
    }
    const agregarProducto = (producto)=> {

        dispach({
            type:SELECCIONAR_PRODUCTO,
            payload:producto
        })
    }
    return (
        <PedidoContext.Provider
            // aqui le pasaremos todas las funciones
            value={{
                productos:state.productos,
                agregarCliente,
                agregarProducto
            }}
        >
            {children}

        </PedidoContext.Provider>

    )
}

export default PedidoState

