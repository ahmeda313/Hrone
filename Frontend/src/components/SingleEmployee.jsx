import { useNavigate, useSubmit } from "react-router-dom"

export default function SingleEmployee({id, image, name, email, mobilenum, designation, gender, course, creation_date}){

    const submit = useSubmit()
    const navigate = useNavigate()

    function deleteEmployee(){
        const formData = new FormData()
        formData.append("id",id)
        submit(formData, {method:"DELETE"})
    }

    function updateEmployee(){
        navigate("/updateEmployee/"+id)
    }

    return(
        <tr className="hover:bg-gray-300">
            <td className="border border-black p-2">{id}</td>
            <td className="border border-black p-2"><img className="max-h-20 aspect-auto" src={`${image}`} alt={name} /></td>
            <td className="border border-black p-2">{name}</td>
            <td className="border border-black p-2">{email}</td>
            <td className="border border-black p-2">{mobilenum}</td>
            <td className="border border-black p-2">{designation}</td>
            <td className="border border-black p-2">{gender}</td>
            <td className="border border-black p-2">{course}</td>
            <td className="border border-black p-2">{creation_date.split("T")[0]}</td>
            <td className="border border-black p-2 ">
                <div className="flex items-center gap-3">
                <button className="text-blue-800 font-medium underline hover:opacity-80" onClick={updateEmployee}>Edit</button>
                <button className="text-red-600 font-medium underline hover:opacity-80" type="submit" onClick={deleteEmployee}>Delete</button>
                </div>
            </td>

        </tr>
    )
}