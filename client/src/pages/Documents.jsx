import React, { useState } from 'react';

function Documents() {
  const [files, setFiles] = useState([]);

  // Simulate file upload
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFiles([...files, file]);
    }
  };

  return (
    <div>
      <h2>Documents</h2>
      <input
        type="file"
        onChange={handleUpload}
        accept=".pdf,.doc,.jpg,.png"
      />
      <ul>
        {files.map((file, idx) => (
          <li key={idx}>
            {file.name}
            <a href={URL.createObjectURL(file)} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 8 }}>
              View/Download
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Documents;
