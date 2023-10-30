import React,{useReducer} from "react"
import PedidoContext from "./PedidoContext"
import {
    SELECCIONAR_CANTIDAD_PRODUCTOS,
    SELECCIONAR_CLIENTE,
    SELECCIONAR_PRODUCTO,
    CAMBIAR_NUMERO_A_1,
    ACTUALIZAR_TOTAL
} from "../../../types"
import PedidosReducer from "./PedidosReducer"

const PedidoState = ({children})=> {
    // State de pedidos

    const initialState = {
        cliente:{},
        productos:[],
        total:0,
        numero: 0
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
        let nuevoState;
        console.log("A");
        if(state.productos.length>0) {
            nuevoState = producto.map((select,index)=>{
                const nuevoObjeto = state.productos.find((nuevo)=> {
                    return nuevo.id == select.id
                })
                return {...select,...nuevoObjeto}
            })
        } else {
            nuevoState = producto
        }


        dispach({
            type:SELECCIONAR_PRODUCTO,
            payload:nuevoState
        })
    }
    const agregarProductoNuevo = (prod)=> {
        console.log(prod);

        dispach({
            type:SELECCIONAR_CANTIDAD_PRODUCTOS,
            payload:prod
        })
    }
    const actualizarTotal = ()=> {
        dispach({
            type:ACTUALIZAR_TOTAL
        })

    }
    return (
        <PedidoContext.Provider
            // aqui le pasaremos todas las funciones
            value={{
                total:state.total,
                numero:state.numero,
                productos:state.productos,
                cliente: state.cliente,
                agregarCliente,
                agregarProducto,
                agregarProductoNuevo,
                actualizarTotal
            }}
        >
            {children}

        </PedidoContext.Provider>

    )
}

export default PedidoState

