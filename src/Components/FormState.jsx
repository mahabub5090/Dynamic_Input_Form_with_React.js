const FormState=()=>{
    const showData=JSON.parse(localStorage.getItem("showData"));
    if(showData==null)return;
    return (<>
    {
        <section className="grid mx-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {
            showData.map((c,i)=>{
            const keys=Object.keys(c);
            if(keys.length==0)return;
            return (
                <div key={i} className="border-l-3 border-green-700 m-auto p-3">
                    <header className="flex justify-center text-white text-2xl">State No : {i+1}</header>
                    <div className="">
                        <div className="flex my-2">
                        <h3 className="h-3 capitalize text-white ">{keys[0]}<span className="invisible">......</span>:<span className="invisible">.....</span></h3>
                        <h3 className="h-3 text-white ">{c[keys[0]]}</h3>
                    </div>
                    <div className="flex my-2">
                        <h3 className="h-3 text-white ">Options<span className="invisible">.....</span>:<span className="invisible">.....</span></h3>
                        <h3 className="h-3 capitalize text-white ">{c[keys[1]]}</h3>
                    </div>
                    </div>
                </div>

            )})
        }
        </section>
    }
    </>)
}
export default FormState;