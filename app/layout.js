'use client'

import { Inter } from 'next/font/google'
import './globals.css'

import {ApolloProvider} from "@apollo/client"
import client from '@/config/apollo'
import PedidoState from './context/pedidos/PedidosState'
const inter = Inter({ subsets: ['latin'] })




export default function RootLayout({ children }) {
  return (

    <html lang="en">
      <body className={inter.className}>
        <PedidoState>
          <ApolloProvider client={client}>
            {children}
          </ApolloProvider>
        </PedidoState>
      </body>
    </html>
  )
}
