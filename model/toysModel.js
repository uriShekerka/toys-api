const mongoose = require("mongoose");
const Joi = require("joi");

const ToysSchema = new mongoose.Schema({
    name: String,
    info: String,
    category: String,
    price: Number,
    img_url: String,
    user_id:String,
    date_create: { type: Date, default: Date.now() }
})

exports.ToysModel = mongoose.model("toys", ToysSchema)

exports.validteToys = (reqBody) => {
    let joiSchema = Joi.object({
      name:Joi.string().min(2).max(150).required(),
      info:Joi.string().min(2).max(500).required(),
      category:Joi.string().min(2).max(150).required(),
      price:Joi.number().min(1).max(9999).required(),
     img_url:Joi.string().min(2).max(500).allow(null,""),
     
    })
    return joiSchema.validate(reqBody);
  }




 