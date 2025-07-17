import { useEffect, useState } from "react";
import AskingData from "./AskingData";
import Input from "./Input";
import FormState from "./FormState";
import TableState from "./TableState";
import { toast, ToastContainer } from "react-toastify";

function FullForm() {
  const [inputOption,setInputOption]=useState([]);
  const [render,setRender]=useState();
  const [allData,setAllData]=useState([]);
  const [showData,setShowData]=useState([]);

  const submit=localStorage.getItem("submit");
  const firstTime=submit==null?1:0;
  
  const [emptyFieldIndexed,setEmptyFieldIndexes]=useState([]);

  useEffect(()=>{
    const savedInputOption=JSON.parse(localStorage.getItem("inputOption"))||[];
    const savedAllData=JSON.parse(localStorage.getItem("allData"))||[];
    const isRender=JSON.parse(localStorage.getItem("render"))||0;
    const savedShowData=JSON.parse(localStorage.getItem("showData"))||[];

    if (savedInputOption.length)setInputOption(savedInputOption);
    else setInputOption([{name:"Name",options:"Male,Female,Not interested to share" }]);

    if(savedAllData.length)setAllData(savedAllData);
    else setAllData([{}]);

    setRender(isRender);

    if(savedShowData.length)setShowData(savedAllData)
    else setShowData([{}]);

  },[]);

  
  // CREATE

  const addInputField=(data)=>{
    localStorage.removeItem("inputOption")
    localStorage.removeItem("allData");
    localStorage.removeItem("showData");

    const newInputOption=[...inputOption,data];
    const newAllData=[...allData,{[data.name]:"",options:""}];
    const newShowData=[...showData,{}];

    setInputOption(newInputOption);
    setAllData(newAllData);
    setShowData(newShowData);
    localStorage.setItem("inputOption",JSON.stringify(newInputOption));
    localStorage.setItem("allData",JSON.stringify(newAllData));
    localStorage.setItem("showData",JSON.stringify(newShowData));

  }

  // UPDATE

  const updateAllData=(index,name,value)=>{
    localStorage.removeItem("inputOption");
    localStorage.removeItem("allData");
    
    if(name=="#option#"){
        if(value)allData[index].options=value;        
    }
    else{
        const {options}=allData[index];
        allData[index]={[name]:value,options};
   }      
   
    setInputOption(inputOption);
    setAllData(allData);
    localStorage.setItem("inputOption",JSON.stringify(inputOption));
    localStorage.setItem("allData",JSON.stringify(allData));
  }

  // DELETE 

  const deleteField=(index)=>{
    if(inputOption.length==1){
      alert("You can't delete filed.\nCause total filed count is only 1.");
      return;
    };
     
    toast.success("Succesfully delete a filed.");
    console.log(name,'\n');

    const options=inputOption.filter((_,id)=>id!=index);
    const data=allData.filter((_,id)=>id!=index);
    const showState=showData.filter((_,id)=>id!=index);

    // console.log(options,data,showState);
    
    
    localStorage.removeItem("inputOption");
    localStorage.removeItem("allData");
    localStorage.removeItem("showData");
    setInputOption(options);
    setAllData(data);
    setShowData(showState);
    setEmptyFieldIndexes([]);
    localStorage.setItem("inputOption",JSON.stringify(options));
    localStorage.setItem("allData",JSON.stringify(data));
    localStorage.setItem("showData",JSON.stringify(showState));
  
  }

  // READ

  const show=()=>{
    const invalidIndexes=validityCheck(allData);
    if(invalidIndexes.length!=0){
      setEmptyFieldIndexes([...invalidIndexes]);   
     toast.error("Please fill all Input field first and then click on submit.");
     toast.warning("Please fill the filed box and the @ select option.");
      return;
    } 

    setEmptyFieldIndexes([]);
    localStorage.removeItem("showData");
    setShowData([...allData]);
    localStorage.setItem("showData",JSON.stringify([...allData]));

    localStorage.setItem("submit",0);
  };
  
  // validation

  const validityCheck=(allInputData)=>{
    let invalidIndexes=[];
    let cnt=0;
    for(const data of allInputData){
        const keys=Object.keys(data);
        
        const name=data[keys[0]]
        const options=data.options;

        if((name==null || name==undefined || (typeof name=="string" && name.trim().  length==0)) || (options==null || options==undefined || (typeof options=="string" && options.trim().length==0)))invalidIndexes.push(cnt);

        cnt++; 
    }
    return invalidIndexes;
  }

  // Logic end AND Render Start;;

  return (
    <main className="my-5 mx-10  md:my-10 md:mx-20 lg:my-15 lg:mx-30 content-center grid justify-center p-3 bg-black border-8 rounded-3xl border-green-700">
      <header className="text-white text-5xl text-center p-7 font-extrabold">Dynamic Input Form:</header>
      <hr className="bg-green-700 h-1 w-full mb-5" />
      <section className="">

        {/* Input Filed Start */}

        <div className="mb-5">
              {inputOption.map((c,i)=>{
                  return(
                    <Input updateAllData={updateAllData} data={c} index={i} deleteField={deleteField} shouldFocus={emptyFieldIndexed.includes(i)} key={i}></Input>
                  )
               })
              }
              {/*  */}
              <ToastContainer></ToastContainer>
              {/*  */}
              {render?<AskingData setRender={setRender} addInputField={addInputField}></AskingData>:<p></p>}
              {/* button start  */}
              <div className="flex justify-between p-3 mx-10">
                <button onClick={()=>{addInputField;setRender(1);
                  if(render)alert("Please add a field first.\nOr if you has already added filed then please wait almost 3 seconds.");
                }} className="bg-white text-black text-2xl rounded-2xl p-3">+ Add Field</button>
                <button onClick={()=>show()} className="bg-green-400 text-black text-2xl rounded-2xl p-3" disabled={render}>Submit</button>
              </div>
              {/* button end */}
        </div>

        {/* Input Field End */}

        <hr className="bg-green-700 h-1  w-full"/>
 
        {/* Form State Start */}
        <div className="min-h-20 mb-5 ">
          <p className="flex justify-center my-3 text-white text-3xl font-bold">Form State:</p>
          <FormState showData={showData}></FormState>
          {
            firstTime?<p className="flex justify-center text-white text-xl">From State is empty 😣.<br></br> Please add some data.</p>:<p></p>
            
          }          
        </div>
        {/* Form State End */}
        
        <hr className="bg-green-700 h-1 w-full "/>

        {/* Form Table Start */}
        <div className="min-h-20 mb-5">
          <p className="flex justify-center my-3 text-white text-3xl font-bold">Form Data Table:</p>
          <TableState showData={showData}></TableState>
          {
            firstTime?<p className="flex justify-center text-white text-xl">From Table is empty 😣.<br></br> Please add some data.</p>:<p></p>
          }  
        </div>
        {/* From Table End */}

      </section>
    </main>
  )
}

export default FullForm;
