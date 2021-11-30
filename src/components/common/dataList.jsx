import React, { useEffect } from "react";

function DataList({
  name,
  label,
  placeholder,
  items,
  error,
  textProperty,
  valueProperty,
  onChange,
  value,
}) {
  useEffect(() => {
    setStringValue();
  });

  function setDataValue(e) {
    const input = e.currentTarget;
    const list = input.getAttribute("list");
    const options = document.querySelectorAll("#" + list + " option");
    const hiddenInput = document.getElementById(
      input.getAttribute("id") + "Hidden"
    );
    const inputValue = input.value;

    hiddenInput.value = inputValue;

    for (let option of options) {
      if (option.innerText === inputValue) {
        hiddenInput.value = option.getAttribute("datavalue");
        break;
      }
    }
    onChange({ currentTarget: hiddenInput });
  }

  function setStringValue() {
    const hiddenInput = document.getElementById(name + "InputHidden");
    const input = document.getElementById(name + "Input");
    const list = input.getAttribute("list");
    const options = document.querySelectorAll("#" + list + " option");

    for (let option of options) {
      if (option.getAttribute("datavalue") === hiddenInput.value) {
        input.value = option.innerText;
        break;
      }
    }
  }

  function checkDuplicity(item) {
    let duplicateIterator = "";
    const duplicates = items.filter(
      (i) => i[textProperty] === item[textProperty]
    );
    if (duplicates.length > 1) {
      for (let i = 0; i < duplicates.length; i++) {
        if (duplicates[i][valueProperty] === item[valueProperty])
          duplicateIterator = ` (${i + 1})`;
      }
    }
    return duplicateIterator;
  }

  function renderOption(item) {
    const duplicateIterator = checkDuplicity(item);
    return (
      <option key={item[valueProperty]} datavalue={item[valueProperty]}>
        {`${item[textProperty]}${duplicateIterator}`}
      </option>
    );
  }

  function renderLabel() {
    if (label)
      return (
        <label htmlFor={name + "Input"} className="form-label">
          {label}
        </label>
      );
  }

  return (
    <div className="form-group">
      {renderLabel()}
      <div className="row align-items-center">
        <div className="col">
          <input
            className="form-control"
            list={name + "List"}
            id={name + "Input"}
            placeholder={placeholder}
            onChange={setDataValue}
          />
          <datalist id={name + "List"}>
            {items.map((item) => renderOption(item))}
          </datalist>
        </div>
      </div>
      <input
        type="hidden"
        name={name}
        id={name + "InputHidden"}
        value={value}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

DataList.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
  placeholder: "Please Select an Option...",
};

export default DataList;
