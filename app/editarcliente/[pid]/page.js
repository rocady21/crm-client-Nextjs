"use client"
import React from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation"
import { gql, useQuery, useMutation } from "@apollo/client"
import Layout from "@/app/components/Layout";
import { useFormik,Formik } from "formik";
import * as yup from "yup"
import Swal from "sweetalert2";



const OBTENER_INFO_CLIENTE = gql`
query obtenerCliente($id : ID) {
    obtenerCliente(id : $id) {
      nombre,
      apellido,
      empresa,
      email,
      telefono
    }
  }
`

const ACTUALIZAR_CLIENTE = gql`
mutation actualizarCliente($id : ID , $input : clienteInput ) {
    actualizarCliente(id : $id , input : $input) {
      nombre,
      apellido,
      empresa,
      email,
      telefono
    }
  }
`

const EditarCliente = () => {
    const router = useRouter()
    const { pid } = useParams()
    const [actualizarCliente] = useMutation(ACTUALIZAR_CLIENTE)
    const { data, loading, error } = useQuery(OBTENER_INFO_CLIENTE, {
        variables: {
            id: pid
        },
    })

    if (loading === true) {
        return "Cargando..."
    }

    const {obtenerCliente} = data

    const schemaValidacion = yup.object({
        nombre:yup.string().required("El nombre es obligatorio"),
        apellido:yup.string().required("El apellido es obligatorio"),
        empresa:yup.string().required("La empresa es obligatoria"),
        email:yup.string().email("Email no valido").required("La empresa es obligatoria"),
    })

    const actualizarClienteMut = async(valores)=> {
        const {nombre,apellido,empresa,email,telefono} = valores

        try {
            const {data} = await actualizarCliente({
                variables:{
                    id: pid,
                    input: {
                        nombre,
                        apellido,
                        empresa,
                        email,
                        telefono
                    }
                }
            })



            if(data.actualizarCliente) {
                Swal.fire(
                    "Actualizado",
                    "El cliente se actualizo correctamente",
                    "success"
                )
                router.push("/")
            }

            console.log(data);
        } catch (error) {
            console.log(error);   
        }

    }






    return (
        <Layout>
            <div className="w-full h-full-screen">
                <h1 className="text-2xl font-light">Editar Cliente</h1>
                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-lg">
                        <Formik
                            //para pasarle las validaciones del fomulario
                            validationSchema={schemaValidacion}
                            // para que se reinicie el formulario
                            enableReinitialize
                            initialValues={obtenerCliente}
                            onSubmit={(valores)=> {
                                actualizarClienteMut(valores)
                            } }
                        >

                            {
                                props => {
                                    return (
                                        <form onSubmit={props.handleSubmit} className="bg-white shadow-md px-8 pt-6 pb-8 mb-4">
                                            <div className="mb-4">
                                                <label className="bloc text-gray-700 text-sm font-bold mb-2 " htmlFor="nombre">Nombre</label>
                                                <input value={props.values.nombre} onChange={props.handleChange} onBlur={props.handleBlur}  id="nombre" name="nombre"  placeholder="Nombre Cliente" type="text" className="shadow apparence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                            </div>
                                            {props.errors.nombre ? <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-900 p-3 font-bold">
                                                <p className="font-bold">Error</p>
                                                <p>{props.errors.nombre}</p>
                                            </div> : null}
                                            <div className="mb-4">
                                                <label className="bloc text-gray-700 text-sm font-bold mb-2 " htmlFor="apellido">Apellido</label>
                                                <input value={props.values.apellido} onChange={props.handleChange} onBlur={props.handleBlur} id="apellido" name="apellido" placeholder="Apellido Cliente" type="text" className="shadow apparence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                            </div>
                                            {props.errors.apellido ? <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-900 p-3 font-bold">
                                                <p className="font-bold">Error</p>
                                                <p>{props.errors.apellido}</p>
                                            </div> : null}
                                            

                                            <div className="mb-4">
                                                <label className="bloc text-gray-700 text-sm font-bold mb-2 " htmlFor="empresa">Empresa</label>
                                                <input value={props.values.empresa} onChange={props.handleChange} onBlur={props.handleBlur} id="empresa" name="empresa" placeholder="Empresa" type="text" className="shadow apparence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                            </div>
                                            {props.errors.empresa ? <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-900 p-3 font-bold">
                                                <p className="font-bold">Error</p>
                                                <p>{props.errors.empresa}</p>
                                            </div> : null}

                                            <div className="mb-4">
                                                <label className="bloc text-gray-700 text-sm font-bold mb-2 " htmlFor="email">Email</label>
                                                <input value={props.values.email} onChange={props.handleChange} onBlur={props.handleBlur} id="email" name="email" placeholder="Email " type="email" className="shadow apparence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                            </div>
                                            {props.errors.email ? <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-900 p-3 font-bold">
                                                <p className="font-bold">Error</p>
                                                <p>{props.errors.email}</p>
                                            </div> : null}

                                            <div className="mb-4">
                                                <label className="bloc text-gray-700 text-sm font-bold mb-2 " htmlFor="telefono">Telefono</label>
                                                <input value={props.values.telefono} onChange={props.handleChange} onBlur={props.handleBlur} id="telefono" name="telefono" placeholder="Telefono" type="tel" className="shadow apparence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                            </div>
                                            {props.errors.telefono ? <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-900 p-3 font-bold">
                                                <p className="font-bold">Error</p>
                                                <p>{props.errors.telefono}</p>
                                            </div> : null}


                                            <input type="submit" value={"Registrar Cliente"} className="bg-gray-800 text-white w-full p-2 mt-5 font-bold uppercase hover:bg-gray-900" />

                                        </form>

                                    )

                                }
                            }
                        </Formik>
                    </div>
                </div>
            </div>

        </Layout>
    )
}


export default EditarCliente