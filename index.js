import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3027;
var postName = "";
var postDescription = ""; 
const postData = []; 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get("/", (req, res) => {

 

   res.render("index.ejs");
});

app.get("/blogs", (req, res) => {

    const data = {
        blogs: postData, 
      };
  
     res.render("blogs.ejs", data);
  });


// Update the edit route in your Express app
app.get("/edit/:blogId", (req, res) => {
    const blogId = req.params.blogId;
    const blogToEdit = postData.find(blog => blog.blogId == blogId);
  
    if (!blogToEdit) {
      // Handle the case where the blog post with the specified ID is not found
      return res.status(404).send("Blog post not found");
    }
  
    res.render("edit.ejs", { blog: blogToEdit });
  });

  app.get("/edit", (req, res) => {
    // Render edit page without a specific blogId (you can customize this based on your requirements)
    res.render("edit.ejs");
  });




app.post("/submit", (req, res) => {
  console.log(req.body.pName);
  console.log(req.body.pDescription);
    postName = req.body.pName;
    postDescription = req.body.pDescription;

    const currentDate = new Date();
    const formattedDateTime = currentDate.toLocaleString();
    const blogId = Math.floor(Math.random() * 1000);

  const data = {
    title: 'Enter your name...',
    message: 'Hello, World!',
    
  };
  
  postData.push({
    blogId: Math.floor(Math.random() * 1000),
    title: postName,
    description: postDescription,
    dateTime: formattedDateTime
  });
  
 // console.log("The array is " + postData);


 // let title = '';  // Declare 'title' using 'let'

 // if (firstName != "" && lastName != "") {
 //   let totalChars = firstName.length + lastName.length;
  //  title = "The total number of chars is: " + totalChars; 
 // }

  // Pass 'title' to the template
 // data.title = title;


   res.render("index.ejs", data);


});

app.post("/update", (req, res) => {
    const blogId = req.body.blogId;
    const updatedTitle = req.body.title;
    const updatedDescription = req.body.description;

    // Find the corresponding blog post using the blog ID
    const blogToUpdate = postData.find(blog => blog.blogId == blogId);

    if (!blogToUpdate) {
        return res.status(404).send("Blog post not found");
    }

    // Update the title and description
    blogToUpdate.title = updatedTitle;
    blogToUpdate.description = updatedDescription;

    // Redirect to the page displaying the updated blog post or another appropriate page
    res.redirect("/blogs");
});

app.post("/delete/:blogId", (req, res) => {
    const blogId = req.params.blogId;

    // Find the index of the corresponding blog post using the blog ID
    const blogIndex = postData.findIndex(blog => blog.blogId == blogId);

    if (blogIndex === -1) {
        return res.status(404).send("Blog post not found");
    }

    // Remove the blog post from the array
    postData.splice(blogIndex, 1);

    // Redirect to the blog listing page or another appropriate page
    res.redirect("/blogs");
});



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
