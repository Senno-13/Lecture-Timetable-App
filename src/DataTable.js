// DataTable.js

import React from 'react';

const DataTable = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>{row.Name}</td>
            <td>{row.Age}</td>
            <td>{row.Email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
