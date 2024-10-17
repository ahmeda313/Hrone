
function loginValidation(formData){
    const errors = {}
    if(formData.name.trim()===""){
        errors.name = "User name cannot be empty"
      } 
      if(formData.password.length<6){
        errors.password = "Password length is less than 6 "
      }
      if(formData.password.trim()===""){
        errors.password = "Password cannot be empty"
      }

      return errors
}


function employeeDetailsValidation(formData){
    const errors = []
    
    for (const [key, value] of Object.entries(formData)) {
      if(key==="email" && !value.includes("@") && !value.includes(".")){
        errors.push("email")
      }
      if(key!=="course" && value.trim()===""){
        errors.push(key)
      }
      if(key==="course" && !Array.isArray(value)){
        errors.push(key)
      }
    }

    return errors
}

function updateDetailsValidation(formData){
    const errors = []

    for (const [key, value] of Object.entries(formData)) {
        if(key==="email" && !value.includes("@") && !value.includes(".")){
          errors.push("email")
        }
        if(key!=="course"&&  key!=="image" && value.trim()===""){
          errors.push(key)
        }
        if(key==="course" && !Array.isArray(value)){
          errors.push(key)
        }
    }
    
    return errors
}

module.exports = {
    loginValidation,
    employeeDetailsValidation,
    updateDetailsValidation
}