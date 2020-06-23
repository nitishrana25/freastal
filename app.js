const express=require("express");
const ejs=require("ejs");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");

const app=express();

mongoose.connect("mongodb://localhost:27017/studentDB",{useNewUrlParser:true, useUnifiedTopology:true});

const studentSchema=new mongoose.Schema({
  name :String,
  age :String,
  std :String
});

const Student=mongoose.model("Student",studentSchema);

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

//get post delete for all

app.route("/")
.get(function(req,res){
  Student.find(function(err,foundStudents){
    if(!err){
      res.send(foundStudents);
    }else {
      res.send(err);
    }
  });
})

.post(function(req,res){
  const newStudent= new Student({
    name:req.body.name,
    age:req.body.age,
    std:req.body.std
  });

  newStudent.save(function(err){
    if(!err){
      res.send("successfully added");
    }else{
      res.send(err);
    }
  });
})

.delete(function(req,res){
  Student.deleteMany(function(err){
    if(!err){
      res.send("successfully deleted");
    }else{
      res.send(err);
    }
  });
});


//get delete for specific student

app.route("/:studentName")
.get(function(req,res){
  Student.findOne({name:req.body.studentName},function(err,foundStudent){
    if(!err){
      res.send(foundStudent);
    }else{
      res.send(err);
    }
  });
})

.delete(function(req,res){
  Student.deleteOne({name:req.body.studentName},function(err){
    if(!err){
      res.send("successfully deleted specific student");
    }else{
      res.send(err);
    }
  });
});


app.listen(3000,function(){
  console.log("successfully connected");
});
