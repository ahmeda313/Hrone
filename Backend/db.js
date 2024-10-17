const {neon} = require("@neondatabase/serverless")
require('dotenv').config();

const sql = neon(process.env.DATABASE_URL)


async function getAllEmployees(startAt){
    const result = await sql("SELECT * FROM employees LIMIT 2 OFFSET $1",[startAt])
    return result
}

async function getEmployeesCount(){
    const result = await sql("SELECT COUNT(id) FROM employees;")
    return result[0]
}

async function getEmployee(id){
    const result = await sql("SELECT * FROM employees WHERE id = $1",[id])
    return result
}

async function loginCheck({name,password}){
    const result = await sql("SELECT * FROM Login WHERE username = $1",[name])

    const error = {}
    error.userExists = true

    if(result.length===0){
        error.userExists = false
        return error
    }

    error.isAuthenticated = result[0].password === password
    
    return error
}

async function deleteEmployee(id){
    const result = await sql("DELETE FROM employees WHERE id = $1",[id])
}

async function createNewEmployee(formData){
    const result = await sql("INSERT INTO employees VALUES($1,$2,$3,$4,$5,$6,$7,$8)",[formData.id, formData.image, formData.userName, formData.email, formData.mobileNum, formData.designation, formData.gender, formData.course])
}

async function updateEmployee(formData, id){
    const result = await sql("UPDATE employees SET image=$1, name=$2, email=$3, mobilenum=$4, designation=$5, gender=$6, course=$7 WHERE id = $8" ,[ formData.image, formData.userName, formData.email, formData.mobileNum, formData.designation, formData.gender, formData.course, id])
}

async function searchEmployee(empName){
    const result = await sql("SELECT * FROM employees WHERE name ILIKE $1 || '%' ",[empName]) 
    return result
}



module.exports = {
    getAllEmployees,
    loginCheck,
    deleteEmployee,
    getEmployee,
    createNewEmployee,
    updateEmployee,
    getEmployeesCount,
    searchEmployee
}
