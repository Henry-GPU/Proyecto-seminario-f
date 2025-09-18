function ListComponent({ 
  list, 
  value, 
  onValueChange, 
  name, 
  onAddOption, 
  listId, 
  withoutButtonAdd,
  prop,
  selectName
}) {
  
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className="flex flex-wrap w-full">
      <label 
        className="form-input-label"
        htmlFor={`select-list-${listId}`}>
        {capitalizeFirstLetter(name)}:
      </label>
      <div className="flex flex-wrap justify-center w-full max-w-full gap-x-2 gap-y-1">
        <select
          name={selectName}
          className={`form-select ${!withoutButtonAdd ? 'max-w-[75%]' : ''}`}
          value={value?.id || ""} // Si value es un objeto, usa su id
          id={selectName}
          onChange={onValueChange}
        >
          {list && list.length > 0 ? (
            list.map((item) => (
              <option key={item.id} value={item.id}> {/* Utiliza 'id' de cada item */}
                {prop === 'serial' 
                ? `${item.serialNumber}` 
                : prop === 'address' 
                ? `${item.addressLine}, ${item.city}, ${item.state}`
                : prop === 'rol'
                ? `${item.roleName}`
                : item.name 
                }
              </option>
            ))
          ) : (
            <option>N/a {name}{(name === "direccion" || name === 'vendedor' || name === "cliente") ? "es" : "s"} disponibles</option>
          )}
          {}
        </select>
        {!withoutButtonAdd && (
          <button 
            className=" btn add max-w-20" 
            onClick={onAddOption}>
            <p>Nuevo</p>
          </button>
        )}

      </div>
      
    </div>
  );
}

export default ListComponent;
