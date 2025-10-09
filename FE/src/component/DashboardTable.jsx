
const DashboardTable = ({list, title, onNew, onDelete, onClick}) =>{

  const handleOnClick = (id) =>{
    if(onClick){
      onClick(id);
    }
  }
  return(

    <div className="flex-1 h-auto border drop-shadow-lg">
      <div className="flex items-center justify-between gap-2 p-4">
        <p className="text-sm font-bold">{title}</p>
        <button className="btn add" onClick={onNew}>Nuevo</button>
      </div>
      <div className="w-full bg-gray-200 h-[1px]"></div>
      <div className="">
        {
          list.length > 0 
          ? list.map((d)=>(
              <div className="flex w-full px-4 py-1 text-sm hover:border-y" key={d.id}
                >
                <div className={`flex-1 ${onClick ? "cursor-pointer" : "cursor-default"}`} onClick={() => handleOnClick(d)}>{d.name}</div>
                <svg 
                  onClick={()=>onDelete(d.id)}
                  className="cursor-pointer dashboard-table-item-delete"
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
              </div>
            ))

          :  <div className="flex w-full px-4 py-1 text-sm" >N/a {}</div>
        }    
      </div>
    </div>
  
  )
}

export default DashboardTable;