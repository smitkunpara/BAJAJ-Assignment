import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [json, setJson] = useState('');
    const [response, setResponse] = useState({});
    const [options, setOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const handleJsonChange = (e) => {
        setJson(e.target.value);
    }

    const handleOptionChange = (e) => {
        const selected = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedOptions(selected);
    }

    const handleSubmit = async () => {
        try {
            const parsedData = JSON.parse(json);
            if (!Array.isArray(parsedData["data"])) {
              alert('Please enter valid input');
              return;
            }
            console.log(parsedData);
            const res = await axios.post('https://bajaj-assignment-seven.vercel.app/bfhl', parsedData);
            setOptions(Object.keys(res.data));
            setResponse(res.data);
            setHasSubmitted(true);
        } catch (err) {
            setResponse(err.response ? err.response.data : err.message);
        }
    }

    return (
        <div className="App">
            <h1>JSON Filter</h1>
            <input type="text" value={json} onChange={handleJsonChange} placeholder="Enter JSON data" />
            <button onClick={handleSubmit}>Submit</button>
            <select value={selectedOptions} onChange={handleOptionChange} multiple>
                {options.filter(option => !['user_id', 'email', 'roll_number', 'is_success'].includes(option)).map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
            {hasSubmitted && (
                <div>
                    {selectedOptions.length > 0 && selectedOptions.map(option => (
                        <div key={option}>
                            <h2>{option}</h2>
                            <ul>
                                {response[option] && response[option].map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default App;