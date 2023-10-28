import PedidoContext from "@/app/context/pedidos/PedidoContext";
import React, { useContext } from "react";

const Total = ()=> {

    const {total} = useContext(PedidoContext)
    return (

        <div className="flex items-center mt-5 justify-between bg-white border-solid p-3 rounded">
        <h2 className="text-gray-800 mt-0">Total a Pagar</h2>
        <p className="text-gray-800 mt-0 text-lg">{total}</p>
    </div>
    )
}

export default Total