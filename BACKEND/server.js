//Load env variables
require('dotenv').config();
// Load the  DB connction
const ConnectDB = require('./Config/ConnectDB')
//import dependencies
const express = require('express');
const Note = require('./models/note');
const cors =  require('cors');
//create an express app
const app =  express();
// config json for express App
app.use(express.json());
app.use(cors());
// connect to DB
ConnectDB();



// backend routing
// import the noteController
const noteCtrl =  require("./Controller/noteCtrl");
// CRUD ---  Read
app.get('/note',noteCtrl.getAllNotes)
// CRUD ----  create
app.post("/note",noteCtrl.addNewNote)
//CRCUD ----- Read one note
app.get("/note/:id",noteCtrl.getSingleNote)
//CRUD ----  update
app.put("/note/:id",noteCtrl.updateNote)
//CRUD ----  delete
app.delete("/note/:id",noteCtrl.deleteNote)

//serever  starting
app.listen(process.env.PORT,()=>{
    console.log(process.env.PORT+" PORT is up")
});   //  port number