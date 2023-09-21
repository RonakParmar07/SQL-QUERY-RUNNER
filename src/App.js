import React, { useState, lazy, Suspense } from "react";
import "./App.css";
import Papa from "papaparse";
import Navbar from "./components/navbar";

const SqlQueryInput = lazy(() => import("./components/SqlQueryInput"));
const QueryResult = lazy(() => import("./components/QueryResult"));

function App() {
  const [queryResult, setQueryResult] = useState([]);
  const [currentTable, setCurrentTable] = useState("/data/details.csv");

  // Define the CSV file options
  const csvFileOptions = [
    { label: "Details", value: "/data/details.csv" },
    { label: "Orders", value: "/data/orders.csv" },
    { label: "Products", value: "/data/products.csv" },
    { label: "Customers", value: "/data/customers.csv" },
  ];

  const handleQuerySubmit = async (fileToLoad) => {
    setQueryResult([]);
    try {
      const response = await fetch(fileToLoad);
      const text = await response.text();
      const result = Papa.parse(text, { header: true }).data;
      setQueryResult(result);
    } catch (error) {
      console.error("Error loading or parsing CSV data:", error);
    }
  };

  return (
    <div className='App'>
      <Navbar />
      <div className='container'>
        <div className='left-section'>
          <h2>Tables</h2>
          <ul>
            {csvFileOptions.map((option) => (
              <li
                className={currentTable === option.value ? "selected" : ""}
                key={option.label}
                onClick={() => {
                  setCurrentTable(option.value);
                  handleQuerySubmit(option.value);
                }}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
        <div className='right-section'>
          <Suspense fallback={<div>Loading...</div>}>
            <SqlQueryInput
              onSubmit={handleQuerySubmit}
              currentTable={currentTable}
            />
          </Suspense>
        </div>
      </div>
      {queryResult.length > 0 && (
        <div className='query-result'>
          <h2 className='query-result-h2'>Query Result</h2>
          <Suspense fallback={<div>Loading...</div>}>
            <QueryResult result={queryResult} />
          </Suspense>
        </div>
      )}
    </div>
  );
}

export default App;
