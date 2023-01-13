const Note = require("../models/note")

const getAllNotes= async(req,res)=>{
    
    const notes = await Note.find();

    res.json(notes)
}

const addNewNote =async (req,res)=>{
    // get the data from requested body
    const title = req.body.title;
    const body =  req.body.body;

    const newNote =  new Note({
        title,
        body
    })

    const NOTE=await newNote.save();

    res.json({status:"fetched",note:NOTE})
}

const getSingleNote= async (req,res)=>{
    const ID = req.params.id;

    const singleNote =  await Note.findById(ID);

    res.json({status:"ftetched",note:singleNote})

}

const updateNote = async (req,res)=>{
    // get the id from the params
    const ID = req.params.id;
    
    const {title,body} = req.body;

    /*const title =  req.body.title;
    const body =  req.body.body;*/

    const updatedNote =  {
        title,
        body
    }
    // find and update the note
    await Note.findByIdAndUpdate(ID,updatedNote);

    // find the updated note 
    const fetchedNote =  await Note.findById(ID);

    res.json({status:"updates",note:fetchedNote})
}

const deleteNote= async (req,res)=>{
    // catch the ID
    const ID = req.params.id;
    deletedObj =  await Note.findById(ID);
    await Note.findByIdAndDelete(ID);

    res.json({status:"deleted",obj:deletedObj})
}

module .exports ={
    getAllNotes ,
    addNewNote ,
    getSingleNote ,
    updateNote ,
    deleteNote 
}
