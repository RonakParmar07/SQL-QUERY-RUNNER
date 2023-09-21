import React, { useState } from "react";

function SqlQueryInput({ onSubmit, currentTable }) {
  const [query, setQuery] = useState("");

  return (
    <div>
      <textarea
        rows='14'
        cols='90'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='Enter your SQL query here'
      ></textarea>
      <button
        onClick={() => {
          setQuery("");
          onSubmit(currentTable);
        }}
      >
        Run Query
      </button>
    </div>
  );
}

export default React.memo(SqlQueryInput);
