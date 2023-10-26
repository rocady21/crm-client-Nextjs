import {
    SELECCIONAR_CANTIDAD_PRODUCTOS,
    SELECCIONAR_CLIENTE,
    SELECCIONAR_PRODUCTO
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
        default:
            return state
    }
}