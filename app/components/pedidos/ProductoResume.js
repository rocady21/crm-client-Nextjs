import PedidoContext from "@/app/context/pedidos/PedidoContext";
import React, { useContext, useEffect, useState } from "react";

const ProductoResume = ({producto})=> {

    const {agregarProductoNuevo,actualizarTotal} = useContext(PedidoContext)
    const {nombre,existencia,precio} = producto
    const [cantidad, setCantidad] = useState(1)

    useEffect(()=> {
        sumarCantidad(producto)
        actualizarTotal()
    },[cantidad])
    
    const sumarCantidad = (prod)=> {

        const prodNuevo = {...prod, cantidad : cantidad}
        agregarProductoNuevo(prodNuevo)
    }

    return (
        <div className="md:flex md:justify-between md:items-center mt-5">
            <div className="md:w-2/4 mb-2 md:mb-0">
                <p className="text-sm">{nombre}</p>
                <p>USD {precio}</p>
            </div>
            <input onChange={ (e)=> setCantidad(e.target.value)} type="number" value={cantidad} placeholder="Cantidad"
            className="shadow apparence-none border rounded  py-2 px-3 text-gray-700 leading-light focus:outline-none focus:shadow-outline"
            />
        </div>
    )
}


export default ProductoResume