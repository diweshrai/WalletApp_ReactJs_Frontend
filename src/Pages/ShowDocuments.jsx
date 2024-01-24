import React, { useEffect, useState } from 'react';
import Navbar from '../Component/Navbar';
import { BASE_URL_API } from '../env';
import axios from 'axios';

const ShowDocuments = () => {
  const [moviedata, setMoviedata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoc, setSelectedDoc] = useState(null); 
  const cid = localStorage.getItem('userId');

  const handleDeleteButton = (docId, docType, docStatus) => {
    axios.post(`${BASE_URL_API}/users/images/deleteDoc/${cid}/${docType}/${docStatus}`, null, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        if (axios.isAxiosError(error) && error.response && error.response.status === 403) {
          // Handle 403 Forbidden error
          alert('Token expired. Please log in again.');
          localStorage.removeItem('token'); // Remove token on 403 error
          // Redirect to the login page
          window.location.href = '/login'; // Replace '/login' with the actual login page URL
        } else {
          setMoviedata((prevData) => prevData.filter((data) => data.documentId !== docId));
          console.error('Error during delete:', error);
        }
      });
  };

  const handleViewDoc = (docPath) => {
    const path = docPath;

   console.log(path);
   const pathSegments = path.split('\\');
   const filename = pathSegments[pathSegments.length - 1];
    console.log("the file nae is"+filename);

    setSelectedDoc(filename);
   
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL_API}/users/images/getAllDoc/${cid}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
  
        if (response.status === 200) {
          const data = response.data;
          setMoviedata(data);
          setLoading(false);
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response && error.response.status === 403) {
          // Handle 403 Forbidden error
          alert('Token expired. Please log in again.');
          localStorage.removeItem('token'); // Remove token on 403 error
          localStorage.removeItem('userId');
          window.location.href = '/login'; // Replace '/login' with the actual login page URL
        } else {
          console.error('Error fetching data:', error);
        }
      }
    };
  
    fetchData();
  }, [cid]);

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

      {loading ? (
        <img
          src={require('../img/wg.gif')}
          alt="Loading..."
          style={{ marginLeft: '36%', marginTop: '-1%', width: '30%' }}
        />
      ) : (
        <div className="container" style={{ display: 'flex', justifyContent: 'center', marginLeft: '90px', marginRight: '90px' }}>
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Document Id</th>
                <th scope="col">Customer ID</th>
                <th scope="col">Document Type</th>
                <th scope="col">Document Status</th>
                <th scope="col">Document Upload Date</th>
                <th scope="col">Delete Documents</th>
                <th scope="col">View Documents</th>
              </tr>
            </thead>
            <tbody>
              {moviedata.map((data) => (
                <tr key={data.documentId}>
                  <td>{data.documentId}</td>
                  <td>{data.customerId}</td>
                  <td>{data.documentType}</td>
                  <td>{data.docStatus}</td>
                  <td>{data.uploadedDate}</td>
                  <td>
                    <button
                      className="bg-red-600 rounded-md px-2 text-white"
                      onClick={() => handleDeleteButton(data.documentId, data.documentType, data.docStatus)}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <button onClick={() => handleViewDoc(data.documentPath)}>View Doc</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

     
{selectedDoc && (
  <div className="text-center mt-20 relative inline-block border-solid border-2 border-gray-500 p-4 mx-auto max-w-1/2">
    <img
      src={`http://localhost:8966/img/${selectedDoc}`}
      className="w-250 h-250 object-cover"
      alt="Document"
    />
    <button
      className="absolute top-2 right-2 bg-none border-none text-xl cursor-pointer text-red-500"
      onClick={() => setSelectedDoc(null)}
    >
      X
    </button>
  </div>
)}
</div>
  );
};

export default ShowDocuments;
