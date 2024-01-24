import React from 'react'
import Navbar from '../Component/Navbar'
import { useState } from 'react';
import Swal from 'sweetalert2';
import { BASE_URL_API } from '../env';
import axios from 'axios';


const Widhraw = () => {
 
  
  const [accno , setAccno] = useState();
  const [amount , setAmount] = useState();
  const [mess , setMess] = useState('');
  const [loading, setLoading] = useState(false);


  const buttonHandler = () => {
    setLoading(true);
  
    axios.post(`${BASE_URL_API}/users/WidhrawMoney/${accno}/${amount}/${mess}`, null, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((response) => {
        if (response.status === 200) {
          // Check if the response is JSON, and if so, parse it
          if (response.headers['content-type'] === 'application/json') {
            return response.data;
          } else {
            // Handle plain text response (e.g., "Done")
            return response.data;
          }
        } else {
          alert('Invalid Data');
          throw new Error('Invalid user');
        }
      })
      .then((data) => {
        if (typeof data === 'object') {
          // Handle JSON response
          alert('Fund Transferred');
        } else if (typeof data === 'string') {
          setLoading(false);
          if (data.includes('Low')) {
            Swal.fire({
              icon: 'error',
              title: 'Low Balance',
              text: `${data}`,
            });
          } else {
            Swal.fire({
              icon: 'success',
              title: 'Withdraw',
              text: `${data}`,
            });
          }
        }
      })
      .catch((error) => {
        setLoading(false);
        if (axios.isAxiosError(error) && error.response && error.response.status === 403) {
          // Handle 403 Forbidden error
          alert('Token expired. Please log in again.');
          localStorage.removeItem('token'); // Remove token on 403 error
          localStorage.removeItem('userId');
          window.location.href = '/login'; // Replace '/login' with the actual login page URL
        } else {
          console.error('An error occurred:', error);
        }
      });
  };
 
 
  return (
    <div>


<Navbar/>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
 rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous"/>
 
 <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" 
 integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>



{loading ? (
        <img src={require('../img/tr.gif')} alt="Loading..."   style={{marginLeft:'36%', marginTop:'2%' , width:'30%'}} />
      ) : (

      <div class="container mt-5">
        <h2  style={{ fontWeight:'bold',
            textAlign: 'center'}}>Withdraw Money</h2>
        
           <div class="mb-3">
                <label for="openingBalance" class="form-label">Account Number</label>
                <input type="number" class="form-control" id="openingBalance" 
                name="accNo" required   onChange={(e)=>{setAccno(e.target.value)}}/>
            </div>
            <div class="mb-3">
                <label for="openingBalance" class="form-label">Enter Amount</label>
                <input type="number" class="form-control" id="openingBalance" 
                name="wiAmount" required  onChange={(e)=>{setAmount(e.target.value)}} />
            </div>
            <div class="mb-3">
                <label for="description" class="form-label">Description</label>
                <textarea class="form-control" id="description" name="desc" rows="3" 
                onChange={(e)=>{setMess(e.target.value)}}
                />
            </div>
            <button type="submit" class="btn btn-primary" onClick={buttonHandler}>Submit</button>
        
    </div>



      )};


    </div>
  )
}

export default Widhraw
