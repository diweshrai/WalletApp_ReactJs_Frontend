import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { AUTH_URL_API } from '../env';
import LoginNavbar from './LoginNavbar';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  console.log(AUTH_URL_API);

  const handleLogin = () => {
    const requestBody = {
      emailId: email,
      password: password,
    };


    axios
      .post(AUTH_URL_API, requestBody)
      .then((response) => {
        const data = response.data;
        const token = data.token; // Adjust this based on your actual API response structure
        const userId= data.customerId;
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);

        Swal.fire({
          icon: 'success',
          title: 'Valid User',
          text: 'Login Success',
        }).then(() => {
          navigate('/home');
        });
      })
      .catch((error) => {
        console.error('An error occurred:', error);

        Swal.fire({
          icon: 'error',
          title: 'Invalid User',
          text: 'Use Your Correct Gmail and Password.',
        });
      });
  };

  return (

<div><LoginNavbar/>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
 rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous"/>
 
 <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" 
 integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>


    <div class="container mt-5">
      <h2 style={{ fontWeight: 'bold', textAlign: 'center' }}>Login Page</h2>
      <label class="form-label">Enter Your Gmail</label>
      <input
        type="text"
        class="form-control"
        required
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />

      <label class="form-label">Enter Your Password</label>
      <input
        type="password"
        class="form-control"
        required
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />

      <button  type="submit" className="btn btn-primary mt-2"  onClick={handleLogin}>Login</button>
    </div>
    </div>
  );
};

export default LoginPage;
