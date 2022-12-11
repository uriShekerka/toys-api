
const express = require("express");
const { auth } = require("../middleweres/auth");
const { ToysModel, validteToys } = require("../model/toysModel");
const router = express.Router();

router.get("/", async (req, res) => {

  let perPage = Number(req.query.perPage) || 10;
  let page = Number(req.query.page) || 1
  let sort = req.query.sort || "_id";
  let reverse = req.query.reverse == "yes" ? 1 : -1;

  try {
    let data = await ToysModel
      .find({})
      .limit(perPage)
      .skip((page - 1) * perPage)
      .sort({ [sort]: reverse })
    res.json(data);
  }
  catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})




router.get("/category/:urlCode", async (req, res) => {
  try {
    let searchQ = req.query.s;
    let categoryExp = new RegExp(searchQ, "i")

    let data = await ToysModel.find({ category: categoryExp })
      .limit(20)
    res.json(data);

  }
  catch (err) {
    console.log(err);
    res.status(500).json(err)
  }
})

// /search?s=
router.get("/search", async (req, res) => {
  try {
    let queryS = req.query.s;
    let regQuery = new RegExp(queryS, "i");
    let data = await ToysModel
      .find({ $or: [{ name: regQuery }, { info: regQuery }] })
      .limit(20)
      .skip(0)
    res.json(data);
  }
  catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})


router.post("/", auth, async (req, res) => {
  let validBody = validteToys(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    let toy = new ToysModel(req.body);
    // add prop of user_id
    toy.user_id = req.tokenData._id
    await toy.save();
    // 201 -> add new document
    res.status(201).json(ticket)
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

router.put("/:idEdit", auth, async (req, res) => {
  let validBody = validteToys(req.body);

  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    let idEdit = req.params.idEdit;
    let data = await ToysModel.updateOne({ _id: idEdit, user_id: req.tokenData._id }, req.body)
    res.json(data);
  }
  catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})


router.delete("/:idDel", auth, async (req, res) => {
  try {
    let idDel = req.params.idDel;
    let data = await ToysModel.deleteOne({ _id: idDel, user_id: req.tokenData._id })
    res.json(data);
  }
  catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})




module.exports = router;