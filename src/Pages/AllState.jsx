import React, { useEffect, useState } from 'react'
import Navbar from '../Component/Navbar';
import './green.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const AllState = () => {
  
  
 const [transaction, setTransaction] = useState([]);
const cuid = localStorage.getItem('userId');

const [loading, setLoading] = useState(true);
//const [accs , setAccs] = useState();

const [pageNumber , setPageNumber] = useState(0);
const [pageSize , setPageSize] = useState(0);
const [lastPage, setLastPage] = useState(false);
 
const [postData, setPostData] = useState({

 
    content: [],
    totalElements:'' ,
    totalPages: '',
    lastPage: false,
    pageSize: '5',
    pageNumber: '0'

  })


  useEffect(() => {
    fetchData();
  }, [cuid, postData.pageNumber, postData.pageSize]);

  const fetchData = () => {
    setLoading(true);
    fetch(`http://localhost:8966/getAllTranscByPageNumber/${postData.pageNumber}/${postData.pageSize}`)
      .then((result) => {
        result.json().then((resp) => {
          setPostData(resp);
          setLoading(false);
        });
      });
  };



  const changePage = (pNumber = 0, pSize = 5) => {
    setPostData({
      ...postData,
      pageNumber: pNumber,
      pageSize: pSize,
    });
  };

  const nextPage = () => {
    if (!postData.lastPage) {
      changePage(postData.pageNumber + 1, postData.pageSize);
    }
  };

  const prevPage = () => {
    if (postData.pageNumber > 0) {
      changePage(postData.pageNumber - 1, postData.pageSize);
    }
  };


// const getRowColorClass = (fromAccount) => {
//   console.log("the accs" +accs);
  
//   const fromAccountStr =[];
//   fromAccountStr.push(fromAccount.toString());
//   //console.log("The data we have to match"+fromAccountStr);
//   return accs.includes(fromAccountStr)? 'red-row' : 'green-row';
// };
  
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

        {postData.content.map((data)=>
          <tr >
          <td>{data.transactionId}  </td>
          <td>{data.transactionType} </td>
          <td>{data.transactionDate} </td>
          <td>{data.amount} </td>
          <td>{data.fromAccount} </td>
          <td>  {data.toAccount}</td>
          <td> {data.description} </td>
		 
          </tr>
)}

<Container className="text-center" > 

<Pagination>

<PaginationItem hidden={postData.pageNumber==0} onClick={prevPage} >
<PaginationLink previous>
</PaginationLink>
</PaginationItem>

{
  [...Array(parseInt(postData.totalPages))].map((_, index) => (
    <PaginationItem key={index}  active={index==postData.pageNumber}
    
    onClick={()=>changePage(index,5)}
    >
      <PaginationLink>
        {index + 1}
      </PaginationLink>
    </PaginationItem>
  ))
}




<PaginationItem  hidden={postData.pageNumber===postData.totalPages-1} onClick={nextPage}>
<PaginationLink next>
</PaginationLink>
</PaginationItem>


</Pagination>
</Container>
    </tbody>
   
 
 
 
 
 </table>
 
 
 
 
 
 </div>




      )};
    </div>
  )
}

export default AllState
