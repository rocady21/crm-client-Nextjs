import {
    SELECCIONAR_CANTIDAD_PRODUCTOS,
    SELECCIONAR_CLIENTE,
    SELECCIONAR_PRODUCTO,
    CAMBIAR_NUMERO_A_1,
    ACTUALIZAR_TOTAL
} from "../../../types"


export default (state,actions) => {
    switch(actions.type) {
        // aqui llamaremos todos nuestros casos para modificar el state
        case SELECCIONAR_CLIENTE:
            return {
                ...state,
                cliente: actions.payload
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
                    if(prod.id === actions.payload.id) {
                        return actions.payload
                    }  else {
                        return prod
                    }
                })
            }
        case ACTUALIZAR_TOTAL:
            return {
                ...state,
                // reduce lo que hace es que a un array , recibe una constante y cada producto para ir sumandoo a esa const como nosotros queramos
                total: state.productos.reduce((tot,articulo)=> tot + articulo.precio * articulo.cantidad,0)
            }
        default:
            return state
    }
}