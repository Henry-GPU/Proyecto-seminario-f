import GridCard from "../GridCard";

export default function ResponsiveGrid(){

  return(
    <div className="flex flex-wrap justify-center w-full gap-2 p-2">
      <GridCard/>
      <GridCard/>
      <GridCard/>
      <GridCard/>
      <GridCard/>
      <GridCard/>
      <GridCard/>
      <GridCard/>
      <GridCard/>
    </div>
  );

}