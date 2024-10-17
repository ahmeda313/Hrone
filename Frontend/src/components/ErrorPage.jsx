import { useRouteError, isRouteErrorResponse } from "react-router-dom"

export default function Errorpage(){
    const error = useRouteError()
        
    return<>
    <h1 className="mt-10 ms-5 text-3xl font-bold text-center">OOPS!</h1>
    {!error.data &&  <h2 className="mt-2 text-xl font-medium text-center">Something went wrong</h2>}
    <h2 className="mt-2 text-xl font-medium text-center">{error?.statusText}</h2>
    <h2 className="mt-2 text-xl font-medium text-center">{error?.data}</h2>
    </>
}