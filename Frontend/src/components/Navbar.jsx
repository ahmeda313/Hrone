import { NavLink, redirect, useResolvedPath, useSubmit } from "react-router-dom";


const name = localStorage.getItem("userName")
export default function Navbar(){
    const submit = useSubmit()
    const path = useResolvedPath()
    

    function logOutFn(){
        localStorage.removeItem("useName")
        submit(null, {method:"POST"})
    }
    return(
        <>
        <nav className="flex justify-between p-4 bg-emerald-800 text-white w-screen">
            <h1 className="font-bold pt-3 sm:pt-0 text-2xl sm:text-4xl">
                Hrone
            </h1>
            {path.pathname!=="/" &&
            <>
            <ul className="flex justify-around hidden sm:flex gap-20 p-2 font-semibold text-lg">
                <li className="mt-1">
                    <NavLink to="/dashboard" className={({isActive})=>isActive?"p-2 hover:bg-emerald-700 rounded-md bg-emerald-700":"p-2 hover:bg-emerald-700 rounded-md "}> Home</NavLink>
                </li>
                <li className="mt-1">
                    <NavLink to="/allEmployees/1" className={({isActive})=>isActive?"p-2 hover:bg-emerald-700 rounded-md bg-emerald-700":"p-2 hover:bg-emerald-700 rounded-md "}> Employee list</NavLink>
                </li>
            </ul>
            <div className="mt-5 sm:mt-0 justify-between flex flex-col sm:flex-row sm:gap-14">
                <div className="mt-1 p-1 font-bold text-sm sm:text-lg flex gap-2">
                <svg className="mt-0.5 h-4 sm:h-6" style={{enableBackground:"new 0 0 24 24", fill:"white"}} version="1.1" viewBox="0 0 24 24" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g id="info"/><g id="icons"><g id="user"><ellipse cx="12" cy="8" rx="5" ry="6"/><path d="M21.8,19.1c-0.9-1.8-2.6-3.3-4.8-4.2c-0.6-0.2-1.3-0.2-1.8,0.1c-1,0.6-2,0.9-3.2,0.9s-2.2-0.3-3.2-0.9    C8.3,14.8,7.6,14.7,7,15c-2.2,0.9-3.9,2.4-4.8,4.2C1.5,20.5,2.6,22,4.1,22h15.8C21.4,22,22.5,20.5,21.8,19.1z"/></g></g></svg>
                   <h1 className="">{name}</h1> 
                </div>
                <button className="mt-1 ml- bg-red-500 text-white text-sm sm:text-lg p-1 sm:px-2 rounded-md sm:h-10 font-bold  hover:shadow-none duration-300 shadow-md shadow-black" onClick={logOutFn}>Logout</button>
            </div>
            </>}
        </nav>
        {path.pathname!=="/" &&
        <ul className="pb-2 flex justify-around bg-emerald-800 sm:hidden p-1 font-semibold text-sm text-white">
            <li className="mt-1">
                <NavLink to="/dashboard" className={({isActive})=>isActive?"p-1 hover:bg-emerald-700 rounded-md bg-emerald-700":"p-1 hover:bg-emerald-700 rounded-md "}> Home</NavLink>
            </li>
            <li className="mt-1">
                <NavLink to="/allEmployees/1" className={({isActive})=>isActive?"p-1 hover:bg-emerald-700 rounded-md  bg-emerald-700":"p-1 hover:bg-emerald-700 rounded-md"}> Employee list</NavLink>
            </li>
        </ul>}
        </>
    )
}

export async function action({request}){
    const resData = await fetch(import.meta.env.VITE_API_URL+"/logout",{
        method:request.method,
        credentials:"include"
    })

    return redirect("/")
}