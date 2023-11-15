import React, { useEffect, useState } from "react";


const Pedido = ({pedido})=> {
    console.log(pedido);
    const {id,total,cliente,estado} = pedido
    console.log(pedido);

    const [estadoS,setEstadoS] = useState(estado)

    useEffect(()=>{
        if(estadoS) {
            setEstadoS(estadoS)
        }
    },[estadoS])
    return (
        <div className="mt-5 bg-white rounded p-6 grid grid-cols-2 shadow-lg">

            <div className="m-2">
                <p className="font-bold text-gray-800">Cliente: {cliente.nombre} {cliente.apellido}</p>
                <p className="flex items-center my-2">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"></path>
</svg>
                {cliente.email}
                </p>

                <p className="flex items-center my-2">
                <svg fill="none" className="w-4 h-4 mr-2" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"></path>
</svg>
                {cliente.telefono}
                </p>

                <h2 className="font-bold mt-10 text-gray-800">Estado Pedido:</h2>
                <select value={estadoS} className="mt-2 apparence-none bg-blue-600 border border-blue-600 text-white py-2 rounded focus:outline:none focus:bg-blue-600 focus:border-blue-500 Uppercase text-xs">
                    <option value={"COMPLETADO"}>COMPLETADO</option>
                    <option value={"PENDIENTE"}>PENDIENTE</option>
                    <option value={"PENDIENTE"}>CANCELADO</option>
                </select>

            </div>

            <div className=" m-2">
                <h2 className="text-gray-800 font-bold ">Resumen del pedido</h2>
                {pedido.pedido.map((articulo)=> (
                    <div key={articulo.id} className="mt-4">
                        <p className="text-sm text-gray-600">Producto: {articulo.nombre}</p>
                        <p className="text-sm text-gray-600">Cantidad: {articulo.cantidad}</p>

                    </div>
                ))}

                <p className="text-gray-800 mt-3 font-bold ">Total a pagar: 
                    <span className="font-light ">{total}</span>
                </p>
                <button className="flex items-center mt-4 bg-red-800 px-5 py-2 inline-block text-white rounded" >Eliminar Pedido</button>
            </div>
        </div>
    )
}

export default Pedido