import { Dropdown, DropdownItem } from 'flowbite-react';
import { LuFilter, LuChevronDown } from 'react-icons/lu';

/**
 * GenericFilter Component
 * Provides a high-end dropdown for filtering table data.
 * @param {Array} options - [{ label, value, icon }]
 * @param {Function} onSelect - Callback function(value)
 * @param {String} currentLabel - Currently selected label
 */
export default function GenericFilter({ options, onSelect, currentLabel }) {
  return (
    <div className="relative group">
      <Dropdown
        label={
          <div id="generic-filter-trigger" className="flex items-center gap-3 w-full">
            <div className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
              <LuFilter size={14} />
            </div>
            <span className="font-bold text-sm tracking-tight text-gray-700 dark:text-gray-300">
              {currentLabel}
            </span>
            <LuChevronDown size={14} className="ml-auto opacity-40 group-hover:opacity-100 transition-opacity" />
          </div>
        }
        inline
        theme={{
          content: "py-3 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-[1.5rem] shadow-2xl border border-gray-100 dark:border-gray-800 mt-3 min-w-[200px] overflow-hidden animate-in fade-in zoom-in-95 duration-200",
        }}
      >
        <div className="px-4 py-2 mb-1">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Filter By Status</span>
        </div>
        {options.map((opt) => (
          <DropdownItem 
            key={opt.value} 
            onClick={() => onSelect(opt.value)}
            className="px-5 py-3 text-sm font-bold text-gray-600 dark:text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all flex items-center gap-4 border-l-4 border-transparent hover:border-blue-500"
          >
            {opt.icon && <opt.icon size={16} className="text-gray-400" />}
            {opt.label}
          </DropdownItem>
        ))}
      </Dropdown>
      
      {/* Container Style - We use a wrapper for the specific premium look because Flowbite "label" prop wraps in a button */}
      <style dangerouslySetInnerHTML={{ __html: `
        #generic-filter-trigger { 
          padding: 0.6rem 1.25rem;
          border-radius: 1.1rem;
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(229, 231, 235, 1);
          transition: all 0.3s ease;
        }
        .dark #generic-filter-trigger {
          background: rgba(17, 24, 39, 0.8);
          border-color: rgba(31, 41, 55, 1);
        }
        #generic-filter-trigger:hover {
          border-color: rgba(59, 130, 246, 0.5);
          box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.05);
        }
      `}} />
    </div>
  );
}
