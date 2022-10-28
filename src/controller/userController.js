const userModel = require("../model/userModel");
// const EmailValidator=require('email-validator');
const jwt = require("jsonwebtoken")
//const bcrypt = require('bcrypt')
 const Validator = require("../validation/validation")



  
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
  
module.exports.registerUser=registerUser;
module.exports.loginUser=loginUser;

