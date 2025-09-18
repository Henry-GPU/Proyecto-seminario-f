export default function GridCard(){

  return(
    <div className="bg-white w-[180px] h-[220px] border drop-shadow-sm flex flex-col items-center p-1">
      <div className="w-full h-[140px] border object-contain"></div>
      <div className="mt-1">
        <h1 className="text-sm text-center">Example</h1>
        <p className="text-xs text-center text-neutral-600">Example</p>
        <p className="text-xs text-center text-green-500">Example</p>
      </div>
    </div>
  );

}