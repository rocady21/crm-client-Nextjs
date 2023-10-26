"use client"
import React from "react";
import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as yup from "yup"
import {useMutation,gql} from "@apollo/client"
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

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

const NUEVO_PRODUCTO = gql`
    mutation nuevoProducto($input: ProductoInput) {
        nuevoProducto(input : $input) {
        creado,
        id,
        nombre
        precio,
        existencia
        }
    }
`

const NuevoProducto = ()=> {

    const [nuevoProducto] = useMutation(NUEVO_PRODUCTO,{
        update(cache, producto) {

            const {obtenerProductos} = cache.readQuery({query:OBTENER_PRODUCTOS})

            cache.writeQuery({
                query:OBTENER_PRODUCTOS,
                data:{
                    obtenerProductos: {...obtenerProductos,producto}
                }
            })

        }
    })
    const router = useRouter()
    const formik = useFormik({
        initialValues:{
            nombre:"",
            existencia:undefined,
            precio:undefined
        },
        validationSchema: yup.object({
            nombre: yup.string().required("Necesitamos que ingrese un nombre"),
            existencia: yup.number("Debe de ser un numero").required("La existencia es requerida").positive("no se aceptan numeros negativos").integer("Debe de ser entero"),
            precio: yup.number("Debe de ser un numero").required("La existencia es requerida")
        }),
        onSubmit:async (valores)=> {
            try {
                const {nombre,existencia,precio} = valores
                const {data} = await nuevoProducto({
                    variables:{
                        input:{
                            nombre,
                            existencia,
                            precio
                        }
                    }
                })
                if(data.nuevoProducto) {
                    Swal.fire("Producto Insertado","El producto se inserto correctamente!","success")
                    router.push("/productos")
                }
            } catch (error) {
                console.log(error);
            }

        }

    })

    return (
        <div>
            <Layout >
                <h1 className="text-2xl font-light mt-5 text-gray-800">Nuevo Producto</h1>
                <div className="w-full max-w-screen">

                <form onSubmit={formik.handleSubmit} className=" mt-10 bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4  ">
                        <div className="mb-4">
                            <label className="bloc text-gray-700 text-sm font-bold mb-2 " htmlFor="nombre">Nombre</label>
                            <input onBlur={formik.handleBlur} id="nombre" name="nombre" onChange={formik.handleChange} value={formik.values.nombre} placeholder="Nombre" type="text" className="shadow apparence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        </div> 
                        {formik.errors.nombre ? <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-900 p-3 font-bold">
                            <p className="font-bold">Error</p>
                            <p>{formik.errors.nombre}</p>
                        </div> : null}

                        <div className="mb-4">
                            <label className="bloc text-gray-700 text-sm font-bold mb-2 " htmlFor="existencia">Existencia</label>
                            <input  onBlur={formik.handleBlur}  id="existencia" name="existencia" onChange={formik.handleChange} value={formik.values.existencia} type="number" className="shadow apparence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        </div>
                        {formik.errors.existencia ? <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-900 p-3 font-bold">
                            <p className="font-bold">Error</p>
                            <p>{formik.errors.existencia}</p>
                        </div> : null}

                        <div className="mb-4">
                            <label className="bloc text-gray-700 text-sm font-bold mb-2 " htmlFor="precio">Precio en Dolares</label>
                            <input  onBlur={formik.handleBlur}  id="precio" name="precio" onChange={formik.handleChange} value={formik.values.precio} type="number" className="shadow apparence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        </div>
                        {formik.errors.precio ? <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-900 p-3 font-bold">
                            <p className="font-bold">Error</p>
                            <p>{formik.errors.precio}</p>
                        </div> : null}
                        <input type="submit" className="bg-gray-700 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900" value={"Agregar Producto"}/>
                        
                    </form>

                </div>
            </Layout>
        </div>
    )
}


export default NuevoProducto