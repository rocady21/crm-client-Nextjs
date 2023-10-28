import PedidoContext from "@/app/context/pedidos/PedidoContext";
import React, { useContext } from "react";
import ProductoResume from "./ProductoResume";



const ResumenPedido = ()=> {

    const {productos} = useContext(PedidoContext)
    


    return (
        <>
            <h1 className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">Asigna las Cantidades</h1>
            {
                productos.length !== 0?  <>
                    {productos.map((prod)=> {
                        return <ProductoResume key={prod.id} producto = {prod}/>
                    })}
                </> : "No hay productos"
            }

        </>
    )

}


export default ResumenPedido