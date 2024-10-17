import { Form, json, useActionData, redirect, useNavigation } from "react-router-dom"

export default function LoginPage(){

  const actionData = useActionData()
  const navigation = useNavigation()

    return(
    <main className="mt-24 sm:mt-5  h-3/5">

      <div className="min-h-full mt-5 sm:flex flex-1 flex-col justify-center px-6  lg:px-8">
        <div className="sm:mx-auto w-full sm:max-w-sm">
          <h2 className="text-center text-2xl sm:text-3xl font-bold leading-9 tracking-tight text-black">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Form method="post" className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-lg font-bold leading-6 text-black">
                User name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-md sm:leading-6"
                />
                
                {actionData && actionData.name && <small className="text-red-600">{actionData.name}</small>}
              </div>
            </div>

            <div>
              <div>
                <label htmlFor="password" className="block text-lg font-bold leading-6 text-black">
                  Password
                </label>

              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                />
                {actionData && actionData.password && <small className="text-red-600">{actionData.password}</small>}
                {actionData && actionData.message && <small className="text-red-600">{actionData.message}</small>}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-emerald-800 disabled:cursor-not-allowed disabled:bg-emerald-900 px-3 py-1.5 text-md font-bold leading-6 text-white shadow-sm hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
                disabled={navigation.state!=="idle"?true:false}
              >
                {navigation.state==="idle"?"Sign in":"Signing in..."}
              </button>
            </div>

            <p className="text-center mt-10 text-sm italic text-emerald-700">use  test123 as username and  test@123 as password</p>
          </Form>
        </div>
      </div>
    </main>
    )
}


export async function action({params, request}){
  const formData = await request.formData()

  const formToJSON = {};

  for (const [key, value] of [...formData.entries()]) {
    formToJSON[key] = value;
  }

  const errors = {}
  if(formToJSON.name.trim()===""){
    errors.name = "User name cannot be empty"
  } 
  if(formToJSON.password.length<6){
    errors.password = "Password length is less than 6 "
  }
  if(formToJSON.password.trim()===""){
    errors.password = "Password cannot be empty"
  } 
  if(errors.name || errors.password){
    return json(errors)
  }


  // console.log(formToJSON)

  const res = await fetch(import.meta.env.VITE_API_URL+"/login",{
    method:"POST",
    credentials: 'include',
    body:JSON.stringify(formToJSON),
    headers:{
      "Content-Type":"application/json",
    }
  })
  const resData = await res.json()

  if(resData.success){
    localStorage.setItem("userName",formToJSON.name)
    return redirect("/dashboard")
  }

  if(resData.errors){
    return json(resData.errors)
  }
  if(resData.message){
    return json(resData)
  }
}
