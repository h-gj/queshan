import React, { useState, useEffect } from 'react';

const AutoCompleteInput = ({ preSelectedItems, setNames }) => {
  const [inputText, setInputText] = useState('');
  const [selectedItems, setSelectedItems] = useState(preSelectedItems === undefined ? [] : preSelectedItems);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    // Reset state when someProp changes
    setSelectedItems(preSelectedItems);
  }, [preSelectedItems]); // Watch for changes in someProp

  
  const handleInputChange = (event) => {
    const userInput = event.target.value;
    setInputText(userInput);
    const data = [];
    const filtered = data.filter((item) =>
      item.toLowerCase().includes(userInput.toLowerCase())
    );
    setFilteredSuggestions(filtered);
    setShowSuggestions(true);
  };

  const handleInputEnter = (e) => {
    if (e.key === 'Enter') {
      // Handle Enter key press here
      const newSelectedItems = [...selectedItems, e.target.value];
      setSelectedItems(newSelectedItems);
      setNames(newSelectedItems);
      setInputText('');
      setShowSuggestions(false);
    }
  }

  const handleInputBlur = (e) => {
      // Handle Enter key press here
    const newSelectedItems = [...selectedItems, e.target.value];
    setSelectedItems(newSelectedItems);
    setNames(newSelectedItems);
    setInputText('');
    setShowSuggestions(false);
  }

  const handleClickAdd = () => {
  const newSelectedItems = [...selectedItems, inputText];
  setSelectedItems(newSelectedItems);
  setNames(newSelectedItems);
  setInputText('');
  setShowSuggestions(false);
}

  const handleSuggestionClick = (suggestion) => {
    const newSelectedItems = [...selectedItems, suggestion];
    setSelectedItems(newSelectedItems);
    setInputText('');
    setShowSuggestions(false);
  };

  const handleLabelClick = (index) => {
    const newSelectedItems = [...selectedItems];
    newSelectedItems.splice(index, 1);
    setSelectedItems(newSelectedItems);
  };

  return (
    <div>
      <div style={{}}>
        {selectedItems.map((item, index) => (
          <div className="selectedItemBox">
            <span key={index} className="selectedItem">
              {item}
            </span>
            <span className="deleteIcon circle" onClick={() => handleLabelClick(index)}>x</span>
          </div>
        ))}
      </div>

      <div>
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          onKeyPress={handleInputEnter}
          onBlur={handleInputBlur}
          placeholder="请输入参赛人员"
          style={{height: "3rem", fontSize: "16px"}}
        />
        <button 
          style={{height: "3rem"}}
          onClick={handleClickAdd}
        >添加</button>
      </div>

      {showSuggestions && (
        <ul className="suggestions">
          {filteredSuggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Sug = () => {
  const data = ['Apple', 'Banana', 'Cherry', 'Durian', 'Elderberry'];

  return (
    <p className="ZhuanP">
      <span>输入打转人员</span>
      <AutoCompleteInput data={data} preSelectedItems={["fdsf", "ff", "fdd"]}/>
    </p>
  );
};

export default AutoCompleteInput;
