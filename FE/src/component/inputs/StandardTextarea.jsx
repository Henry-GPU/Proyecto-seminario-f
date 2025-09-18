import { useState } from "react";

export default function StandardTextarea({title, id, inputValue, type}){

  
  function capitalizeFirstLetter(phrase){
    if(!phrase) return '';
    return phrase.charAt(0).toUpperCase() + phrase.slice(1);
  }
  
  return(
    <div className="w-full">
      <label 
      className="w-full py-3 text-sm"
      htmlFor={id}>{capitalizeFirstLetter(title)}</label>
      <textarea 
      type={type != null ? type : "text"} 
      className="bg-[#D9D9D9] h-7 rounded-sm w-full px-3 py-3 text-sm"
      id={id}
      name={id}
      onChange={inputValue}
      required/>
      
    </div>

  );
}