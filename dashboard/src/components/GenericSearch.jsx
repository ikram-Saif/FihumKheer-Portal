import { useState, useEffect } from 'react';
import { TextInput } from 'flowbite-react';
import { LuSearch } from 'react-icons/lu';

/**
 * GenericSearch Component
 * Provides a debounced search input that triggers onSearch after a delay.
 * @param {Function} onSearch - Callback function(value)
 * @param {String} placeholder - Input placeholder
 * @param {String} initialValue - Initial search value
 * @param {Number} debounceMs - Debounce delay in milliseconds
 */
export default function GenericSearch({ 
  onSearch, 
  placeholder = "Search...", 
  initialValue = "", 
  debounceMs = 500 
}) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(value);
    }, debounceMs);

    return () => clearTimeout(handler);
  }, [value, onSearch, debounceMs]);

  return (
    <div className="relative group w-full max-w-md">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-[1.25rem] opacity-0 group-focus-within:opacity-15 blur-sm transition duration-500"></div>
      <div className="relative flex items-center">
        <TextInput 
          id="generic-search"
          type="text" 
          placeholder={placeholder} 
          value={value} 
          onChange={(e) => setValue(e.target.value)}
          className="w-full shadow-sm"
          theme={{
            field: {
              input: {
                base: "block w-full border disabled:cursor-not-allowed disabled:opacity-50 rounded-[1.1rem] py-3 pl-14 pr-10 text-sm transition-all duration-300",
                colors: {
                  gray: "bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-inner"
                }
              }
            }
          }}
        />
        <LuSearch className="absolute left-4 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300" size={18} />
        
        {value && (
          <button 
            onClick={() => setValue("")}
            className="absolute right-3 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-all"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600 group-hover:scale-110"></div>
          </button>
        )}
      </div>
    </div>
  );
}
