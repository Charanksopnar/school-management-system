import React, { useState } from 'react';

const FileUpload = ({ onFileSelect, acceptedFileTypes, maxFileSize = 5, label = "Upload File" }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setError('');
    
    if (!file) {
      setSelectedFile(null);
      return;
    }
    
    // Check file type if acceptedFileTypes is provided
    if (acceptedFileTypes) {
      const fileExtension = file.name.split('.').pop().toLowerCase();
      const isAcceptedType = acceptedFileTypes.includes(fileExtension);
      
      if (!isAcceptedType) {
        setError(`Invalid file type. Accepted types: ${acceptedFileTypes.join(', ')}`);
        setSelectedFile(null);
        return;
      }
    }
    
    // Check file size (in MB)
    if (file.size > maxFileSize * 1024 * 1024) {
      setError(`File size exceeds ${maxFileSize}MB limit`);
      setSelectedFile(null);
      return;
    }
    
    setSelectedFile(file);
    
    // Call the parent component's callback
    if (onFileSelect) {
      onFileSelect(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file first');
      return;
    }
    
    setUploading(true);
    
    // Simulate file upload
    setTimeout(() => {
      setUploading(false);
      setSelectedFile(null);
      // In a real application, you would handle the actual file upload here
    }, 2000);
  };

  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <div className="input-group">
        <input
          type="file"
          className="form-control"
          onChange={handleFileChange}
          disabled={uploading}
        />
        {selectedFile && (
          <button
            className="btn btn-primary"
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        )}
      </div>
      {selectedFile && (
        <div className="form-text">
          Selected file: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)}MB)
        </div>
      )}
      {error && <div className="text-danger">{error}</div>}
    </div>
  );
};

export default FileUpload;
