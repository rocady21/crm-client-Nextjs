'use client'
import React from "react"
import { usePathname } from "next/navigation"
import "../globals.css"
import Sidebar from "./Sidebar"
import Header from "./Header"

const Layout = ({children})=> {
    const pathname = usePathname()
    return (
        <>
            {
                pathname === "/login" || pathname === "/nuevacuenta" ? <div className="bg-gray-800 min-h-screen flex flex-col justify-center">
                    <div>
                        {children}
                    </div>
            </div> : <div className="bg-gray-200 min-h-screen w-full">
                <div className="flex flex-row min-h-screen">
                    <Sidebar/>

                    <main className="sm:w-2/3 xl:w-4/5 sn:min-h-screen p-5">
                        <Header/>
                        {children}
                    </main>


                </div>

            </div>

            }

        </>
    )
}

export default Layout