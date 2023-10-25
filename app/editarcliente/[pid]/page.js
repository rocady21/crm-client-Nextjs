"use client"
import React from "react";
import {useRouter,useParams,useSearchParams} from "next/navigation"

const EditarCliente = ()=> {

    const params = useParams()
    const uparams = useSearchParams()
    console.log(uparams);
    console.log(params);
    
    return (
        <div>Editar Clientes</div>
    )
}


export default EditarCliente