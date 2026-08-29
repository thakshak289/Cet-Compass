import { useState } from "react";
import "./App.css";

function App() {

  const [percentile, setPercentile] = useState("");
  const [category, setCategory] = useState("");
  const [branch, setBranch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      percentile,
      category,
      branch
    });
  };

  return (
    <div className="app">

      <div className="container">

        <h1>College Admission Assistant</h1>

        <p className="subtitle">
          Find colleges based on your MHT-CET percentile
        </p>

        <form onSubmit={handleSubmit}>

          <label>Your MHT-CET Percentile</label>

          <input
            type="number"
            step="0.01"
            min="0"
            max="100"
            placeholder="Enter your percentile"
            value={percentile}
            onChange={(e) => setPercentile(e.target.value)}
            required
          />

          <label>Category</label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select your category</option>
            <option value="OPEN">Open / General</option>
            <option value="OBC">OBC</option>
            <option value="SC">SC</option>
            <option value="ST">ST</option>
            <option value="VJ">VJ / DT</option>
            <option value="NT-B">NT-B</option>
            <option value="NT-C">NT-C</option>
            <option value="NT-D">NT-D</option>
            <option value="SEBC">SEBC</option>
            <option value="EWS">EWS</option>
          </select>

          <label>Preferred Branch</label>

          <select
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            required
          >
            <option value="">Select your branch</option>
            <option value="Computer Engineering">
              Computer Engineering
            </option>
            <option value="Information Technology">
              Information Technology
            </option>
            <option value="Electronics and Telecommunication Engineering">
              Electronics and Telecommunication Engineering
            </option>
            <option value="Mechanical Engineering">
              Mechanical Engineering
            </option>
            <option value="Electrical Engineering">
              Electrical Engineering
            </option>
            <option value="Civil Engineering">
              Civil Engineering
            </option>
          </select>

          <button type="submit">
            Find My Colleges
          </button>

        </form>

      </div>

    </div>
  );
}

export default App;