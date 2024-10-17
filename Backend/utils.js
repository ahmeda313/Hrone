const fs = require("fs")


function saveImage(formData){
    const base64Image = formData.image.split(",")[1]
    const extention = formData.image.split(',')[0].split(';')[0].split('/')[1]
    const filename = `${formData.userName.replaceAll(" ","")}-${formData.id}.${extention}`

    const stream = fs.createWriteStream(`public/images/${filename}`)
    const bufferImage = Buffer.from(base64Image,"base64")

    stream.write(bufferImage, (error)=>{
        if(error){
            throw new Error("failed to save file")
        }
    })

    const image =  `/images/${filename}`

    return image
}

function deleteImage(id){

    fs.readdir("./public/images",(err, files)=>{
        const [fileName] = files.filter(i=>i.includes(id))


        fs.unlink("./public/images/"+fileName,(err)=>{
            console.log(err)
        })
        
    })

}


module.exports = {
    saveImage,
    deleteImage
}