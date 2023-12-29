import React, { useState } from "react";

export default function Select({ options, handleChange, name, fieldKey }) {
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelectionChange = (e) => {
    console.log(fieldKey, e.target.value)
    const selectedOption = e.target.value;
    setSelectedValue(selectedOption);
    handleChange(fieldKey, selectedOption);
  };
  return (
    <select
      className="flex h-9 w-full text-black rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-stone-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
      value={selectedValue}
      onChange={handleSelectionChange}
    >
      <option value="" disabled>
        {name}
      </option>
      {options?.map((optionData) => (
        <option key={optionData.name} value={optionData.name}>
          {optionData.name}
        </option>
      ))}
    </select>
  );
}
