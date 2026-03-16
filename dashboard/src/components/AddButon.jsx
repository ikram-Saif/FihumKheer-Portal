import { Link } from 'react-router-dom'
import { Button } from 'flowbite-react';
import { LuPlus } from 'react-icons/lu';

function AddButon({link}) {
  return (
    <>
    <Link to ={link}>
    <Button className="bg-[var(--primary-color)] hover:bg-[var(--primary-color)]">
            <LuPlus className ="me-2 h-4 w-4" />
            Add 
     </Button>
     </Link>
    </>
  )
}

export default AddButon