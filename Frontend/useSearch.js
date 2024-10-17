import { useState, useEffect } from "react"

export function useSearch(){
    const [value, setValue] = useState("")
    const [fetchedData, setFetchData] = useState([])
    
    useEffect(()=>{
        if(value.trim()===""){
            setFetchData([])
            return
        }
        const searchQuery = setTimeout(async()=>{
            
            const res = await fetch("http://localhost:3000/search?v="+value,{
                credentials:"include"
            })
            const resData = await res.json()

            console.log(resData)

            const searchRes = {} 
            searchRes.result = resData
    
            setFetchData(searchRes)

        },800)
        return ()=>clearTimeout(searchQuery)
    },[value])
    
    
    return {
        setValue,
        fetchedData
    }
}