import { createBrowserRouter, RouterProvider} from "react-router-dom"

import {action as logOutAction} from "./components/Navbar" 
import RootLayout from "./components/RootLayout"
import LoginPage, {action as loginAction} from "./components/LoginPage"
import Dashboard from "./components/Dashboard"
import EmployeeList, {loader as employeeListLoader, action as deleteAction} from "./components/EmployeeList"
import EmployeeForm, {action as employeeAction, loader as employeeLoader} from "./components/EmployeeForm"
import Errorpage from "./components/ErrorPage"


const router = createBrowserRouter([
  {
    path:"/",
    element:<RootLayout/>,
    action:logOutAction,
    errorElement:<Errorpage/>,
    children:[
      {
        index:true,
        element:<LoginPage/>,
        id:"login",
        action:loginAction,
      },
      {
        path:"/dashboard",
        element:<Dashboard/>
      },
      {
        path:"/allEmployees/:page",
        element:<EmployeeList/>,
        loader:employeeListLoader,
        action:deleteAction
      },
      {
        path:"/addEmployee",
        element:<EmployeeForm method="POST" />,
        action:employeeAction
      },
      {
        path:"/updateEmployee/:id",
        element:<EmployeeForm method="PATCH" update={true}/>,
        action:employeeAction,
        loader:employeeLoader
      }
    ]
  }
])


function App() {

  return (
    <RouterProvider router={router}/>
  )
}

export default App
