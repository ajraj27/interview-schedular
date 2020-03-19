require("dotenv").config()
const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const path = require("path")

const DataSchema=require("./Models/DataSchema").DataSchema;
const PairSchema=require("./Models/DataSchema").PairSchema;

const app=express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client","public")))

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/InterviewApp", { useNewUrlParser: true })
.then(() => console.log("MongoDB successfully connected"))
.catch(err => console.log(err));

const testData=[
    {
        name:"Anuj",
        email:"abc@example.com",
    },
    {
        name:"abhishek",
        email:"efg@example.com",
    },
    {
        name:"aditya",
        email:"ijk@example.com"
    }
]

const pushTestDataToDatabase=() => {

    DataSchema.remove({}).then(err => {
        if(err) console.log(err);
    })
    
    testData.forEach((data) => {
    
        const newData = new DataSchema(data);
    
        newData.save()
        .then(ans => res.send(ans))
        .catch(err => console.log(err));
    
    })
}

pushTestDataToDatabase();
    
app.post("/saveData",async (req,res) => {
    const doc = await DataSchema.findOne({email:req.body.email});
    console.log(doc);
    
    flag = 1;
    doc.interviewTime.forEach((interval) => {
        if(req.body.endTime<interval.startTime || req.body.startTime>interval.endTime) return;
        else{
            flag=0;
        }
    })
        

    let updated;

    if(flag===0){
        throw new Error("Cant schedule as it will overlap");
    } 
    else{
        const interval= new PairSchema({
            startTime:req.body.startTime,
            endTime:req.body.endTime
        })

        updated = DataSchema.update(
            { email: req.body.email }, 
            { $push: { interviewTime: interval } },
            {upsert:true}
        );
  
    }

});

app.get("/getParticipants",async (req,res) => {
    const doc = await DataSchema.find({});
    if(doc.length<3){
        throw new Error("No. of participants less than 2");
    }

    res.send(doc);
})


app.listen(process.env.PORT || 5000,() => {
    console.log("App started.");
})

