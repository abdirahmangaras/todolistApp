//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
// mongoose.connect('mongodb://127.0.0.1:27017/todolistDB', { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>(console.log("success"))).catch((e)=>(console.log(e.message)))

mongoose.connect('mongodb+srv://abdirahmangaras24:6VEH4seqt3DVfVJK@cluster0.a1o5kcg.mongodb.net/todoListDB', { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>(console.log("success"))).catch((e)=>(console.log(e.message)))

const itemSchema = {
  name: String
}

const Item = mongoose.model("Item", itemSchema);

const Item1 = new Item({
  name: "Welcome to your todolist!"
});
const Item2 = new Item({
  name: "Hit the + button to add a new item"
});
const Item3 = new Item({
  name: "<-- Hit this to delete an item"
});

const workItems = [];
const DefaultItems = [Item1, Item2, Item3];
//Item.insertMany(DefaultItems)
app.get("/", async function(req, res) {

  try {
    // Find all documents in the Fruit collection
    const items = await Item.find();

    res.render('list', { items });
  } catch (err) {
    console.error('Error retrieving fruits:', err);
    res.sendStatus(500);
  }


});

app.post("/", async function(req, res){
  const item = new Item({
    name: req.body.newItem
  });

  await item.save();

  // Redirect to the home page
  res.redirect('/');
});
app.post("/delete", async function(req, res){

const item = await Item.findByIdAndDelete(req.body.itemId);

// If the fruit is not found, return a 404 error
if (!item) {
  return res.sendStatus(404);
}

  res.redirect('/');
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(4000, function() {
  console.log("Server started on port 4000");
});
