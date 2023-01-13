import { useEffect, useState } from "react";
import axios from 'axios';

function App() {
  // usestate for getAll the notes
  let [notes,setNotes] =  useState([]);

  // this state for create a form  ---- not for the crud operation
  let [createForm,setCreateForm] =  useState({
    title : '',
    body :''
  })

  // this satate for store thevalue of upating form
  let [updateForm,setUpdateForm] = useState({
    _id : null,
    title:'',
    body : ""
  }
  )

  useEffect(()=>{   // to get all the data when page is reloaded
    fetchAllNotes();
  }, [])

  // function to get all the notes   -- CRUD
  const fetchAllNotes = async() =>{
    const res= await axios.get("http://localhost:8070/note");
    setNotes(res.data);
  }


  //function to update created forms   --  not CRUD update
  const updateCreatedForm = (e)=>{
    const {name ,  value} =e.target;   //  get the name and the value of the form by using HTML event
    //update the state
    setCreateForm({
      ...createForm,                   // ... createForm means create duplicated of that object
      [name]: value,
    })
  }


  // function for create a note   ---  CRUD
  const createNewNote = async (e)=>{
    e.preventDefault();
    //create the note --  pass the inputs to the database
    const res = await axios.post("http://localhost:8070/note",createForm);    // createForm is the state variable that store in FORM state
    // update the state
    setNotes([...notes,res.data.note]);    // binding the last input data to the notes array is usestate
    //clear the form
    setCreateForm({title:'',body:''});
  }
   

// fucntiom for delete a note ---  CRUD
  const deleteNote = async (_Id)=>{
    // delete the specific note using the id
    const res = await axios.delete(`http://localhost:8070/note/${_Id}`);
    //update the state
    const newNotes = [...notes].filter((note)=>{
      return note._id !== _Id;
    })
    setNotes(newNotes);
  }

  //function that do update in updated form handle field changes
  const handleUpdates = (e)=>{
    const {name,value} =  e.target;

    setUpdateForm({
      ...updateForm,
      [name] : value,
    })
  }

  // function to take updated record in form
  const toggleUpdate = (note)=>{
    // set the state on updated form 
    setUpdateForm({title:note.title,body:note.body,_id:note._id});
  }

  // function to do update  ---- CRUD
  const updateNote = async(e)=>{
    e.preventDefault();

    const { title , body } = updateForm;

    // send the update reques
    const res = await axios.put(`http://localhost:8070/note/${updateForm._id}`,{title,body});
    //update state 
    const newNotes =  [...notes];
    // find the index that we are going to update
    const noteIndex = notes.findIndex((note)=>{
      return note._id === updateForm._id
    });
    newNotes[noteIndex] = res.data.note;

    setNotes(newNotes);

    // clear update form fields
    setUpdateForm(
      {
        title : '',
        body : "",
        _id : null
      }
    )

  }

  return ( 
    <div> 

      <div>
        <h2>ALL Notes</h2>
        {
          notes && notes.map((note)=>{
            
            return(
              <div key={note._id} >
                {note.title}
                <br/>
                <button onClick={()=>{deleteNote(note._id) }}>Delete</button>
                <br/>
                <button onClick={()=>{toggleUpdate(note)}}>Update</button>
              </div>
            )
          })
        }
      </div>
        <hr/>
      <div>
        <form onSubmit={createNewNote}>
          Enter the title :
          <input 
            type="text" 
            name="title"
            value={createForm.title}
            onChange={updateCreatedForm}
          /> <br/>
          Enter the details : 
          <textarea  
            name="body"
            value={createForm.body}
            onChange={updateCreatedForm}
          />
          <br/>
          <button type="submit">Submit</button>
        </form>
      </div>

      <hr/>
        {
          updateForm._id && <div>
          <h2>Updat Form</h2>
        <form onSubmit={updateNote}>
          Enter the title :
          <input 
            type="text" 
            name="title"
            value={updateForm.title}
            onChange={handleUpdates}
          /> <br/>
          Enter the details : 
          <textarea  
            name="body"
            value={updateForm.body}
            onChange={handleUpdates}
          />
          <br/>
          <button type="submit">Update</button>
        </form>
      </div>
      }
        

    </div>
  );
} 

export default App;
