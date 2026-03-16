import { LuFilter } from 'react-icons/lu';
import { DropdownItem ,Dropdown , Checkbox, Label} from "flowbite-react";
export default function Filter() {
    const filterOptions = ["Completed Projects", "Pending Projects","In Progress Projects"]
  return (
   <>
    <Dropdown
        dismissOnClick={false}
         label={
           <div className="flex items-center gap-2">
             <LuFilter className="w-4 h-4 text-gray-600" />
             <span className="font-medium">Filter</span>
           </div>
         }
         className="bg-white text-gray-600 hover:bg-white border border-gray-200"
       >
        {
            filterOptions.map((item)=>(
             <DropdownItem className = "flex gap-2">
            
            <Checkbox id= {item} />
            <Label htmlFor={item} className="text-gray-600" >  {item} </Label>
        
          </DropdownItem>
            ))
        }
       
       </Dropdown>
   </>
  )
}
