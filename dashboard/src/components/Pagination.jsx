
import { Pagination } from "flowbite-react";
import { useState } from "react";

export function TablePagination({meta , fetchProjects}) {
    console.log(meta)
    
  const [currentPage, setCurrentPage] = useState(meta?.pagination?.page || 1);
 

 const handlePageChange = async(page) => {
    
    setCurrentPage(page);   
    fetchProjects(page); 
  };

  return (
    <div>
      <Pagination 
      className="flex justify-between items-center"
        layout="table"
        currentPage={currentPage}
        itemsPerPage={1} 
        totalItems={meta?.pagination?.pageCount || 1} 
        onPageChange={handlePageChange}
         />
    </div>
  );
}
