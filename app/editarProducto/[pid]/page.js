"use client"
import Layout from "@/app/components/Layout";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Formik } from "formik";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import Swal from "sweetalert2";
import * as yup from "yup"


const CARGAR_PRODUCTO = gql`
query obtenerProductoById($id: ID) {
    obtenerProductoById(id : $id) {
      id,
      nombre,
      precio
      existencia,
    }
  }
`
const ACTUALIZAR_PRODUCTO = gql`
mutation actualizarProducto($id:ID, $input:ProductoInput) {
    actualizarProducto(id:$id, input:$input) {
      id,
      nombre,
      precio,
      existencia
    }
  }
`

const ActualizarProducto = () => {

    const { pid } = useParams()
    const router = useRouter()
    const { data, loading, error } = useQuery(CARGAR_PRODUCTO, {
        variables: {
            id: pid
        }
    })
    const [actualizarProducto] = useMutation(ACTUALIZAR_PRODUCTO)


    if (loading === true) {
        return "Cargando..."
    }

    if (!data.obtenerProductoById) {
        return "No hay producto con ese id"
    }

    const {obtenerProductoById} = data

    const validationSchema = yup.object({
        nombre: yup.string().required("Necesitamos que ingrese un nombre"),
        existencia: yup.number("Debe de ser un numero").required("La existencia es requerida").positive("no se aceptan numeros negativos").integer("Debe de ser entero"),
        precio: yup.number("Debe de ser un numero").required("La existencia es requerida")
    })
    return (
        <>
            <Layout>
                <div className="w-md-full w-full">
                    <h1 className="text-2xl font-light mt-5 text-gray-800">Nuevo Producto</h1>
                    <div className="w-full max-w-screen">
                        <Formik
                            validationSchema={validationSchema}
                            enableReinitialize
                            initialValues={obtenerProductoById}
                            onSubmit={async(valores) => {
                                const {nombre,precio,existencia} = valores
                                const {data} = await actualizarProducto({
                                    variables:{
                                        id:pid,
                                        input: {
                                            nombre,
                                            precio,
                                            existencia
                                        }
                                    }
                                })

                                if(data.actualizarProducto) {
                                    Swal.fire(
                                        "Actualizado",
                                        "Producto Actualizado Correctamente",
                                        "success"
                                        )
                                    router.push("/productos")

                                }
                            }}
                        >
                            {
                                props => {
                                    return ( <form onSubmit={props.handleSubmit} className=" mt-10 bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4  ">
                                        <div className="mb-4">
                                            <label className="bloc text-gray-700 text-sm font-bold mb-2 " htmlFor="nombre">Nombre</label>
                                            <input onBlur={props.handleBlur} id="nombre" name="nombre" onChange={props.handleChange} value={props.values.nombre} placeholder="Nombre" type="text" className="shadow apparence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                        </div>
                                        {props.errors.nombre ? <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-900 p-3 font-bold">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.nombre}</p>
                                        </div> : null}

                                        <div className="mb-4">
                                            <label className="bloc text-gray-700 text-sm font-bold mb-2 " htmlFor="existencia">Existencia</label>
                                            <input onBlur={props.handleBlur} id="existencia" name="existencia" onChange={props.handleChange} value={props.values.existencia} type="number" className="shadow apparence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                        </div>
                                        {props.errors.existencia ? <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-900 p-3 font-bold">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.existencia}</p>
                                        </div> : null}

                                        <div className="mb-4">
                                            <label className="bloc text-gray-700 text-sm font-bold mb-2 " htmlFor="precio">Precio en Dolares</label>
                                            <input onBlur={props.handleBlur} id="precio" name="precio" onChange={props.handleChange} value={props.values.precio} type="number" className="shadow apparence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                        </div>
                                        {props.errors.precio ? <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-900 p-3 font-bold">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.precio}</p>
                                        </div> : null}
                                        <input type="submit" className="bg-gray-700 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900" value={pid? "Editar Producto" : "Agregar Producto"} />

                                    </form>)
                                }
                            }

                        </Formik>
                    </div>

                </div>
            </Layout>
        </>
    )

}

export default ActualizarProducto