const TableState=()=>{
    const showData=JSON.parse(localStorage.getItem("showData"));
    if(showData==null)return;
    return (
        <div className="mx-10 my-3 border-green-500 border-2 overflow-x-auto">
            <table className="m-auto w-full  border-collapse">
                <thead className="m-auto"> 
                     <tr className="text-white text-lg font-light">
                        <th className="p-3 rounded-2xl border-green-400 border-2">Serial No.</th>
                        <th className="p-3 rounded-2xl border-green-400 border-2">Filed Value</th>
                        <th className="p-3 rounded-2xl border-green-400 border-2">Options</th>
                    </tr>
                </thead>
                <tbody className="m-auto ">
                {
                    showData.map((c,i)=>{
                        const keys=Object.keys(c);
                        if(keys.length==0)return;
                        return (
                            <tr key={i} className=" even:bg-gray-700 odd:bg-gray-800 text-white text-base">
                                <td className="p-3 text-center border-2">{i+1}</td>
                                <td className="p-3 text-center border-2">{c[keys[0]]}</td>
                                <td className="p-3 text-center border-2">{c[keys[1]]}</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </div>

       )
}
export default TableState;