const nodemailer=require("nodemailer");

const sendMail=(email,startTime,endTime) => {
    const smtpTransport = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
            user: "",
            pass: ""
        }
    });
    
    var mailOptions={
        to : email,
        subject : "interview schedule",
        text : "Interview has been scheduled from "+startTime+" to "+endTime
     }

     console.log(mailOptions);

     smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
             res.end("error");
        }else{
            console.log("Message sent: " + response.message);
            res.end("sent");
        }
     });
}

module.exports={sendMail};

