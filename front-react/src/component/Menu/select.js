import React, { useState, useCallback } from "react";
import CreatableSelect from "react-select/creatable";

function Reactselect() {
  const [value, setValue] = useState();
  const [options, setOptions] = useState([
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "orange", label: "Orange" },
    { value: "berry", label: "Berry" },
  ]);

  const handleChange = useCallback((inputValue) => setValue(inputValue), []);

  const handleCreate = useCallback(
    (inputValue) => {
      const newValue = { value: inputValue.toLowerCase(), label: inputValue };
      setOptions([...options, newValue]);
      setValue(newValue);
    },
    [options]
  );

  return (
    <div className="App">
      <CreatableSelect
        isClearable
        value={value}
        options={options}
        onChange={handleChange}
        onCreateOption={handleCreate}
      />
    </div>
  );
}

export default Reactselect;