import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import Swal from 'sweetalert2';

const BulkCustomersUpload = () => {
  const [file, setFile] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);
  const [invalidCustomers, setInvalidCustomers] = useState([]);

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  };

  const handleUpload = async () => {
    setInvalidCustomers([]);
  
    if (!file) {
      Swal.fire({
        icon: 'error',
        title: 'Select A File',
        text: 'Select Something',
      });
  
      return;
    }
  
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      // Make API request to upload bulk customers using Axios
      const response = await axios.post('http://localhost:8966/admin/api/uploadBulkCustomers', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });
  
      setApiResponse(response.data);
      console.log(response.data);
  
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Upload Successful',
          text: 'All records are good and uploaded successfully',
        });
      }
  
    } catch (error) {
      setApiResponse(null);
      console.error(error.response.data);
  
      if (axios.isAxiosError(error) && error.response && error.response.status === 403) {
        // Handle 403 Forbidden error
        alert('Token expired. Please log in again.');
        localStorage.removeItem('token'); // Remove token on 403 error
        localStorage.removeItem('userId');
        window.location.href = '/AdminLoginPage'; // Replace '/login' with the actual login page URL
      } else if (error.response.status === 400) {
        setInvalidCustomers(error.response.data);
        console.log(invalidCustomers);
        console.log(error.response.data)
        Swal.fire({
          icon: 'error',
          title: 'Invalid Data',
          html: 'Some records are invalid. Please review the data.',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response.data,
        });
      }
    }
  };
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '.xls, .xlsx',
    multiple: false,
  });

  return (

<div>


    <div className="max-w-md mx-auto mt-8 p-4 border rounded-lg bg-white">
      <div {...getRootProps()} style={dropzoneStyles}>
        <input {...getInputProps()} />
        <p className="text-gray-500">Drag & drop an Excel file here, or click to select one.</p>
        {file && <p className="text-green-500">Selected File: {file.name}</p>}
      </div>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded focus:outline-none focus:shadow-outline-blue"
        onClick={handleUpload}
      >
        Upload
      </button>

      {apiResponse && (
        <div className="mt-4">
          <p className="text-lg font-semibold">Success</p>
          <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(apiResponse, null, 2)}</pre>
        </div>
      )}







    </div>

    <div className= "mx-25" style={{marginLeft:'25%'}}>
    {invalidCustomers.length > 0 && (
  <div className="mt-4">
    <h2 className="text-lg font-semibold">Invalid Data: Invalid Emails</h2>
    <div className="flex flex-wrap gap-4">
      {invalidCustomers.map((invalidCustomer, index) => (
        <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3">
          <div className="border p-2 mt-2 rounded bg-gray-100">
            <h3 className="text-md font-semibold mb-2">Invalid Customer #{index + 1}</h3>
            <ul>
              {Object.entries(invalidCustomer).map(([key, value]) => (
                <li key={key} className={`mb-1 ${key === 'emailId' ? 'text-red-500' : ''}`}>
                  <strong className="mr-1">{key}:</strong> {value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
          </div>
        </div>
      )}

</div>

</div>


  );
};

const dropzoneStyles = {
  border: '2px dashed #eeeeee',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};

export default BulkCustomersUpload;
