import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../api/index.js";

const FileUploader = () => {
  const [file, setFile] = useState(null);
  const [caseName, setCaseName] = useState("");
  const [caseDate, setCaseDate] = useState("");
  const [user, setUser] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleCaseNameChange = (event) => {
    setCaseName(event.target.value);
  };

  const handleCaseDateChange = (event) => {
    setCaseDate(event.target.value);
  };
  const handleCaseuser = (event) => {
    setUser(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create a new FormData instance
    const formData = new FormData();
    formData.append("caseName", caseName);
    formData.append("caseDate", caseDate);

    formData.append("fileType", "PKL");
    formData.append("file", file);

    // Perform the HTTP request using Axios
    axios
      .post(`${BASE_URL}/archive`, formData)
      .then((response) => {
        // Handle the response data
        console.log(response.data);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>File:</label>
        <input type="file" onChange={handleFileChange} />
      </div>
      <div>
        <label>Case Name:</label>
        <input type="text" value={caseName} onChange={handleCaseNameChange} />
      </div>
      <div>
        <label>Case Date:</label>
        <input type="text" value={caseDate} onChange={handleCaseDateChange} />
      </div>{" "}
      <div>
        <label>Case user:</label>
        <input type="text" value={user} onChange={handleCaseuser} />
      </div>
      <button type="submit">Upload</button>
    </form>
  );
};

export default FileUploader;
