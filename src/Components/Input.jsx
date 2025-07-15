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

  const setValues=(index,name,value)=>{      
    updateAllData(index,name,value);
  }

  useEffect(() => {
  if (options.length==1) {
    setValues(index, "#option#", options[0]);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <>
      <section className="flex bg-gray-700 mx-10 my-3 rounded-2xl">
        <h1 className="my-auto ms-5 text-white text-2xl ">{index+1}</h1>
        <div className="flex justify-between p-3 gap-x-1.5">
          <input  onChange={(e)=>setValues(index,name,e.target.value)} type="text" id="" className="bg-black text-white w-xs text-2xl rounded-2xl p-3" placeholder={name}/>
          <select onChange={(e)=>setValues(index,"#option#",e.target.value)}className="bg-black text-white w-xs text-2xl rounded-2xl p-3">
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
