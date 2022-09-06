//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mon = require("mongoose");
const { request } = require("express");
const date = require(__dirname + "/date.js");

const app = express();
mon.connect("mongodb://localhost:27017/ramifarqad", { useNewUrlParser: true });
const to_do = mon.Schema({ name: String });
const Todo = mon.model("Todo", to_do);
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
const item1 = Todo({ name: "welcom to do app" });
const item2 = Todo({ name: "click + to add item " });
const item3 = Todo({ name: " click the checkbox to delete an item" });

app.get("/", function (req, res) {
  Todo.find({}, function (err, dd) {
    const day = date.getDate();
    res.render("list", { listTitle: day, newListItems: dd });
  });
});

app.post("/", function (req, res) {
  const item = req.body.newItem;

  const ss = Todo({ name: item });
  ss.save();
  res.redirect("/");
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.get("/about", function (req, res) {
  res.render("about");
});
app.post("/delete", (req, res) => {
  const checkedbox = req.body.checkbox;
  Todo.findByIdAndDelete(checkedbox, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});
app.listen(3000, function () {
  console.log("Server started on port 3000");
});
