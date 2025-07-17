  import {  useEffect, useRef, useState } from "react";
  import { toast, ToastContainer } from "react-toastify";

  function AskingData({setRender,addInputField}){
      const [clicked,setClicked]=useState(0);

      const handleAddClick=()=>{
        const name=localStorage.getItem("fieldName");
        const options=localStorage.getItem("fieldOption");

        if(name.trim().length==0 || options.trim().length==0){
          alert("Please give the field name and it's options. Then try again.")
          return;
        }        
        addInputField({name,options});
        localStorage.removeItem("fieldName");
        localStorage.removeItem("fieldOption");
        toast.success("Your input field was added successfully! ☺️");
        setTimeout(()=>{setRender(0)},2000);
        setClicked(1);
      }
      
      const updateFieldName=(value)=>{
        localStorage.removeItem("fieldName");
        localStorage.setItem("fieldName",value);
      }
      const updateFieldOption=(option)=>{
        localStorage.removeItem("fieldOption");
        localStorage.setItem("fieldOption",option);
      }
      const cancel=()=>{
        setRender(0);
        localStorage.removeItem("fieldName");
        localStorage.removeItem("fieldOption");
      }
      
      const refer=useRef();
      const refer2=useRef();

      useEffect(()=>{
        const name=localStorage.getItem("fieldName");
        const options=localStorage.getItem("fieldOption");
        if(name || options){
          refer.current.value=name;
          refer2.current.value=options;
        }
      },[]);

      return ( 
      <section className="bg-gray-700 mx-10 my-3 rounded-2xl">
            {clicked==0?<div className="grid grid-cols-1 gap-5 p-3 ">
            <input  ref={refer} onChange={(e)=>updateFieldName(e.target.value)} type="text" name="" id="" className="bg-black text-white  text-2xl rounded-2xl p-3" placeholder="New Input Field Name"/>
            <input ref={refer2} onChange={(e)=>updateFieldOption(e.target.value)} type="text" name="" id="" className="bg-black text-white text-2xl rounded-2xl p-3 " placeholder="Options [Seperate Using ,(Coma)]"/>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={cancel} className="bg-gray-500 text-black text-2xl rounded-2xl p-3">Cancel</button>
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