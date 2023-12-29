// XlsxBtn.js

import React from 'react';
import * as XLSX from 'xlsx'; // Correct import statement

const XlsxBtn = ({ data }) => {
  const handleOnExport = () => {
    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, 'ExcelSheet');
    XLSX.writeFile(wb, 'Excel.xlsx');
  };

  return (
    <button onClick={handleOnExport}>Export to Excel Sheet</button>
  );
};

export default XlsxBtn;
