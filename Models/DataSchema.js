const mongoose=require("mongoose");
const Schema=mongoose.Schema;

let DataSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    interviewTime: {
        type: [[String]],
        default:null
    }
});

module.exports = DataSchema = mongoose.model("dataschema", DataSchema);
