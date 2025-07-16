import { useEffect } from "react";

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
  }

  useEffect(() => {
  if (options.length==1) {
    setValues(index, "#option#", options[0]);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <>
      <section className="flex bg-gray-700 rounded-2xl m-5">
        <h1 className="p-3 content-center text-white text-2xl">{index+1}</h1>
        <div className="grid max-w-screen grid-cols-3 md:grid-cols-[1fr_1fr_0.3fr] p-3 gap-1.5 ">
          
        <input className="bg-black text-white text-2xl rounded-2xl p-3" onChange={(e)=>setValues(index,name,e.target.value)} type="text" id="" placeholder={name}/>
          
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
