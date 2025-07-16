import { useEffect, useRef } from "react";

function Input({updateAllData,data,index,deleteField}) {
  const name=data.name;
  const optionString=data.options;
  const options=[];
  let string="";
  for(let i=0;i<optionString.length;i++){
    if(optionString[i]==',')options.push(string),string="";
    else string=string+optionString[i];
  }
  if(string.length>0)options.push(string);

  const setValues=(index,fieldName,value)=>{      
    updateAllData(index,fieldName,value);
    // console.log(value);
  }
  const allData=JSON.parse(localStorage.getItem("allData"));
  const inputRef=useRef(null);

  useEffect(() => {
    if (options.length==1) {
      setValues(index, "#option#", options[0]);
    } 
    if(allData!=null && allData[index] &&  allData[index].length!=0){
       const keys=Object.keys(allData[index]);  
       if(keys.length>0){
        const prevValue=allData[index][ keys[0]];
        if(keys[0] && prevValue){
          if(inputRef.current){
            // console.log(inputRef.current);
            inputRef.current.value=prevValue;
          }
        }
      }
    }    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

 
  return (
    <>
      <section className="flex bg-gray-700 rounded-2xl">
        <h1 className="p-3 content-center pr-0 text-white text-3xl">{index+1}</h1>
        <div className="grid grid-cols-3  p-3 gap-2">
        <input ref={inputRef} className="bg-black text-white text-2xl capitalize rounded-2xl p-3" onChange={(e)=>setValues(index,name,e.target.value)} type="text" id="" placeholder={name}/>

        <select className="bg-black text-white text-2xl rounded-2xl p-3" onChange={(e)=>setValues(index,"#option#",e.target.value)}>
            <option value="" disabled>Select a option please</option>
            {
              options.map((c,i)=>{
                return (
                  <option value={c} key={i}>{c}</option>
                )
              })
            }
          </select>
          
          <button onClick={()=>deleteField(index)} className="bg-red-700 text-white text-2xl rounded-2xl p-3">Delete</button>
        </div>
      </section>
    </>
  )
}

export default Input;
