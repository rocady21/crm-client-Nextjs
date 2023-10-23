"use client"
import React, { useState } from "react"
import Layout from "../components/Layout"
import {useFormik} from "formik"
import * as yup from "yup"
import { gql,useMutation} from "@apollo/client"
import { useRouter } from "next/navigation"

const NUEVO_CLIENTE = gql`
    mutation nuevoCliente($input : clienteInput) {
        nuevoCliente(input : $input) {
            id,
            nombre,
            apellido,
            email,
            empresa,
            id
        }
    }
`

const OBTENER_CLIENTES = gql`
    query obtenerClientesVendedor{
        obtenerClientesVendedor{
        nombre,
        apellido,
        empresa,
        email
        }
    }
`
const nuevoCliente = ()=> {

    const router = useRouter()
    // mutation para crear nuevo cliente
    const [nuevoCliente] = useMutation(NUEVO_CLIENTE,{
        update(cache, { data :nuevoCliente}) {
            //obtenemos el obj de cache que queramos actualizar
            const {obtenerClientesVendedor} = cache.readQuery({query:OBTENER_CLIENTES})
            
            // reescribimos el cache(NUNCA SE DEBE MODIFICAR,SOLO REESCRIBIR)
            cache.writeQuery({
                query: OBTENER_CLIENTES,
                data:{
                    obtenerClientesVendedor:[...obtenerClientesVendedor,nuevoCliente]
                }
            })
        }
    })
    const [resp,setResp] = useState({
        message:"",
        type:""
    })


    const formik = useFormik({
        initialValues:{
            nombre:"",
            apellido:"",
            email:"",
            empresa:"",
            telefono:""
        },
        validationSchema:yup.object({
            nombre:yup.string().required("El nombre es obligatorio"),
            apellido:yup.string().required("El apellido es obligatorio"),
            empresa:yup.string().required("La empresa es obligatoria"),
            email:yup.string().email("Email no valido").required("La empresa es obligatoria"),
        }),
        onSubmit:async(valores)=> {
            try {
                const {nombre,apellido,empresa,email,telefono} = valores
                
                const {data} = await nuevoCliente({
                    variables:{
                        input: {
                            nombre,
                            apellido,
                            empresa,
                            email,
                            telefono
                        }
                    }
                })

                if(data.nuevoCliente) {
                    setResp({message:"Cliente Creado Correctamente",type:"Success"})
                } else {
                    setResp({message:"Error al crear el cliente",type:"Error"})
                }
                setTimeout(() => {
                    if(resp.type = "Success"){
                        router.push("/")
                    } 
                    setResp({message:"",type:""})

                }, 3000);
            } catch (error) {
                console.log(error);
            }
        }
    })
    return (
        <>
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light my-4">Nuevo Cliente</h1>

            {resp.type === "Success" ? <div className={"bloc p-4 bg-green-200 border-l-4 border-green-600"}>
                <p>{resp.message}</p>
            </div> : resp.type === "Error" ? <div className={"bloc p-4 bg-red-200 border-l-4 border-red-600"}>
                <p className="text-red-600 uppercase font-bold">Error</p>
                <p>{resp.message}</p>
            </div> : null } 

            <div className="flex justify-center">
                <div className="w-full max-w-lg">
                    <form onSubmit={formik.handleSubmit} className="bg-white shadow-md px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <label className="bloc text-gray-700 text-sm font-bold mb-2 " htmlFor="nombre">Nombre</label>
                            <input onBlur={formik.handleBlur} id="nombre" name="nombre" onChange={formik.handleChange} value={formik.values.nombre} placeholder="Nombre Cliente" type="text" className="shadow apparence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        </div> 
                        {formik.errors.nombre ? <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-900 p-3 font-bold">
                            <p className="font-bold">Error</p>
                            <p>{formik.errors.nombre}</p>
                        </div> : null}

                        <div className="mb-4">
                            <label className="bloc text-gray-700 text-sm font-bold mb-2 " htmlFor="apellido">Apellido</label>
                            <input onBlur={formik.handleBlur} id="apellido" name="apellido" onChange={formik.handleChange} value={formik.values.apellido} placeholder="Apellido Cliente" type="text" className="shadow apparence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        </div> 
                        {formik.errors.apellido ? <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-900 p-3 font-bold">
                            <p className="font-bold">Error</p>
                            <p>{formik.errors.apellido}</p>
                        </div> : null}

                        <div className="mb-4">
                            <label className="bloc text-gray-700 text-sm font-bold mb-2 " htmlFor="empresa">Empresa</label>
                            <input onBlur={formik.handleBlur} id="empresa" name="empresa" onChange={formik.handleChange} value={formik.values.empresa} placeholder="Empresa" type="text" className="shadow apparence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        </div> 
                        {formik.errors.empresa ? <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-900 p-3 font-bold">
                            <p className="font-bold">Error</p>
                            <p>{formik.errors.empresa}</p>
                        </div> : null}

                        <div className="mb-4">
                            <label className="bloc text-gray-700 text-sm font-bold mb-2 " htmlFor="email">Email</label>
                            <input onBlur={formik.handleBlur} id="email" name="email" onChange={formik.handleChange} value={formik.values.email} placeholder="Email " type="email" className="shadow apparence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        </div> 
                        {formik.errors.email ? <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-900 p-3 font-bold">
                            <p className="font-bold">Error</p>
                            <p>{formik.errors.email}</p>
                        </div> : null}

                        <div className="mb-4">
                            <label className="bloc text-gray-700 text-sm font-bold mb-2 " htmlFor="telefono">Telefono</label>
                            <input onBlur={formik.handleBlur} id="telefono" name="telefono" onChange={formik.handleChange} value={formik.values.telefono} placeholder="Telefono" type="tel" className="shadow apparence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        </div> 
  

                        <input type="submit" value={"Registrar Cliente"} className="bg-gray-800 text-white w-full p-2 mt-5 font-bold uppercase hover:bg-gray-900"/>

                    </form>
                </div>
            </div>
        </Layout>
        </>
    )
}


export default nuevoCliente