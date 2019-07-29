var bodyParser  = require("body-Parser"),
mongoose        = require("mongoose"),
express         = require("express"),
app             = express();

//app config
mongoose.connect("mongodb://localhost:27017/ROU_app", {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

//mongoose/moodel config
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});
 var Blog = mongoose.model("Blog", blogSchema);
 
 //Restful Routes

 app.get("/", function(req, res){
   res.redirect("/blogs");
   });
//INDEX
app.get("/blogs", function(req, res){
   Blog.find({}, function(err, blogs){
       if(err){
           console.log("wrong");
       } else{
           res.render("index", {blogs: blogs});
          }  
       });
     });

     //new
     app.get("/blogs/new", function(req,res){
        res.render("new");
     });

      //Create route
    app.post("/blogs", function(req, res){
      //create blog
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("new");
        } else {
            //redirect to index
            res.redirect("/blogs");
        }
    });
  });

  // Show blog
app.get("/blogs/:id", function(req, res){
   Blog.findById(req.params.id, function(err, foundBlog){
       if(err){
           res.redirect("/blogs");
       } else {
           res.render("show", {blog: foundBlog});
       }
   });
   });







 app.listen(3000, function(){
    console.log("HI, The server has started");
});