import React, { useState } from 'react'
import Navbar from '../Component/Navbar'
import Swal from 'sweetalert2';
import { BASE_URL_API } from '../env';
import axios from 'axios';


const FundTransfer = () => {
 
const [acc1 , setAcc1] = useState();
const [acc2 , setAcc2] = useState();
const [amount , setAmount] = useState();
const [mess , setMess] = useState('');

const [loading , setLoading] = useState(false);
 
const buttonHandler = () => {
  setLoading(true);

  console.log(acc1, acc2, amount, mess);

  axios.post(`${BASE_URL_API}/users/FundTransfer/${acc1}/${acc2}/${amount}/${mess}`, null, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then((response) => {
      setLoading(false);
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
        alert('Fund Transferred');
      } else if (typeof data === 'string') {
        setLoading(false);
        if (data.includes('Insufficient')) {
          Swal.fire({
            icon: 'error',
            title: 'Insufficient Balance',
            text: `${data}`,
          });
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Fund Transferred',
            text: `${data}`,
          });
        }
      }
    })
    .catch((error) => {
      setLoading(false);
      if (axios.isAxiosError(error) && error.response && error.response.status === 403) {
        // Handle 403 Forbidden error
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
            textAlign: 'center'}}>Fund Transfer</h2>
       
           <div class="mb-3">
                <label for="openingBalance" class="form-label">From Account</label>
                <input type="number" class="form-control" id="openingBalance"
                 placeholder="Enter Your Account No" name="fromAccNo" required 
                 onChange={(e)=> {setAcc1(e.target.value)}}
                 
                 />
            </div>
           <div class="mb-3">
                <label for="openingBalance" class="form-label">To Account</label>
                <input type="number" class="form-control" id="openingBalance"
                 placeholder="Enter Account No You Want To Send Money" 
                 name="toAccNo" required  onChange={(e)=> {setAcc2(e.target.value)}} />
            </div>
           
            <div class="mb-3">
                <label for="openingBalance" class="form-label">Enter Amount</label>
                <input type="number" class="form-control" id="openingBalance" 
                placeholder="Enter Amount You Want to Send" name="tranAmount" required
                onChange={(e)=> {setAmount(e.target.value)}}
                /> 
            </div>
            <div class="mb-3">
                <label for="description" class="form-label">Description</label>
                <textarea class="form-control" id="description" name="desc" rows="3"
                onChange={(e)=> {setMess(e.target.value)}}
                
                />
            </div>
            <button type="submit" class="btn btn-primary" onClick={buttonHandler}>Submit</button>
       
    </div>

      )};


    </div>
  )
}

export default FundTransfer
