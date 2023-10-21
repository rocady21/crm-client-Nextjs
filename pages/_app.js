import client from "@/config/apollo"
import {ApolloProvider} from "@apollo/client"
console.log("X");
const MyApp  = ({Component,pageProps})=> {
    console.log("Weas");
    return (
    <ApolloProvider client={client}>
        <Component {...pageProps}/>
    </ApolloProvider>
    )
}

export default MyApp