import { Form, useActionData, json, redirect, useLoaderData, useNavigation, useNavigate } from "react-router-dom"
import { useRef, useState } from "react"


let image = null

export default function EmployeeForm({method, update}) {

  const inputRef = useRef()
  const [pickedImage, setPickedImage] = useState()
  const actionData = useActionData()
  const data = useLoaderData()
  const navigation = useNavigation()
  const navigate = useNavigate()


  function imageInputChange(e){
    const file = e.target.files[0]
    if(data && data.image){
      data.image = null
    }

    if(!file){
      setPickedImage(null)
      return
    }

    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = ()=>{
      image = fileReader.result
      setPickedImage(fileReader.result)
    }
  }

  let buttonTxt = 'Add'
  if(update){
    buttonTxt = "Update"
  }

  return (
    <Form method={method}>
      <div className="mt-6 p-4 sm:flex flex-col items-center">
      <div className="space-y-8 sm:min-w-[32rem]">
          <h2 className="text-2xl sm:text-3xl font-bold leading-7 text-black">Create profile</h2>
            <div className="sm:col-span-4">
              <label htmlFor="userName" className="block text-lg font-bold leading-6 text-black">
                User name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                  <input
                    required
                    id="userName"
                    name="userName"
                    type="text"
                    placeholder="janesmith"
                    autoComplete="username"
                    className="block flex-1 rounded-md border-0 bg-white py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                    defaultValue={update && data && data.name}
                  /> 
                </div>
                  {actionData?.includes("userName") && <small className="text-red-600">user name cannot be empty</small>}
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-lg font-bold leading-6 text-black">
                E-mail
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                  <input
                    required
                    id="email"
                    name="email"
                    type="email"
                    placeholder="janesmith@deals.com"
                    autoComplete="email"
                    className="block flex-1 border-0 bg-white py-1.5 pl-1 text-gray-900 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                    defaultValue={update && data && data.email}
                  />
                </div>
                  {actionData?.includes("email") && <small className="text-red-600">E-mail is invalid</small>}
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="mobileNum" className="block text-lg font-bold leading-6 text-black">
                Mobile number
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                  <input
                    required
                    id="mobileNum"
                    name="mobileNum"
                    type="tel"
                    placeholder="7981692733"
                    autoComplete="number"
                    maxLength={10}
                    className="block flex-1 border-0 bg-white py-1.5 pl-1 text-gray-900 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                    defaultValue={update && data && data.mobilenum}
                  />
                </div>
                  {actionData?.includes("mobileNum") && <small className="text-red-600">mobile number is invalid</small>}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="designation" className="block text-lg font-bold leading-6 text-black">
                Designation
              </label>
              <div className="mt-2">
                <select
                  id="designation"
                  name="designation"
                  autoComplete="designation"
                  className="block w-full border-0 py-1.5 text-black rounded-md shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm sm:leading-6"
                  defaultValue={update && data && data.designation}
                >
                  <option>HR</option>
                  <option>Manager</option>
                  <option>Sales</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-3">
              <legend className="text-lg font-bold leading-6 text-black">Gender</legend>
              <div className="mt-2 flex gap-3">
                <div className="flex items-center gap-1">
                  <input
                    required
                    id="male"
                    name="gender"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-black focus:ring-indigo-600"
                    value="male"
                    defaultChecked={update && data && data.gender==="male"}
                  />
                  <label htmlFor="male" className="block text-md font-semibold leading-6 text-black">
                    Male
                  </label>
                </div>

                <div className="flex items-center gap-1">
                  <input
                    required
                    id="female"
                    name="gender"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-black focus:ring-indigo-600"
                    value="female"
                    defaultChecked={update && data && data.gender==="female"}
                  />
                  <label htmlFor="female" className="block text-md font-semibold leading-6 text-black">
                    Female
                  </label>
                </div>
              </div>
                {actionData?.includes("gender") && <small className="text-red-600">please select your gender</small>}
            </div>


            <div className="col-span-full">
              <label htmlFor="photo" className="block text-lg font-bold leading-6 text-black">
                Photo
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                <div className="border border-black h-24 w-20">
                  {(pickedImage || update) && <img src={update && data && data.image ? `http://localhost:3000/${data.image}`:pickedImage} alt="selected image" />}
                  <input type="file" name="image" ref={inputRef} accept="image/jpeg, image/png, image/jpg" onChange={imageInputChange}  hidden required={!update}/>
                </div>
                <button
                  type="button"
                  className="rounded-md bg-emerald-800 px-2.5 py-1.5 text-md font-bold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-emerald-700"
                  onClick={()=>inputRef.current.click()}
                >
                  Select
                </button>
              </div>
              {actionData?.includes("image") && <small className="text-red-600">please select your image</small>}
            </div>

            <fieldset>
              <legend className="text-lg font-bold leading-6 text-black">Course</legend>
              <div className="mt-2 space-y-2">
                
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                    defaultChecked={update && data && data.course.includes("BCA") || !update}
                      id="bca"
                      name="course"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      value="BCA"
                      multiple
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="bca" className="text-md font-semibold text-black">
                      BCA
                    </label>
                  </div>
                </div>

                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="bsc"
                      name="course"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      value="BSC"
                      defaultChecked={update && data && data.course.includes("BSC")}
                      multiple
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="bsc" className="text-md font-semibold text-black">
                      BSC
                    </label>
                  </div>
                </div>

                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="msc"
                      name="course"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      value="MSC"
                      defaultChecked={update && data && data.course.includes("MSC")}
                      multiple
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="msc" className="text-md font-semibold text-black">
                      MSC
                    </label>
                  </div>
                </div>

              </div>
            </fieldset>

      </div>

      <div className="mt-6 sm:w-[32rem] flex items-center justify-end gap-x-6">
        <button type="button" className="text-lg font-bold leading-6 text-black" onClick={()=>navigate("/allEmployees/1")}>
          Cancel
        </button>
        <button
          type="submit"
          className="flex rounded-md bg-emerald-800 px-3 py-2 text-lg font-bold text-white shadow-sm hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {navigation.state==="idle"?buttonTxt:`Submiting...`}
        </button>
      </div>
    </div>
    </Form>
  )
}


