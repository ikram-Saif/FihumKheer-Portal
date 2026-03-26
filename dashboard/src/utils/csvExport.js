/**
 * Utility function to export data to CSV and trigger download in the browser.
 * @param {Array<Object>} data - The data to export
 * @param {Array<String>} headers - The headers for the CSV
 * @param {String} fileName - The name of the file (including extension)
 */
export const exportToCSV = (data, headers, fileName = "export.csv") => {
  if (!data || !data.length) {
    console.warn("No data provided for export");
    return;
  }

  // Construct CSV string with UTF-8 BOM for Arabic support
  const csvContent = "\ufeff" + [
    headers.join(","),
    ...data.map(row => 
      headers.map(header => {
        const val = row[header] ?? "";
        // Escape quotes and wrap in quotes if contains comma or newline
        const stringVal = String(val).replace(/"/g, '""');
        return (stringVal.includes(',') || stringVal.includes('\n') || stringVal.includes('"')) 
          ? `"${stringVal}"` 
          : stringVal;
      }).join(",")
    )
  ].join("\n");

  // Create blob and trigger download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  
  link.setAttribute("href", url);
  link.setAttribute("download", fileName);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
