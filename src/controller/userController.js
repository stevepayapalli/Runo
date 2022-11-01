const userModel = require("../model/userModel");
// const EmailValidator=require('email-validator');
const jwt = require("jsonwebtoken")
//const bcrypt = require('bcrypt')
 const Validator = require("../validation/validation");
const vaccineModel = require("../model/vaccineModel");



  
  const registerUser= async function (req, res) {
     try {
      let data= req.body
      const {Name,PhoneNumber,Age,Pincode,AadharNo,Password}= data

      if (!Validator.isValidRequestBody(data)) {
          return res.status(400).send({status: false, msg: "please provide some data"})
      }
      if (!Name) {
        return res.status(400).send({status: false, msg: "please provide Name field."})
      }

      if(!Validator.isValid(Name)) {
        return res.status(400).send({status: false, msg: "please provide valid Name."})
    }

    if (!PhoneNumber) {
        return res.status(400).send({status: false, msg: "please provide PhoneNumber."})
    }

    if(!PhoneNumber) {
        return res.status(400).send({status: false, msg: "please provide phone number"})
    }
    if (!/^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/.test(PhoneNumber)) {
        return  res.status(400).send({ status: false, msg: "It's not a valid mobile number" })
    }

    const uniquePhone= await userModel.findOne({PhoneNumber:PhoneNumber})
    if (uniquePhone) {
        return res.status(400).send({ status: false, msg: "Phone no. is already registered" })
    }

    if(!Age) {
        return res.status(400).send({status: false, msg: "please provide Age Details"})
    }

    if(!/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(Age)){
        return res.status(400).send({status: false, msg: "please provide valid Age"})
    }

    if (!Password) {
        return res.status(400).send({ status: false, msg: "Please provide password" })
    }

    if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/.test(Password)) {
        return res.status(400).send({ status: false, msg: "please provide valid password" })
    }

    if(!Pincode) {
        return res.status(400).send({ status: false, msg: "please Pincode" })
    }
    if (!/^[1-9][0-9]{5}$/.test(Pincode)) {
        return res.status(400).send({ status: false, msg: "please provide a 6 digit Pincode" })
    }

    if (!AadharNo) {
        return res.status(400).send({status: false, msg: "please provide AadharNo in field."})
      }
      if (!/(^[0-9]{4}[0-9]{4}[0-9]{4}$)|(^[0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|(^[0-9]{4}-[0-9]{4}-[0-9]{4}$)/.test(AadharNo)) {
        return res.status(400).send({ status: false, msg: "please provide a Valid Aadhar Details" })
    }



    let saveData= await userModel.create(data)
    res.status(201).send({status:true, msg:"successfully created", data:saveData }) 
} catch(err) {
    console.log(err)
    res.status(500).send({status:false, msg: err.message})
}

}

const loginUser = async function (req, res) {
    try {
      let data = req.body;
      if(!Validator.isValidRequestBody(data)) return res.status(400).send({ status: false, message: "Phone Number and Password is required to login" });
  
      const { PhoneNumber, Password } = data;
  
      //checking for email-id
      if (!PhoneNumber) return res.status(400).send({ status: false, message: "Phone Number is required" });
  
      //checking for password
      if (!Password) return res.status(400).send({ status: false, message: "User Password is required" });
      
      // finding the user
      let user = await userModel.findOne({ PhoneNumber })
      if (!user) return res.status(404).send({ status: false, message: "User does not exist" })
      
      // password checking
      if (user.Password != Password) {
        return res.status(400).send({status: false, msg: "password is not correct"})
    }
  
      // Token Generation
      let token = jwt.sign(
        {
         userId: user._id,
        PhoneNumber: user._PhoneNumber
        
        }, "runoAssignment", { expiresIn: "5hrs" }
        
        );
        res.status(200).setHeader("x-api-key", token);
        return res.status(201).send({ status: "loggedin", token: token });
    }catch (err) {
      res.status(500).send({ status: false, error: err.message })
    }
  }

  const getVaccineDetails = async function(req,res){

    let body = req.body;
    if (!Validator.isValidRequestBody(body)) return res.status(400).send({ status: false, msg: "Please Provide Data" })
    const {  vaccineDate } = body

    if (!Validator.isValidString(vaccineDate.Date)) {
        return res.status(400).send({ status: false, msg: "Vaccine Date field cannot be empty" })
    }
    if (!Validator.isValidString(vaccineDate.Month)) {
        return res.status(400).send({ status: false, msg: "Vaccine Date field cannot be empty" })
    }
    if (!Validator.isValidString(vaccineDate.Year)) {
        return res.status(400).send({ status: false, msg: "Vaccine Date field cannot be empty" })
    }
    const bookingslot = await vaccineModel.find(body).select({availableBookingSlot:1});

        if (!Validator.isValid(bookingslot)) {
            return res.status(404).send({ status: false, message: "No vaccine date found" });
        }
        res.status(200).send({ status: true, message: "Available vaccine list", data: bookingslot });

  }

  const userRegisterVaccine = async function(req,res){
    let availableBookingSlot=req.availableBookingSlot
    let MobilePhone=req.MobilePhone
    let body=req.body
    const {time,date } = body
    let availableTime = await vaccineModel.findOne({availableBookingSlot:availableBookingSlot})
    if(time!=availableTime){
        return res.status(400).send({ status: false, msg: "Please Select a time slot between 10AM to 5PM" })
        
    }
    const userData = await userModel.findOne({MobilePhone:MobilePhone})
    if (userData.firstDose === true && userData.secondDose === true) {
        return res.status(400).send({ status: false, message: `already vaccinated` })
    }
  }
  
module.exports.registerUser=registerUser;
module.exports.loginUser=loginUser;
module.exports.getVaccineDetails=getVaccineDetails;
module.exports.userRegisterVaccine=userRegisterVaccine;