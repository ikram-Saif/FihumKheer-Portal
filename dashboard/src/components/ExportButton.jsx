import { Button } from 'flowbite-react';
import { LuUpload } from 'react-icons/lu';

/**
 * ExportButton Component
 * Modern, high-end button for exporting data.
 * @param {Function} onClick - Action handler
 * @param {String} label - Button label
 */
export default function ExportButton({ onClick, label = "Export" }) {
  return (
    <Button 
      onClick={onClick}
      className="!bg-white dark:!bg-gray-950/50 !text-gray-700 dark:!text-gray-300 !font-black !rounded-2xl !shadow-sm !border !border-gray-200 dark:!border-gray-800 hover:!bg-gray-50 dark:hover:!bg-gray-800/50 !transition-all !duration-300 hover:!shadow-md hover:!border-blue-500/50 group h-[48px] px-6"
    >
      <LuUpload className="mr-2 h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
      <span className="tracking-tight">{label}</span>
    </Button>
  );
}
