import React, { useEffect, useState } from 'react'
import Navbar from '../Component/Navbar';
import { BASE_URL_API } from '../env';
import axios from 'axios';




  
  const AllAccounts = () => {
    const [moviedata, setMoviedata] = useState([]);
    const cuid = localStorage.getItem('userId');
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const token = localStorage.getItem('token'); // Replace 'yourAuthToken' with the key you use for your authentication token
          const response = await axios.get(`${BASE_URL_API}/users/getAccountByCustomer/${cuid}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
          });
  
          setMoviedata(response.data);
          setLoading(false);
        } catch (error) {
          if (error.response && error.response.status === 403) {
            // Handle 403 Forbidden error
            console.log("status code"+error.response.status);
            localStorage.removeItem('token'); // Clear the token on 403 error
            localStorage.removeItem('userId');
            setMoviedata([]); // Reset your data or handle as needed
          }
          setLoading(false);
        }
      };
  
      fetchData();
    }, [cuid]);

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
      <th scope="col">Account Number</th>
      <th scope="col">Account Type</th>
      <th scope="col">Current Balance</th>
      <th scope="col">Opening Date</th>
       <th scope="col">Opening Description</th>
        
          
            
           
           
           
           
    </tr>
  </thead>
 
 
       <tbody>

        {moviedata.map((data)=>
          <tr>
          <td>{data.accountNo}  </td>
          <td>{data.accountType} </td>
          <td>{data.openingBalance} </td>
          
          <td>{data.openingDate} </td>
          <td>  {data.description}</td>
        
          </tr>
)}
    </tbody>
     
 
 
 
 
 </table>
 
 
 
 
 
 </div>
    

      )};


</div>
  )
}

export default AllAccounts
