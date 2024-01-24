import React, { useState } from 'react'
import Navbar from '../Component/Navbar'
import Swal from 'sweetalert2';
import { BASE_URL_API } from '../env';
import axios from 'axios';

const Deposite = () => {
  
  const [accno , setAccno] = useState();
  const [amount , setAmount] = useState();
  const [mess , setMess] = useState('');
  const [loading , setLoading] = useState(false);


  const buttonHandler = () => {
    setLoading(true);
  
    axios.post(`${BASE_URL_API}/users/DepositeMoney/${accno}/${amount}/${mess}`, null, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((response) => {
        setLoading(false);
        if (response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Money Deposited',
            text: 'Money Deposited Successfully...',
          });
          // You can redirect the user to the home page using React Router or window.location
        } else {
          alert('Invalid Data');
          throw new Error('Invalid user');
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
            textAlign: 'center'}}>Deposite Money</h2>
        
           <div class="mb-3">
                <label for="openingBalance" class="form-label">Account Number</label>
                <input type="number" class="form-control" id="openingBalance"
                 placeholder="Enter Account Number You want to deposite the money"
                  name="accNo" required    onChange={(e)=> {setAccno(e.target.value)}}  />
            </div>
            <div class="mb-3">
                <label for="openingBalance" class="form-label">Enter Amount</label>
                <input type="number" class="form-control" id="openingBalance" 
                name="depAmount" required    onChange={(e)=> {setAmount(e.target.value)} } />
            </div>
            <div class="mb-3">
                <label for="description" class="form-label">Description</label>
                <textarea class="form-control" id="description" name="desc" rows="3"
                
                onChange={(e)=> {setMess(e.target.value)} }
                
                />
            </div>
            <button type="submit" class="btn btn-primary" onClick={buttonHandler}>Submit</button>
        
    </div>

      )};

    </div>
  )
}

export default Deposite
