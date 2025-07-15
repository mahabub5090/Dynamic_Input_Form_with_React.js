import { useState } from "react";
import AskingData from "./AskingData";
import Input from "./Input";
import FormState from "./FormState";
import TableState from "./TableState";

function FullForm() {
  const [inputOption,setInputOption]=useState([{name:"Name",options:"Male,Fimale,Not interested to share"}]);
  const [render,setRender]=useState(0);
  const [allData,setAllData]=useState([{}]);
  const [showData,setShowData]=useState([{}]);

  
  const addInputField=(data)=>{
    setInputOption([...inputOption,data]);
  }

  const updateAllData=(index,name,value)=>{
    if(name=="#option#"){
        if(index>=allData.length)setAllData([...allData,{name:"",options:value}]);
        else allData[index].options=value;        
    }
    else{
        if(index>=allData.length)setAllData([...allData,{name:value,options:""}]);
        else allData[index].name=value;
   }      
  }

  const deleteField=(index)=>{
    const options=[...inputOption];
    const data=[...allData];
    if(options.length==1){
      alert("You can't delete filed.\nCause total filed count is only 1.");
      return;
    };
    options.splice(index,1);
    data.splice(index,1);
    setInputOption(options);
    setAllData(data);
    ()=>show();
  }

  const show=()=>{
    setShowData([...allData]);
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

              {render?<AskingData setRender={setRender} inputOptions={addInputField}></AskingData>:<p></p>}
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
        <div className="min-h-20 mb-5">
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
