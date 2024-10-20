import { useState, useEffect } from "react"

export function useSearch(){
    const [value, setValue] = useState("")
    const [fetchedData, setFetchData] = useState([])
    const [loading, setLoading] = useState(false)
    const [notFound, setNotFound] = useState(false)
    
    useEffect(()=>{
        if(value.trim()===""){
            setFetchData([])
            setNotFound(false)
            setLoading(false)  
            return
        }

        setLoading(true)  
        setNotFound(false) 

        const searchQuery = setTimeout(async()=>{
            const res = await fetch(import.meta.env.VITE_API_URL+"/search?v="+value,{
                credentials:"include"
            })
            const resData = await res.json()

            if(resData.length===0){
                setNotFound(value)
            }

            const searchRes = {} 
            searchRes.result = resData
        
            setLoading(false)   
        
            setFetchData(searchRes)

        },800)
        return ()=>clearTimeout(searchQuery)
    },[value])
    
    
    return {
        setValue,
        fetchedData,
        loading,
        notFound
    }
}