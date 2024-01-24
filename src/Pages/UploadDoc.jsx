import React, { useState, useRef } from 'react';
import Navbar from '../Component/Navbar';
import Swal from 'sweetalert2';
import { BASE_URL_API } from '../env';
import axios from 'axios';

const UploadDoc = () => {
  const [docType, setDocType] = useState('Aadhar Card');
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleDocTypeChange = (event) => {
    setDocType(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
  };

  const cid = localStorage.getItem('userId');

  const handleUploadClick = async () => {
    try {
      const fileInput = fileInputRef.current;
  
      if (!fileInput || fileInput.files.length === 0) {
        console.error('No file selected for upload');
        return;
      }
  
      const formData = new FormData();
      formData.append('image', fileInput.files[0]);
  
      const response = await axios.post(`${BASE_URL_API}/users/images/addDoc/${cid}/${docType}`, formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
  
      if (response.status === 200) {
        console.log('Document uploaded successfully!');
        Swal.fire({
          icon: 'success',
          title: 'Document Uploaded',
          text: 'Done With Upload',
        });
        setDocType('Aadhar Card');
        setImage(null);
        fileInput.value = '';
      } else {
        if (response.status === 400) {
          // Bad Request
          const errorMessage = response.data;
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `Bad Request: ${errorMessage}`,
          });
        } else if (response.status === 403) {
          // Handle 403 Forbidden error
          alert('Token expired. Please log in again.');
          localStorage.removeItem('token'); // Remove token on 403 error
          localStorage.removeItem('userId');
          window.location.href = '/login'; // Replace '/login' with the actual login page URL
        } else {
          console.error('Error uploading document');
        }
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `You Have Already Uploaded ${docType}`,
      });
      console.error('Error:', error);
    }
  };
  return (
    <div>
      <Navbar />

      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
        crossorigin="anonymous"
      />

      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz"
        crossorigin="anonymous"
      ></script>

      <br />
      <br />

      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="docType">
          Type of Doc:
        </label>
        <select
          id="docType"
          value={docType}
          onChange={handleDocTypeChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        >
          <option value="Aadhar Card">Aadhar Card</option>
          <option value="Pan Card">Pan Card</option>
          <option value="Voter Card">Voter Card</option>
        </select>

        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="image">
          Image:
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />
        {image && (
          <img
            src={image}
            alt="Selected"
            className="max-w-full max-h-32 mb-4 rounded-md shadow-md"
          />
        )}

        <button
          onClick={handleUploadClick}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default UploadDoc;
