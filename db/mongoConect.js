const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://uri:1234@cluster0.v0gts8j.mongodb.net/idf77');
   console.log("toys work")
  // use `await mongoose.connect('mongodb://user:passwormongodb+srv://<username>:<password>@cluster0.v0gts8j.mongodb.net/testd@localhost:27017/test');` if your database has auth enabled
}