export async function action({request, params}){
  const formData = await request.formData()
  console.log(request.method)
 
  let errors = []
  const formToJSON = {};

  for (const [key, value] of [...formData.entries()]) {
    if(key==="email" && !value.includes("@") && !value.includes(".")){
      errors.push("email")
    }
    if(value.trim()===""){
      errors.push(key)
    }
    if(key==="course"){
      formToJSON[key] = formToJSON[key] ?[value,...formToJSON[key]]:[value]
    }else{
      formToJSON[key] = value;
    }
  }


  if(image===null && request.method!=="PATCH"){
    errors.push("image")
  }else{
    formToJSON.image = image
  }


  if(request.method==="PATCH"){
    errors = errors.filter(i=>i!=="image")
  }

  if(errors.length>0){
    console.log(errors)
    return json(errors)
  }


  let URL = "http://localhost:3000/createEmployee"
  if(request.method==="PATCH"){
    URL = "http://localhost:3000/updateEmployee/"+params.id
  }

  const res = await fetch(URL,{
    method:request.method,
    body:JSON.stringify(formToJSON),
    credentials:"include",
    headers:{
      "Content-Type":"application/json"
    }
  })

  if(!res.ok){
    return redirect("/")
  }

  const resData = await res.json()

  if(resData.errors?.length >0){
    return json(resData.errors)
  }
  if(resData.success){
    return redirect("/allEmployees/1")
  }
  
  return null
}


export async function loader({params}){
  const res = await fetch("http://localhost:3000/getEmployee/"+params.id,{
    credentials:"include"
  })

  if(!res.ok){
    return redirect("/")
  }
  const resData = await res.json()


  return resData
}