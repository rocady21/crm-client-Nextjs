import React from "react";
import {useQuery,gql} from "@apollo/client"
import {useRouter} from "next/navigation"

const OBTENER_INFO_USER = gql`
    query obtenerInfoByToken{
        obtenerInfoByToken {
        id,
        nombre,
        apellido
        }
    }
`

const Header = ()=> {
    const router = useRouter()
    const {data,loading,error} = useQuery(OBTENER_INFO_USER)

    const cerrarSession = ()=> {
        localStorage.removeItem("token")
        router.push("/login")
    }

    if(loading === true) {
        return "Cargando..."
        
    } 
    
    if(!data.obtenerInfoByToken) {
        console.log("mp deeeeeeeeeeeea");
        return router.push("/login")
    }
    return (
        <div className="flex justify-between">
            <p className="px-4">Hola {data?.obtenerInfoByToken.nombre}</p>
            <button className="bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 text-white shadow-md px-2" onClick={cerrarSession}>Cerrar Sesion</button>
        </div>
    )
}

export default Header