import React, { useState, useEffect } from "react";

const QueryResult = ({ result }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const calculateFirstIndex = () => {
    return (pageNumber - 1) * itemsPerPage;
  };

  const calculateLastIndex = () => {
    return pageNumber * itemsPerPage;
  };

  const calculateTotalPages = () => {
    return Math.ceil(result.length / itemsPerPage);
  };

  const handlePageNumberChange = (newPageNumber) => {
    setPageNumber(newPageNumber);
  };

  const handleItemsPerPageChange = (event) => {
    const newItemsPerPage = parseInt(event.target.value);
    setItemsPerPage(newItemsPerPage);
  };

  useEffect(() => {
    setPageNumber(1);
  }, [result]);

  if (result.length === 0) {
    return null;
  }

  const firstIndex = calculateFirstIndex();
  const lastIndex = calculateLastIndex();
  const currentRows = result.slice(firstIndex, lastIndex);
  const totalPages = calculateTotalPages();
  const headers = Object.keys(currentRows[0]);

  return (
    <div>
      <div>
        <select
          id='itemsPerPageSelect'
          onChange={handleItemsPerPageChange}
          value={itemsPerPage}
        >
          <option value={5}>Items per page</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
        </select>
      </div>
      <table className='query-table'>
        <thead className='table-header'>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header) => (
                <td key={header}>{row[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className='pagination'>
        <button
          onClick={() => handlePageNumberChange(pageNumber - 1)}
          disabled={pageNumber === 1}
        >
          Previous
        </button>
        <div className='pagination-text'>
          Page {pageNumber} of {totalPages}
        </div>
        <button
          onClick={() => handlePageNumberChange(pageNumber + 1)}
          disabled={pageNumber === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default React.memo(QueryResult);
