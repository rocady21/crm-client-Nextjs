"use client"
import React, { useState } from "react"
import * as yup from "yup"
import { useFormik } from "formik"
import {gql,useMutation} from "@apollo/client"
import {useRouter} from "next/navigation"
import Layout from "../components/Layout"

const LOGINUSER = gql`
    mutation loginUser($input : inputLogin ) {
        loginUser(input : $input) {
        token
        }
    }
`

const Login = ()=> {

    // mutation para login user
    const [error,setError] = useState(null)
    const [loginUser] = useMutation(LOGINUSER)
    const router = useRouter()
    const formik = useFormik({
        initialValues:{
            email:"",
            password:""
        },
        validationSchema:yup.object({
            email:yup.string().email("Debe de ingresar un email valido").required("El email es obligatorio"),
            password:yup.string().required("El password es obligatorio")

        }),
        onSubmit:async (valores)=> {
            try {
                const {data} = await loginUser({
                    variables:{
                        input:{
                            email:valores.email,
                            password:valores.password
                        }
                    }
                })

                const {token} = data.loginUser
                localStorage.setItem("token",token)

                router.push("/")

            } catch (error) {
                setError(error.message)

                setTimeout(() => {
                    setError(null)
                }, 2000);
            }
        }

    })

    return (
        <Layout>
            <div className="text-center text-2xl text-white font-light">Login</div>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-sm">
                    <form onSubmit={formik.handleSubmit} className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4  ">
                        {error? <div className="border-l-[5px] p-3 border-red-400 bg-red-200">{error}</div> : null}

                        <div className="mb-4">
                            <label className="bloc text-gray-700 text-sm font-bold mb-2 " htmlFor="nombre">Email</label>
                            <input onBlur={formik.handleBlur} id="email" name="email" onChange={formik.handleChange} value={formik.values.email} placeholder="Email Usuario" type="text" className="shadow apparence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        </div> 
                        {formik.errors.email ? <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-900 p-3 font-bold">
                            <p className="font-bold">Error</p>
                            <p>{formik.errors.email}</p>
                        </div> : null}
                        <div className="mb-4">
                            <label className="bloc text-gray-700 text-sm font-bold mb-2 " htmlFor="password">Password</label>
                            <input  onBlur={formik.handleBlur}  id="password" name="password" onChange={formik.handleChange} value={formik.values.password} type="password" className="shadow apparence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        </div>
                        {formik.errors.password ? <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-900 p-3 font-bold">
                            <p className="font-bold">Error</p>
                            <p>{formik.errors.password}</p>
                        </div> : null}
                        <input type="submit" className="bg-gray-700 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900" value={"Iniciar Sesion"}/>
                        
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default Login