const mongoose=require("mongoose");
const Schema=mongoose.Schema;

let PairSchema=new Schema({
    startTime:{
        type:String
    },
    endTime:{
        type:String
    }
});

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
        type: [PairSchema],
        required:false
    }
});

 DataSchema = mongoose.model("dataschema", DataSchema);
 PairSchema = mongoose.model("pairschema",PairSchema);
 module.exports={DataSchema,PairSchema}

