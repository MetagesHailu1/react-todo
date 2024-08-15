import React , {useState , useEffect} from 'react';
import List from "./components/List";
import Alerts from "./components/Alerts";
import './App.css';

const getLocalStorage =()=>{

   let list=localStorage.getItem("list");
   if(list){
    return(list=JSON.parse(localStorage.getItem("list")))
   }else{
    return [];
    
   }
};// d/c onSubmit & onClick


const App = () => {
  const [name,setName] = useState("");   //  name: represents the value of the input field for adding/editing items.  
  const [list,setList] = useState(getLocalStorage());//list: represents the list of items.
  const [isEditing,setIsEditing] = useState(false);//isEditing: represents whether the user is in editing mode or not.
  const [editId,setEditId] = useState(null);//editId: represents the ID of the item being edited.
  const [alert,setAlert] = useState({ show:false, type:"" , msg:"" });//alert: represents the alert message to be displayed.

  useEffect(()=>{
    localStorage.setItem("list", JSON.stringify(list) );
  },[list]);


const handleSubmit =(e)=>{
  e.preventDefault();
  if(!name){
    showAlert(true , "danger","please Enter value");
  }else if(name && isEditing){
    setList(
      list.map((item)=>{
        if(item.id === editId){         //  xxxxxxx
          return{...item , title:name};
        }
        return item;
      })
    );
    setName("");
    setEditId(null);
    setIsEditing(false);
    showAlert(true , "success", "Value Updated");
  }else{
    showAlert(true , "success", "  New Item is Submited ");
    const newItem={id:new Date().getTime().toString(),title:name};     //xxxxxxxxxxxxxx
    setList([...list,newItem]);
    setName("");
  }
};


const showAlert =(show=false , type="" , msg="")=>{
  setAlert({show ,type , msg});
};
const removeItem =(id)=>{          //remove an item from the list based on its ID.
  showAlert(true , "danger" , "Item Removed");
  setList(list.filter((item)=> item.id !==id));//list.filter
};

const editItem =(id)=>{
  const editItem=list.find((item)=>item.id===id);//list.find
  setIsEditing(true);
  setEditId(id);
  setName(editItem.title);
};

const clearList =()=>{
  showAlert(true ,"danger","Empty List");
  setList([]);
  // localStorage.removeItem('list');0
  // localStorage.clear();
};

                                                                //???what's <Alert> ,  what's <list>   below

  return (
     <section className='section-center'>
      
      <div className='big-board'>
    <form onSubmit={handleSubmit}>
    {alert.show && <Alerts{...alert} removeAlert={showAlert} list={list}/>} 
           <h1 style={{marginBottom:"1.5rem" ,fontfamily: "Impact, Haettenschweiler, 'Arial Narrow Bold sanserif" ,textAlign:"center" }}>
           what's the plan for this week?
           </h1>
           <div className='mb-3 form'>
            <input type='text'
                   className='form-control'
                   placeholder='you can write here'
                   onChange={(e)=>setName(e.target.value)}                  //xxxxx
                   value={name}
            />
            
             <button type='submit' className='btn btn-success'>
                {isEditing ? "Edit":"Submit"}                    
             </button>

           </div>
    </form>
      {list.length > 0 && (
            <div className='baba' style={{marginTop :"2rem"}}>
                    <List items={list} removeItem={removeItem} editItem={editItem}/>   
                    <div className='text-center'>
                      <button className='btn btn-warning' onClick={clearList}>
                           Clear Items
                      </button>

                    </div>
            </div>
      )}
      </div>
   </section>
   
  
  );
// In the above code, "rendering" refers to the process of generating and displaying... 
// ...the HTML elements on the web page based on the provided data and logic.
};

export default App;

