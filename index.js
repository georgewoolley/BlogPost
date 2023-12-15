import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3010;
var postName = "";
var postDescription = ""; 
const postData = []; 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get("/", (req, res) => {

  const data = {
    title: 'Create a blog post',
    message: 'Hello, World!',
    
  };

   res.render("index.ejs", data);
});

app.get("/blogs", (req, res) => {

    const data = {
        blogs: postData, 
      };
  
     res.render("blogs.ejs", data);
  });




app.post("/submit", (req, res) => {
  console.log(req.body.pName);
  console.log(req.body.pDescription);
    postName = req.body.pName;
    postDescription = req.body.pDescription;

  const data = {
    title: 'Enter your name...',
    message: 'Hello, World!',
    
  };
  
  postData.push({ title: postName, description: postDescription });
  console.log("The array is " + postData);


 // let title = '';  // Declare 'title' using 'let'

 // if (firstName != "" && lastName != "") {
 //   let totalChars = firstName.length + lastName.length;
  //  title = "The total number of chars is: " + totalChars; 
 // }

  // Pass 'title' to the template
 // data.title = title;


   res.render("index.ejs", data);


});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
