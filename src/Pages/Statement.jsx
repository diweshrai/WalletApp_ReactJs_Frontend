import React, { useEffect, useState } from 'react'
import Navbar from '../Component/Navbar';
import './green.css';
import axios from 'axios';
import { BASE_URL_API } from '../env';
const Statement = () => {
  
  
 const [transaction, setTransaction] = useState([]);
const cuid = localStorage.getItem('userId');

const [loading, setLoading] = useState(true);
const [accs , setAccs] = useState();

useEffect(() => {
  const fetchData = async () => {
    try {
      const response1 = await axios.get(`${BASE_URL_API}/users/getAllAccBy/${cuid}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`

        }
      });

      if (response1.status === 200) {
        const data1 = response1.data;
        setAccs(data1);

        // Wait for 2 seconds before making the second API call
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const response2 = await axios.get(`${BASE_URL_API}/users/allTransactionByCustomer/${cuid}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response2.status === 200) {
          const data2 = response2.data;
          setTransaction(data2);
          setLoading(false);
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 403) {
          // Handle 403 Forbidden error
          alert('Token expired. Please log in again.');
          localStorage.removeItem('token'); // Remove token on 403 error
          // Redirect to the login page
          localStorage.removeItem('userId');
          window.location.href = '/login'; // Replace '/login' with the actual login page URL
        }
      }
      console.error('An error occurred:', error);
    }
  };

  fetchData();
}, [cuid]);



const getRowColorClass = (fromAccount) => {
  console.log("the accs" +accs);
  
  const fromAccountStr =[];
  fromAccountStr.push(fromAccount.toString());
  //console.log("The data we have to match"+fromAccountStr);
  return accs.includes(fromAccountStr)? 'red-row' : 'green-row';
};
  
  return (
    <div>
      
      <Navbar/>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
 rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous"/>
 
 <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" 
 integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>

<br/><br/>

{loading ? (
        <img src={require('../img/wg.gif')} alt="Loading..."   style={{marginLeft:'36%', marginTop:'-1%' , width:'30%'}} />
      ) : (

      <div class= "conatiner" style={{
  display: 'flex',
  justifyContent: 'center',
  marginLeft: '90px',
  marginRight: '90px',
}}	>
 
 
 
 <table class="table">
  <thead class="thead-dark">
    <tr>
      <th scope="col">Transaction Id</th>
      <th scope="col">Transaction Type</th>
      <th scope="col">Transaction Date</th>
      <th scope="col">Transaction Amount</th>
       <th scope="col">From Account</th>
        <th scope="col">To Account</th>
         <th scope="col">Description</th>
         
          
         
           
           
           
           
    </tr>
  </thead>
 
 
       <tbody>

        {transaction.map((data)=>
          <tr className={getRowColorClass(data.fromAccount)}>
          <td>{data.transactionId}  </td>
          <td>{data.transactionType} </td>
          <td>{data.transactionDate} </td>
          <td>{data.amount} </td>
          <td>{data.fromAccount} </td>
          <td>  {data.toAccount}</td>
          <td> {data.description} </td>
		 
          </tr>
)}
    </tbody>
   
 
 
 
 
 </table>
 
 
 
 
 
 </div>




      )};
    </div>
  )
}

export default Statement
