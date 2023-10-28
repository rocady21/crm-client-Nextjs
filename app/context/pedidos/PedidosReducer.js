import {
    SELECCIONAR_CANTIDAD_PRODUCTOS,
    SELECCIONAR_CLIENTE,
    SELECCIONAR_PRODUCTO,
    CAMBIAR_NUMERO_A_1
} from "../../../types"


export default (state,actions) => {
    switch(actions.type) {
        // aqui llamaremos todos nuestros casos para modificar el state
        case SELECCIONAR_CLIENTE:
            return {
                ...state,
                cleinte: actions.payload
            }
        case SELECCIONAR_PRODUCTO:
            return {
                ...state,
                productos: actions.payload
            }
        case CAMBIAR_NUMERO_A_1: 
            return {
                ...state,
                numero: actions.payload
            }
        case SELECCIONAR_CANTIDAD_PRODUCTOS:
            return {
                ...state,
                productos: state.productos.map((prod)=> {
                    if(prod.id = actions.payload.id) {
                        return prod = actions.payload
                    }
                    return prod
                })
            }
        default:
            return state
    }
}