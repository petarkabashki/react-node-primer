import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const [vegies, setVegies] = useState([]);
  const [newVegie, setNewVegie] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(
      `http://localhost:4000/api/vegies`,
      {
        method: "GET",
      }
    )
      .then(res => res.json())
      .then(response => {
        console.log('blah', response)
        setVegies(response);
        setIsLoading(false);
      })
      .catch(error => console.log(error));
  }, []);

  const handleAdd = () => {
    const vegObj = {"name": newVegie};
    console.log("vegObj", vegObj);
    fetch(
      `http://localhost:4000/api/vegies`,
      {
        method: "POST",
        mode: 'no-cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(vegObj)
      }
    )
      .then(res => res.json())
      .then(response => {
        setVegies(response);
        setIsLoading(false);
      })
      .then(() => setNewVegie(''))
      .catch(error => console.log(error));
  }

  return (
    <div className="App">
      <header className="App-header">
          <div>
            <h3>New vegie</h3>
            <input type="text"
              value={newVegie}
              onChange={(e)=>setNewVegie(e.target.value)}
              />
            <button onClick={handleAdd}>Add</button>
          </div>
          <hr/>
          <div>
            { isLoading 
                && (<h2>Loading...</h2>)
                || (
                  <ul>
                    {vegies.map((v,i) => <li key={i}>{v.name}</li>)}
                  </ul>
                )
            }
          </div>
      </header>
    </div>
  );
}

export default App;
