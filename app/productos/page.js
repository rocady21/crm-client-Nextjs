"use client"
import React, { useState } from "react"
import Layout from "../components/Layout"
import { gql,useQuery,useMutation } from "@apollo/client"
import Swal from "sweetalert2"
import Link from "next/link"
import { useRouter } from "next/navigation"

const OBTENER_PRODUCTOS = gql`
    query obtenerProductos {
        obtenerProductos {
        id,
        nombre,
        precio,
        existencia,
        creado
        }
    }
`

const ELIMINAR_PRODUCTO = gql`
    mutation EliminarProducto($id : ID) {
        EliminarProducto(id : $id)
    }
`

const Productos = ()=> {

    // consultar los productos
    const router = useRouter()
    const [selected,setSelected] = useState(null)
    const {data,loading,errors} = useQuery(OBTENER_PRODUCTOS)
    const [EliminarProducto] = useMutation(ELIMINAR_PRODUCTO,{
        update(cache){
            // agarro mi query del cache
            const {obtenerProductos} = cache.readQuery({query:OBTENER_PRODUCTOS})

            // reescribo el cache
            cache.writeQuery({
                query:OBTENER_PRODUCTOS,
                data:{
                    obtenerProductos: obtenerProductos.filter((prod)=> {
                        return prod.id !== selected
                    })
                }
            })

        }
    })

    const Eliminarproducto = (idClient)=> {
        setSelected(idClient)
        Swal.fire({
            title: 'Estas seguro que deseas eliminar este usuario?',
            text: "Tenga en cuenta que no podrá recuperarlo",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Borrar definitivamente!'
          }).then(async (result) => {
            if(result.isConfirmed) {
                const {data} = await EliminarProducto({
                    variables:{
                        id:idClient
                    }
                })
                if(data.EliminarProducto) {
                    Swal.fire(
                        "Eliminado",
                        "Producto eliminado exitosamente!",
                        "success"
                    )
                }

            }
          })
    }
    const Editarproducto = (id)=> {
        router.push("/editarProducto/" + id)
    }

    return (
        <>
            <Layout>
                <h1 className="text-2xl text-gray-800 font-light mb-3">Productos</h1>
                
                <Link legacyBehavior href={"/nuevoProducto"}>
                    <a className="bg-blue-800 py-2 px-4 mt-3 text-white shadow hover:bg-gray-800 mb-3 font-bold uppercase text-sm">Nuevo Producto</a>
                </Link>

                <table className="table-auto shadow-md mt-5 w-full w-lg">
                    <thead className="bg-gray-800">
                        <tr className="text-white ">
                            <th className="w-1/5 py-2">Nombre</th>
                            <th className="w-1/5 py-2">Existencia</th>
                            <th className="w-1/5 py-2">Precio</th>
                            <th className="w-1/5 py-2">Eliminar</th>
                            <th className="w-1/5 py-2">Editar</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white p-4">
                        {
                            data && data.obtenerProductos.map((producto,index) => {
                                return <tr key={index} className="text-black px-3">
                                <td className="w-1/5 p-2">{producto.nombre}</td>
                                <td className="w-1/5 p-2">{producto.existencia} Piezas</td>
                                <td className="w-1/5 p-2">USD {producto.precio}</td>
                                <td className="flex justify-center p-2">
                                  <button onClick={()=> Eliminarproducto(producto.id)} className="flex flex-row items-center justify-around bg-red-800 py-2 border-none text-white rounded text-xs uppercase px-4 text-white">
                                  Eliminar 
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path>
</svg>
                                  </button>
                                </td> 
                                

                                <td className="p-2">
                                  <button onClick={()=> Editarproducto(producto.id)} className="flex p-51 flex-row items-center justify-around bg-green-600 py-2 border-none text-white rounded text-xs uppercase px-4 text-white">
                                  Editar 
                                  <svg fill="none" className="w-5 h-5 mx-2 align-center" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"></path>
</svg>
                                  </button>
                                </td> 
                            </tr>
                            }) 
                        }
                    </tbody>
                </table>

            </Layout>
        </>

    )
}

export default Productos