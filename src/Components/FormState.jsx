const FormState=({showData})=>{

    return (<>
    {
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {
            showData.map((c,i)=>{
            const entries=Object.entries(c);
            if(entries.length==0)return;
            return (
                <div key={i} className="border-l-3 border-green-700 m-auto p-3">
                    <header className="flex justify-center text-white text-2xl">State No : {i+1}</header>
                    <div className="">
                        <div className="flex my-2">
                        <h3 className="h-3 capitalize text-white ">{entries[0][0]}<span className="invisible">......</span>:<span className="invisible">.....</span></h3>
                        <h3 className="h-3 text-white ">{entries[0][1]}</h3>
                    </div>
                    <div className="flex my-2">
                        <h3 className="h-3 text-white ">Options<span className="invisible">.....</span>:<span className="invisible">.....</span></h3>
                        <h3 className="h-3 capitalize text-white ">{entries[1][1]}</h3>
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