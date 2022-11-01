const vaccineModel = require("../model/vaccineModel")
const Validator = require("../validation/validation")


const registervaccine= async function (req, res) {
    try {
     let data= req.body
     const {vaccineDate}= data

     if (!Validator.isValidRequestBody(data)) {
         return res.status(400).send({status: false, msg: "please provide some data"})
     }
     if (!vaccineDate) {
       return res.status(400).send({status: false, msg: "please provide Date Vaccine."})
     }
     if(!Validator.isValidRequestBody(vaccineDate)){
        return res.status(400).send({status: false, msg: "Vaccine Date field cannot be empty Provide Date Month Year"})
        
     }
     if (!vaccineDate.Date) {
        return res.status(400).send({status: false, msg: "please provide Date."})
      }
      if (!vaccineDate.Month) {
        return res.status(400).send({status: false, msg: "please provide Month."})
      }
      if (!vaccineDate.Year) {
        return res.status(400).send({status: false, msg: "please provide Year."})
      }

  
   let saveData= await vaccineModel.create(data)
   res.status(201).send({status:true, msg:"successfully created", data:saveData }) 
} catch(err) {
   console.log(err)
   res.status(500).send({status:false, msg: err.message})
}

}

module.exports.registervaccine=registervaccine