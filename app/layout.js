'use client'

import { Inter } from 'next/font/google'
import './globals.css'

import {ApolloProvider} from "@apollo/client"
import client from '@/config/apollo'
const inter = Inter({ subsets: ['latin'] })




export default function RootLayout({ children }) {
  return (

    <html lang="en">
      <body className={inter.className}>
        <ApolloProvider client={client}>
          {children}
        </ApolloProvider>
      </body>
    </html>
  )
}
