import { Link } from 'react-router-dom'
import { Button } from 'flowbite-react';
import { LuPlus } from 'react-icons/lu';

export default function AddButon({ link, label = "Add New" }) {
  return (
    <Link to={link}>
      <Button className="!bg-gradient-to-r !from-blue-600 !to-indigo-600 hover:!from-blue-700 hover:!to-indigo-700 !text-white !font-black !rounded-2xl !shadow-lg !shadow-blue-500/20 hover:!scale-[1.05] !transition-all !duration-300 !border-0 !outline-none focus:!ring-4 focus:!ring-blue-500/20 group h-[48px] px-6">
        <LuPlus className="mr-2 h-5 w-5 group-hover:rotate-90 transition-transform duration-500" />
        <span className="tracking-tight">{label}</span>
      </Button>
    </Link>
  );
}