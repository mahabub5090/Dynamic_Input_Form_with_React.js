import { useEffect, useState } from "react";
import AskingData from "./AskingData";
import Input from "./Input";
import FormState from "./FormState";
import TableState from "./TableState";

function FullForm() {
  const [inputOption,setInputOption]=useState([]);
  const [render,setRender]=useState();
  const [allData,setAllData]=useState([]);
  const [showData,setShowData]=useState([{}]);

  useEffect(()=>{
    const savedInputOption=JSON.parse(localStorage.getItem("inputOption"));
    const savedAllData=JSON.parse(localStorage.getItem("allData"));
    const isRender=JSON.parse(localStorage.getItem("render"));
    const savedShowData=JSON.parse(localStorage.getItem("showData"));

    if (savedInputOption)setInputOption(savedInputOption);
    else setInputOption([{name:"Name",options:"Male,Female,Not interested to share" }]);

    if(savedAllData)setAllData(savedAllData);
    else setAllData([{}]);

    if(isRender)setRender(1);
    else setRender(0);

    if(savedShowData)setShowData(savedAllData)
    else setShowData([{}]);

  },[]);

  
  // CREATE

  const addInputField=(data)=>{
    localStorage.removeItem("inputOption")
    localStorage.removeItem("allData");

    setInputOption([...inputOption,data]);
    setAllData([...allData,{[data.name]:"",Option:""}]);
    localStorage.setItem("inputOption",JSON.stringify(inputOption));
    localStorage.setItem("allData",JSON.stringify(allData));
  }

  // UPDATE

  const updateAllData=(index,name,value)=>{
    localStorage.removeItem("inputOption");
    localStorage.removeItem("allData");
    
    if(name=="#option#"){
        allData[index].options=value;        
    }
    else{
        const {Option}=allData[index];
        allData[index]={[name]:value,Option};
   }      

    localStorage.setItem("inputOption",JSON.stringify(inputOption));
    localStorage.setItem("allData",JSON.stringify(allData));

  }

  // DELETE 

  const deleteField=(index)=>{
    if(inputOption.length==1){
      alert("You can't delete filed.\nCause total filed count is only 1.");
      return;
    };
    
    const options=inputOption.filter((_,id)=>id!=index);
    const data=allData.filter((_,id)=>id!=index);
    
    localStorage.removeItem("inputOption");
    localStorage.removeItem("allData");
    setInputOption(options);
    setAllData(data);
    localStorage.setItem("inputOption",JSON.stringify(options));
    localStorage.setItem("allData",JSON.stringify(data));

    localStorage.removeItem("showData");
    setShowData([...data]);
    localStorage.setItem("showData",JSON.stringify(showData));
  }

  // READ

  const show=()=>{
    setShowData([...allData]);
    localStorage.setItem("showData",JSON.stringify(showData));
  }
  
  return (
    <>
      <header className="text-white text-5xl text-center p-7 font-extrabold">Dynamic Input Form:</header>
      <hr className="bg-green-700  w-full h-1" />
      <section className="">

        {/* Input Filed Start */}

        <div className="mb-5">
              {inputOption.map((c,i)=>{
                  return(
                    <Input updateAllData={updateAllData} data={c} index={i} deleteField={deleteField} key={i}></Input>
                  )
               })
              }

              {render?<AskingData setRender={setRender} addInputField={addInputField}></AskingData>:<p></p>}
              {/* button start  */}
              <div className="flex justify-between p-3 mx-10">
                <button onClick={()=>{addInputField;setRender(1);
                  if(render)alert("Please add a field first.\nOr if you has already added filed then please wait almost 3 seconds.");
                }} className="bg-white text-black text-2xl rounded-2xl p-3">+ Add Field</button>
                <button onClick={show} className="bg-green-400 text-black text-2xl rounded-2xl p-3">Submit</button>
              </div>
              {/* button end */}
        </div>

        {/* Input Field End */}

        <hr className="bg-green-700 w-full h-1"/>
 
        {/* Form State Start */}
        <div className="min-h-20 mb-5 ">
          <p className="flex justify-center my-3 text-white text-3xl font-bold">Form State:</p>
          <FormState showData={showData} key={1}></FormState>
          {
            Object.keys(showData[0]).length==0?<p className="flex justify-center text-white text-xl">From State is empty 😣.<br></br> Please add some data.</p>:<p></p>
            
          }          
        </div>
        {/* Form State End */}
        
        <hr className="bg-green-700 w-full h-1"/>

        {/* Form Table Start */}
        <div className="min-h-20 mb-5">
          <p className="flex justify-center my-3 text-white text-3xl font-bold">Form Data Table:</p>
          <TableState showData={showData} key={1}></TableState>
          {
            Object.keys(showData[0]).length==0?<p className="flex justify-center text-white text-xl">From Table is empty 😣.<br></br> Please add some data.</p>:<p></p>
          }  
        </div>
        {/* From Table End */}

      </section>
    </>
  )
}

export default FullForm;
