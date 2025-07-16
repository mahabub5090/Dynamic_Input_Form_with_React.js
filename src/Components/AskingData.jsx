  import { useState } from "react";
  import { toast, ToastContainer } from "react-toastify";

  function AskingData({setRender,addInputField}){
      const [name,setName]=useState('');
      const [options,setoptions]=useState('');
      const [clicked,setClicked]=useState(0);

      const handleAddClick=()=>{
        if(name.trim().length==0 || options.trim().length==0){
          alert("Please give the field name and it's options. Then try again.")
          return;
        }        
        addInputField({name,options});
        toast.success("Your input field was added successfully! ☺️");
        setTimeout(()=>{setRender(0)},3000);
        setClicked(1);
      }
      
      return ( 
      <section className="bg-gray-700 mx-10 my-3 rounded-2xl">
            {clicked==0?<div className="grid grid-cols-1 gap-5 p-3 ">
            <input onChange={(e)=>setName(e.target.value)} type="text" name="" id="" className="bg-black text-white  text-2xl rounded-2xl p-3" placeholder="New Input Field Name"/>
            <input onChange={(e)=>setoptions(e.target.value)} type="text" name="" id="" className="bg-black text-white text-2xl rounded-2xl p-3 " placeholder="Options [Seperate Using ,(Coma)]"/>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={()=>setRender(0)} className="bg-gray-500 text-black text-2xl rounded-2xl p-3">Cancel</button>
             <button onClick={handleAddClick} className="bg-white text-black text-2xl rounded-2xl p-3">+ Add</button>
            </div>
            </div>:<p></p>
            }
            <ToastContainer>
            </ToastContainer>
        </section>
      );
  }
  export default AskingData;