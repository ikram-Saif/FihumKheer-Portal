import GenericSearch from './GenericSearch';
import GenericFilter from './GenericFilter';
import AddButon from './AddButon';
import ExportButton from './ExportButton';

/**
 * PageTopSection Component
 * A unified, premium top bar for management pages.
 */
export default function PageTopSection({ 
  onSearch, 
  searchPlaceholder = "Search...", 
  filterOptions = [], 
  onFilterSelect, 
  currentFilterLabel = "Filter", 
  addButtonLink, 
  addButtonLabel = "Add New",
  onExport,
  totalCount,
  countLabel = "Results"
}) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 px-1 animate-in fade-in slide-in-from-top-4 duration-700">
      <div className="flex flex-wrap items-end gap-6">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Universal Search</span>
          <GenericSearch 
            onSearch={onSearch} 
            placeholder={searchPlaceholder} 
          />
        </div>
        
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Status Filter</span>
          <GenericFilter 
            options={filterOptions}
            onSelect={onFilterSelect}
            currentLabel={currentFilterLabel}
          />
        </div>

        {totalCount !== undefined && (
          <div className="pb-4 px-2 flex items-center gap-2">
            <div className="relative">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping absolute opacity-75"></div>
              <div className="relative w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
            </div>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">
              {totalCount} {countLabel}
            </span>
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-4 lg:pb-1">
        <ExportButton onClick={onExport} />
        <AddButon link={addButtonLink} label={addButtonLabel} />
      </div>
    </div>
  );
}
