import { Outlet, useNavigation } from "react-router-dom"
import Navbar from "./Navbar"
import Loading from "./Loading"

export default function RootLayout(){
    
    const navigation = useNavigation()
    return(
        <>
            <Navbar />
            {navigation.state==="loading" ? <Loading className="mt-10 mx-auto flex justify-center"/>:<Outlet/>}
        </>
    )
}