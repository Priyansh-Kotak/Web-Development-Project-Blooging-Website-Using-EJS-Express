//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent =
""
const aboutContent =
""
const contactContent =
"For any modification related suggestions please contact the developer 'Priyansh Kotak'  Phone no. 95121xxxxx, email id:priyanshxxxxx@gmail.com ";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

var arr = [];

app.get("/", (req, res) => {
  //Home page get function
  res.render("home", { startingcontent: homeStartingContent, post: arr });
});

app.get("/post/:topic", (req, res) => {
  let p = req.params.topic;
  console.log(p);

  p = _.lowerCase(p);

  // console.log(req.params.topic);
  arr.forEach((ele) => {
    let t = ele.title;
    let tl = _.lowerCase(t);
    if (p === tl) {
      res.render("post", { title: ele.title, content: ele.content });
      // console.log("Match found");
    }
  });
});

// app.post("/posts/:topic", (req, res) => {
//   let p = req.params.topic;
//   p=_.lowerCase(p);
//   arr.forEach((ele)=>{
//     let b= _.lowerCase(ele.title);
//     if(p===b)
//     {

//     }

//   })
// });

app.post("/", (req, res) => {
  res.write("<h1>arr.title</h1>");
  res.send();
});

app.get("/about", (req, res) => {
  // About page get function
  res.render("about", { aboucontect: aboutContent });
});

app.get("/contact", (req, res) => {
  res.render("contact", { concontent: contactContent });
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", (req, res) => {
  const post = {
    title: req.body.title,
    content: req.body.post,
  };

  arr.push(post);
  console.log(arr);
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
