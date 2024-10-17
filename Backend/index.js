
const express = require("express") 
const cors = require("cors")
const {loginValidation, employeeDetailsValidation, updateDetailsValidation} = require("./validation")
const {loginCheck, getAllEmployees, deleteEmployee, getEmployee, createNewEmployee, updateEmployee, getEmployeesCount, searchEmployee} = require("./db")
const {saveImage, deleteImage} = require("./utils")
const jwt = require("jsonwebtoken")
require('dotenv').config();

const JWT_SECRET = process.env.SECRET


const app = express()

app.use(cors({
    origin: 'http://localhost:5173',  // Frontend URL
    credentials: true  // Allow cookies to be sent
}))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }));


app.use(express.static('public'))


function authMiddleware(req,res,next){
    const token = req.headers?.cookie?.split("=")[1]

    if(token){
        try{
            const result = jwt.verify(token,JWT_SECRET)
            next()
        }catch(e){
            res.status(403).json({message:"authentication failed please login again"})
        }
    }else{
        res.status(403).json({message:"authentication failed please login again"})
    }
}


app.get("/employeeList",authMiddleware,async(req, res)=>{
    // items per page 2
    const page = (req.query.page-1)*2
    const result = await getAllEmployees(page)
    const totalEmployees = await getEmployeesCount()

    res.send({result,count:totalEmployees.count})
})


app.post("/login",async(req,res)=>{

    const formData = req.body
    const errors = loginValidation(formData)
 
    if(errors.name || errors.password){
      return res.send({errors})
    }

    const result = await loginCheck(formData)

    if(result.userExists && result.isAuthenticated){

        const token = jwt.sign(formData.name, JWT_SECRET)


        res.cookie("token", token,{
            httpOnly: true,  // Prevents client-side JavaScript from accessing the cookie
            // secure: true,    // Use this only with HTTPS
            sameSite: "strict", // Helps mitigate CSRF attacks

        })

        return res.send({success:true, name:formData.name})
    }
    if(result.userExists){
        res.send({message:"Invalid credentials"})
    }else{
        res.send({message:"user does not exists"})
    }
})

app.post('/logout', (req, res) => {

    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.cookie('token', '', {
        httpOnly: true,   // Same as how it was set originally
        sameSite: 'strict', // Same setting as when the cookie was created
        expires: new Date(0)  // Setting an expired date (epoch)
      });


    res.status(200).send('Logged out successfully');
  });



app.delete("/deleteEmployee/:id",authMiddleware,async(req,res)=>{
    const id = req.params.id
    
    const result = await deleteEmployee(id)
    
    deleteImage(id)    
    res.send({success:true})
})


app.post("/createEmployee",authMiddleware,async(req, res)=>{
    const formData = req.body

    const errors = employeeDetailsValidation(formData)


    if(errors.length>0){
        res.send({errors})
    }else{
        formData.id = (Math.random()*10000000).toFixed()

        formData.image = saveImage(formData)

        formData.course = formData.course.join()

        const result = await createNewEmployee(formData)
        
        res.send({success:true})
    }
})

app.get("/getEmployee/:id",authMiddleware,async(req,res)=>{
    const id = req.params.id

    const result = await getEmployee(id)

    if(result.length>0){
       res.send(result[0]) 
    }else{
        res.send({error:"not found"})
    }
})

app.patch("/updateEmployee/:id",authMiddleware,async(req,res)=>{
    const id = req.params.id

    const formData = req.body

    const errors = updateDetailsValidation(formData)


    if(errors.length>0){
        res.send({errors})
    }else{
        if(formData.image){
            formData.id = id
            formData.image = saveImage(formData)
        }else{
            const employee = await getEmployee(id)
        
            formData.image = employee[0].image
        }
        formData.course = formData.course.join()
        
        const result = await updateEmployee(formData, id)

        res.send({success:true})
    }

})


app.get("/search",authMiddleware,async(req,res)=>{
    const empName = req.query.v
    
    const searchRes = await searchEmployee(empName)

    res.send(searchRes)
})


app.listen(3000,()=>{
    console.log("listening at port 3000")
})