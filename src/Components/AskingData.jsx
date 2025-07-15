  import { useState } from "react";
  import { toast, ToastContainer } from "react-toastify";

  function AskingData({setRender,inputOptions}){
      const [name,setName]=useState('');
      const [options,setoptions]=useState('');
      const [clicked,setClicked]=useState(0);

       
      const handleAddClick=()=>{
        if(name.trim().length==0 || options.trim().length==0){
          alert("Please give the field name and it's options. Then try again.")
          return;
        }
        inputOptions({name,options});
        toast.success("Your input field was added successfully! ☺️");
        setTimeout(()=>{setRender(0)},3000);
        setClicked(1);
      }
      
      return ( 
      <section className="bg-gray-700 mx-10 my-3 rounded-2xl">
            {clicked==0?<div className="flex justify-between p-3 gap-x-1.5">
            <input onChange={(e)=>setName(e.target.value)} type="text" name="" id="" className="bg-black text-white w-xs text-2xl rounded-2xl p-3" placeholder="New Input Field Name"/>
            <input onChange={(e)=>setoptions(e.target.value)} type="text" name="" id="" className="bg-black text-white w-xs text-xl rounded-2xl  p-3" placeholder="Options [Seperate Using ,(Coma)]"/>
            <button onClick={handleAddClick} className="bg-white text-black text-2xl rounded-2xl p-3">+ Add</button>
            </div>:<p></p>
            }
            <ToastContainer>
            </ToastContainer>
        </section>
      );
  }
  export default AskingData;