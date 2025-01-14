import mongoose from "mongoose";
import nodemailer from 'nodemailer'
import dotenv from "dotenv";
dotenv.config();

import mongooseSerial from "mongoose-serial";

const TeamParticipentSchema = new mongoose.Schema({
    teamNo:{
        type:String,
    },
    eventName: {
        type: String,
        required: true
    },
    teamName:{
        type:String,
        required:true,
    },
    mem1_Name: {
        type: String,
        required: true
    },
    mem1_Contact: {
        type: Number,
        required: true,
        unique: true
    },
    mem1_email: {
        type: String,
        required: true,
        lowercase:true,
    },
    mem1_college: {
        type: String
    },
    mem2_Name: {
        type: String,
        required:true
    },
    mem2_Contact: {
        type: Number,
        required:true,
        unique: true
    },
    mem2_email: {
        type: String,
        required:true,
        lowercase:true,
    },
    mem2_college: {
        type: String

    },
    mem3_Name: {
        type: String,
    },
    mem3_Contact: {
        type: Number, 
    },
    mem3_email: {
        type: String,
        lowercase:true,
    },
    mem3_college: {
        type: String,
    }
})

TeamParticipentSchema.plugin(mongooseSerial, { field:"teamNo",digits:3});



let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    pool:true,
    // maxConnections:100, // true for 465, false for other ports
    auth: {
      user: 'techyon2022@gmail.com', // generated ethereal user
      pass: 'neawvayddesktqzs', // generated ethereal password
    },
  });




TeamParticipentSchema.methods.sendmail = async function () {

    let info = await transporter.sendMail({
        from: 'techyon2022@gmail.com', // sender address
        to: this.mem1_email, // list of receivers
        subject: "TECHYON 2022", // Subject line
        text:  `Thanks for registering ${this.eventName} Techyon 2022 `, // plain text body
        // html body
      });
    
      console.log("Message sent: %s", info.messageId);
     

      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
   
      // Preview only available when sending through an Ethereal account
     




}



export const Ideate = mongoose.model('Ideate', TeamParticipentSchema)
export const CodeCrunch=mongoose.model('CodeCrunch',TeamParticipentSchema)



