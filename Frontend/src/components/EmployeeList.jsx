import { useLoaderData, Await, defer, redirect, useNavigate, Link, useParams} from "react-router-dom";
import SingleEmployee from "./SingleEmployee";
import { Suspense } from "react";
import Loading from "./Loading";
import { useSearch } from "../../useSearch";



export default function EmployeeList(){
    const {resData} = useLoaderData()
    const navigate = useNavigate()
    const  { page } = useParams()
    const {setValue, fetchedData} = useSearch()
   

    function searchFunction(e){
        setValue(e.target.value)
    }

    
    return(
        <Suspense fallback={<Loading className="mt-10 h-8 flex justify-center" />}>
        <Await resolve={fetchedData.result?.length>0?fetchedData:resData}>
            {(data)=>(
        <>
        <div className="mx-auto w-5/6 mt-5 sm:mt-8 flex justify-between gap-2">
            <div className="space-y-4">
                <h1 className="text-2xl"> Employees</h1>
                <button onClick={()=>navigate("/addEmployee")} className="rounded-md bg-emerald-800 disabled:cursor-not-allowed px-1 sm:px-3 py-1 sm:py-1.5 text-sm sm:text-md font-bold leading-6 text-white shadow-sm hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700">Add employee</button>
            </div>
            <div className="w-1/2 sm:w-1/3">
                <input type="search" placeholder="Search" className="w-full px-2 sm:mx-5 rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:p-1 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6" onChange={searchFunction}/>
                <h1 className="mt-4">Total employees <span className="font-semibold">{data.count || data.result.length}</span></h1>
            </div>
        </div>
        <div className="mx-auto w-5/6 p-1 overflow-x-scroll lg:overflow-hidden">
        <table className="m-2 mx-auto border border-black w-full shadow-lg shadow-black">
        <thead>
            <tr>
                <th className="text-left border border-black p-2">Id</th>
                <th className="text-left border border-black p-2">Image</th>
                <th className="text-left border border-black p-2">Name</th>
                <th className="text-left border border-black p-2">E-mail</th>
                <th className="text-left border border-black p-2">Mobile number</th>
                <th className="text-left border border-black p-2">Designation</th>
                <th className="text-left border border-black p-2">Gender</th>
                <th className="text-left border border-black p-2">Course</th>
                <th className="text-left border border-black p-2">Creation date</th>
                <th className="text-left border border-black p-2">Action</th>
            </tr>
        </thead>
        <tbody>

            {data.result.map(emp=><SingleEmployee key={emp.id} {...emp}/>)}

        </tbody>
        </table>
        </div> 
        <div className="flex justify-center gap-3 mt-5 sm:mt-8">
            
            {+page>1 ? <Link to={`/allEmployees/${+page-1}`} className="rounded-md bg-emerald-800 disabled:cursor-not-allowed px-1 sm:px-3 py-1 sm:py-1.5 text-sm sm:text-md font-bold leading-6 text-white shadow-sm hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700">{"<<"}</Link>:<button disabled className="rounded-md bg-emerald-800 disabled:cursor-not-allowed px-1 sm:px-3 py-1 sm:py-1.5 text-sm sm:text-md font-bold leading-6 text-white shadow-sm hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700">{"<<"}</button>}
            
            {+page<Math.ceil(+data.count/2) ? <Link to={`/allEmployees/${+page+1}`} className="rounded-md bg-emerald-800 disabled:cursor-not-allowed px-1 sm:px-3 py-1 sm:py-1.5 text-sm sm:text-md font-bold leading-6 text-white shadow-sm hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700">{">>"}</Link> :<button disabled className="rounded-md bg-emerald-800 disabled:cursor-not-allowed px-1 sm:px-3 py-1 sm:py-1.5 text-sm sm:text-md font-bold leading-6 text-white shadow-sm hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700">{">>"}</button>}
        </div>
        </>)}
        </Await>
        </Suspense>

    )
}

async function getData(page){
        
        const res = await fetch(`${import.meta.env.VITE_API_URL}/employeeList?page=${page}`,{
            credentials:"include"
        })
        if(!res.ok){
            return Promise.reject(new Error("not autheticated"))
        }else{
            const resData = await res.json()
            return resData
        }
}


export async function loader({params}){
    if(+params.page<=0){
        params.page = 1
    }

    let resData = null
    try{
        resData = await getData(params.page)
    }catch(e){
        return redirect("/")
    }
    return defer({resData})    
}

export async function action({request, params}){
    const body = await request.formData()
    const [id] = [...body.entries()]
    console.log(id[1])

    const res = await fetch(import.meta.env.VITE_API_URL+"/deleteEmployee/"+id[1],{
        method:"DELETE",
        credentials:"include"
    })
    const resData = await res.json()

    if(resData.success){
        redirect("/allEmployees")
    }
    else{
        console.log(resData)
    }

    return null
}