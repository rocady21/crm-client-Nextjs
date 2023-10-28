'use client'
import React, { useState } from "react"
import { useFormik } from "formik"
import * as yup from "yup"
import {useRouter} from "next/router"
import { useQuery,useMutation,gql } from "@apollo/client"
import Layout from "@/components/Layout"

const NUEVACUENTA = gql`
mutation NuevoUsuario($input: inputUsuario) {
    nuevoUsuario(input: $input) {
      id,
      nombre
      apellido
      email
      password
      creado
    }
  }`

const NuevaCuenta = ()=> {


    // Mutation para crear nuevo usuario 
    // si es mutation es llaves rectasm sino llaves
    // la funcion de graphql para mutation siempre retorna lo que le mandemos
    const [nuevoUsuario] = useMutation(NUEVACUENTA)

    // validacion del formulario

    const [mensaje,guardarMensaje] = useState(null)
    const [mensajeOk,setmMnsajeOk] = useState(null)

    //routing
    const router = useRouter()

    const formik = useFormik({
        initialValues:{
            nombre:"",
            apellido:"",
            email:"",
            password:""
        },
        validationSchema: yup.object({
            nombre: yup.string().required("Debe de ingresar un nombre"),
            apellido: yup.string().required("El apellido es obigatorio"),
            email: yup.string().required("El email es requerido").email("el email no es valido"),
            password: yup.string().required("La contraseña debe de ser obligatoria").min(6,"El password debe de ser mayor a 6")
        }),
        onSubmit:async valores => {
            const {nombre,apellido,email,password} = valores
            try {
                const {data} = await nuevoUsuario({
                    variables: {
                        input:{
                            nombre,
                            apellido,
                            email,
                            password
                        }
                    }
                })
                setmMnsajeOk(`El usuario ${data.nuevoUsuario.nombre} se creo correctamente`)
                setTimeout(() => {
                    setmMnsajeOk(null)
                    router.push("/login")

                }, 3000);
            } catch (error) {
                // replace es para remplazar el string
                guardarMensaje(error.message.replace("GraphQL error:",""))

                setTimeout(() => {
                    guardarMensaje(null)
                }, 3000);
                //para redirigir al login
            }
        }
    })

    return (
        <Layout>
            <div className="text-center text-2xl text-white font-light">Crear Nueva Cuenta</div>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-sm">
                    

                    <form onSubmit={formik.handleSubmit} className="bg-white flex flex-col rounded shadow-md px-8 pt-6 pb-8 mb-4  ">
                        {mensaje && <div className="bg-red-200 border-l-4 border-l-red-400 py-2 px-3 w-full my-3">{mensaje}</div>}
                        {mensajeOk && <div className="bg-green-200 border-l-4 border-l-green-500 py-2 px-3 w-full my-3">{mensajeOk}</div>}

                        <div className="mb-4">
                            <label className="bloc text-gray-700 text-sm font-bold mb-2 " htmlFor="nombre">Nombre</label>
                            <input onBlur={formik.handleBlur} value={formik.values.nombre} onChange={formik.handleChange} placeholder="Nombre" type="text" id="nombre" className="shadow apparence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        </div>
                        {formik.touched.nombre && formik.errors.nombre ? <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-900 p-3 font-bold">
                            <p className="font-bold">Error</p>
                            <p>{formik.errors.nombre}</p>
                        </div> : null}
                        <div className="mb-4">
                            <label className="bloc text-gray-700 text-sm font-bold mb-2 " htmlFor="apellido">Apellido</label>
                            <input onBlur={formik.handleBlur} value={formik.values.apellido} onChange={formik.handleChange} placeholder="Apellido" type="text" id="apellido" className="shadow apparence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        </div>
                        {formik.touched.apellido && formik.errors.apellido ? <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-900 p-3 font-bold">
                            <p className="font-bold">Error</p>
                            <p>{formik.errors.apellido}</p>
                        </div> : null}
                        <div className="mb-4">
                            <label className="bloc text-gray-700 text-sm font-bold mb-2 " htmlFor="email">Email</label>
                            <input onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange} placeholder="Email Usuario" type="email" id="email" className="shadow apparence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        </div>
                        {formik.touched.email && formik.errors.email ? <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-900 p-3 font-bold">
                            <p className="font-bold">Error</p>
                            <p>{formik.errors.email}</p>
                        </div> : null}
                        <div className="mb-4">
                            <label className="bloc text-gray-700 text-sm font-bold mb-2 " htmlFor="password">Password</label>
                            <input onBlur={formik.handleBlur} value={formik.values.password} onChange={formik.handleChange} type="password" id="password" className="shadow apparence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        </div>
                        {formik.touched.password && formik.errors.password ? <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-900 p-3 font-bold">
                            <p className="font-bold">Error</p>
                            <p>{formik.errors.password}</p>
                        </div> : null}
                        <input type="submit" className="bg-gray-700 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900" value={"Crear Nueva Cuenta"}/>
                        
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default NuevaCuenta