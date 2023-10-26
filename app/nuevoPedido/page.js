"use client"

import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import Select from "react-select"
import AsignarCliente from "../components/pedidos/AsignarCliente";

import PedidoContext from "../context/pedidos/PedidoContext";
import AsignarProducto from "../components/pedidos/AsignarProducto";
import ResumenPedido from "../components/pedidos/ResumenPedido";
import Total from "../components/pedidos/Total";

const NuevoPedido = ()=> {

    // usar context
    const ctx = useContext(PedidoContext)

    console.log(ctx);

    return (
        <Layout>
            <h1 className="text 2xl mt-5 text-gray-800 font-light ">Nuevo pedido</h1>
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <AsignarCliente/>
                    <AsignarProducto/>
                    <ResumenPedido/>
                    <Total/>

                    <button className={"bg-gray-800 w-full mt-5 p-2 text-white hover:bg-gray-900"}>Registrar Pedido</button>
                </div>
            </div>
            
        </Layout>

    )
}

export default NuevoPedido