import { useState } from "react";

export default function StandardInput({title, id, inputValue, type}){

  
  function capitalizeFirstLetter(phrase){
    if(!phrase) return '';
    return phrase.charAt(0).toUpperCase() + phrase.slice(1);
  }
  
  return(
    <div className="">
      <label 
      className="w-full py-3 text-sm"
      htmlFor={id}>{capitalizeFirstLetter(title)}</label>
      <input 
      type={type != null ? type : "text"} 
      className="bg-[#D9D9D9] h-7 rounded-md w-full px-3 py-3 text-sm"
      id={id}
      name={id}
      onChange={inputValue}
      required/>
      
    </div>

  );
}