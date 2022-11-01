const mongoose = require("mongoose")

const vaccineSchema = new mongoose.Schema({
    vaccineDate : {
        Date:{type:Number,require:true,unique:true},
        Month:{type:String,require:true},
        Year:{type:Number,require:true},
    },
    availableBookingSlot:{
        "10:00AM":{type:Number,default:10}, "10:30AM":{type:Number,default:10},
        "11:00AM":{type:Number,default:10}, "11:30AM":{type:Number,default:10},
        "12:00PM":{type:Number,default:10}, "12:30PM":{type:Number,default:10},
        "1:00PM":{type:Number,default:10}, "1:30PM":{type:Number,default:10},
        "2:00PM":{type:Number,default:10}, "2:30PM":{type:Number,default:10},
        "3:00PM":{type:Number,default:10}, "3:30PM":{type:Number,default:10},
        "4:00PM":{type:Number,default:10}, "4:30PM":{type:Number,default:10},
        "5:00PM":{type:Number,default:10}
    },

})
   

module.exports = mongoose.model("vaccineSchema",vaccineSchema)