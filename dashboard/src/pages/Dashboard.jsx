import { Card } from "flowbite-react";
import { AiOutlineGlobal  ,} from 'react-icons/ai';
import { GoPeople } from 'react-icons/go';

function Dashboard() {

  return (
      <div >
        <div className="flex gap-4">
      
                <Card href="#" className="flex justify-center items-center h-fit">
               <div className="flex flex-col items-center justify-center gap-2">
                  <AiOutlineGlobal size={32}  className="bg-gray-100 text-gray-600"/>
           
                  <p className="text-xl font-medium text-gray-500 dark:text-gray-400">
                    Visitors
                  </p>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    300
                  </h1>
                </div>
                </Card>

                <Card href="#" className="flex justify-center items-center h-fit">
               <div className="flex flex-col items-center justify-center gap-2">
                  <GoPeople size={32}  className="bg-gray-100 text-gray-600"/>
           
                  <p className="text-xl font-medium text-gray-500 dark:text-gray-400">
                    Visitors
                  </p>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    1000
                  </h1>
                </div>
                 
                </Card>
               <Card >
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem ad soluta explicabo dicta necessitatibus recusandae, veniam odio atque ex deleniti officia eaque facere, pariatur perspiciatis laudantium nemo eos corrupti dolores? Voluptate totam, sequi facilis porro error suscipit quam dolore ipsam laboriosam ex maiores esse unde nostrum, tempore ea repellat ratione minima, vero iste explicabo id? Delectus tenetur aperiam ipsa possimus dignissimos ratione voluptate dolores repellendus unde! Repudiandae excepturi consequatur laboriosam?</p>
                </Card>
       </div>
       
    </div>
  )
}

export default Dashboard