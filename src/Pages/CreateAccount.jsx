import React, { useState } from 'react'
import Navbar from '../Component/Navbar'
import axios from 'axios';
import { BASE_URL_API } from '../env';

const CreateAccount = () => {
 
  // Current date for registration
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is 0-based, so add 1
  const day = String(currentDate.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;



 const accno = localStorage.getItem('userId');
const [acctype , setAcctype] = useState('savings');
const [openBal , setOpenbal] = useState();
const [desc , setDesc] = useState('');
const [date, setDate] = useState(formattedDate);




const buttonHandle = () => {
    console.log("accno" + accno + "acctype" + acctype + "openball" + openBal + "desc" + desc);
  
    const regData = {
      accountType: acctype,
      openingBalance: openBal,
      openingDate: date,
      description: desc
    };
  
    axios.post(`${BASE_URL_API}/users/addAccount/${accno}`, regData, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          alert('Account Created');
        } else {
          alert(`Error: ${response.data}`);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          // Handle 403 Forbidden error
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          window.location.href = '/login';
        }
        alert(`Error: ${error.message}`);
      });
  };

 
  return (
    <div>
<Navbar/>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
 rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous"/>
 
 <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" 
 integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>





      <div class="container mt-5">
        <h2  style={{ fontWeight:'bold',
            textAlign: 'center'}}>Create New Account</h2>
     
            <div class="mb-3">
                <label for="accountType" class="form-label">Account Type</label>
                <select class="form-select" id="accountType" name="accType"  onChange={(e)=>{setAcctype(e.target.value)}}>
                    <option value="savings">Savings Account</option>
                    <option value="current">Current Account</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="openingBalance" class="form-label">Opening Balance</label>
                <input type="number" class="form-control" id="openingBalance" name="openBal" required
                onChange={(e)=>{setOpenbal(e.target.value)}}
                />
            </div>
            <div class="mb-3">
                <label for="description" class="form-label">Description</label>
                <textarea class="form-control" id="description" name="desc" rows="3"
                onChange={(e)=>{setDesc(e.target.value)}}
                
                />
            </div>
            <button type="submit" class="btn btn-primary" onClick={buttonHandle}>Submit</button>
        
    </div>    </div>
  )
}

export default CreateAccount
