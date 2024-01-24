import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';

const AllCustomerShowToAdmin = () => {
  const [allCustomerData, setAllCustomerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchByFirstName , setSearchByFirstName] = useState();
  const [sortingByFields , setSortingByFields ] = useState("customerId");
  const [pageNo, setPageNo] = useState(0);
  const [pageSize , setPageSize] = useState(10);
  const [pageable , setPageable] = useState([]);
  const [isFirstPage , setIsFirstPage] = useState(false);
  const [isLastPage , setIsLastPage] = useState();
  const [totalPages , setTotalPages] = useState();
  const [currentPageNumber ,setCurrentPageNumber] = useState([]);


   const firstData = {

    searchByFirstName:searchByFirstName,
    pageNo:pageNo == 0 ? pageNo : pageNo-1,
    noOfItemsOnPage:pageSize ,
    sortByFields:sortingByFields
  };

  useEffect(() => {
    
    setLoading(false);
fetch("http://localhost:8966/pagi", {
  method: 'POST',
  headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
  },
  body: JSON.stringify(firstData),
})
  .then((response) => {
      response.json().then((resp) => {
        setAllCustomerData(resp.content);
        setIsFirstPage(resp.first);
        setIsLastPage(resp.last);
        setTotalPages(resp.totalPages);
        setPageable(resp.pageable);
        setLoading(false);
        setCurrentPageNumber(resp.pageable.pageNumber);
          console.log(resp.content);
          console.log(resp);
          

      });
  });

  }, [pageNo,pageSize,searchByFirstName]);

 


  const handleSearchButton = ()=>{

    
// "searchByFirstName":"roh",
// "pageNo":0,
// "noOfItemsOnPage":40,
// "sortByFields":"customerId"

//setSortingByFields("customerId");

const data = {

  searchByFirstName:searchByFirstName,
  pageNo:pageNo,
  noOfItemsOnPage:pageSize,
  sortByFields:sortingByFields
};

fetch("http://localhost:8966/pagi", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                response.json().then((resp) => {
                  setAllCustomerData(resp.content);
                  setIsFirstPage(resp.first);
                  setIsLastPage(resp.last);
                  setTotalPages(resp.totalPages);
                  setPageable(resp.pageable);
                  setLoading(false);
                    
         
                });
            });

  };


const handleSortByFirstName = () =>{
  

 // setSortingByFields("firstName");
setSearchByFirstName("firstName");



const data2 = {

  searchByFirstName:searchByFirstName,
  pageNo:pageNo,
  noOfItemsOnPage:pageSize,
  sortByFields:"firstName"
};

  fetch("http://localhost:8966/pagi", {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data2),
})
    .then((response) => {
        response.json().then((resp) => {
          setAllCustomerData(resp.content);
          setIsFirstPage(resp.first);
          setIsLastPage(resp.last);
          setTotalPages(resp.totalPages);
          setPageable(resp.pageable);
          setLoading(false);
            
           // const errorMessages = Object.values(resp).join('\n');
        // if(response.ok){
        //     alert('Account Created');
        //     setSearchByFirstName(null);
        // }else{
           
            
        //     alert(`error `);
        // }
        
        
        });
    });

};


const handleBackButton =()=>{

setPageNo(pageNo-1);


};


const handleFrontButton = () => {
setPageNo(pageNo+1);
};





  const handleDownloadExcel = async () => {
    try {
      const response = await fetch(
        'http://localhost:8966/downloadAllCustomersInExcel'
      );
      const blob = await response.blob();

      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'allCustomers.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading Excel file:', error);
    }
  };

  return (
    <div>
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

      {!loading && (
     
      <div className="headButtons flex justify-end">
                <input
                    className='border-none rounded-lg'
                    type="text"
                    placeholder="   🔍 SEARCH HERE "
                    onChange={(e)=> {setSearchByFirstName(e.target.value)}}
                />
                {/* <button className='mx-2'
                onClick={handleSearchButton}
                
                >
                    <SearchIcon />
                    
                </button> */}

                <button
                onClick={handleDownloadExcel}
                    className="bg-green-300 px-2 py-2 rounded-lg font-bold mr-16 ml-2" >
                    Excel <DownloadIcon />
                </button>

            </div>


      )}



      {loading ? (
        <img
          src={require('../img/wg.gif')}
          alt="Loading..."
          style={{ marginLeft: '36%', marginTop: '-1%', width: '30%' }}
        />
      ) : (

        
          pageNo> totalPages ? 
          

          <h1>No Data Found You Excced the Total Page Limits.. Enter Page 
            Number Less then {totalPages} </h1>:
      

        
       

        <div className="tableContainer mx-10 mt-2 mb-4 h-96 overflow-y-auto">
        <table className="table bg-white shadow-md rounded-md">
          <thead className="thead-dark">
            <tr className="sticky top-0 bg-gray-100">
              <th className="py-2 px-4 border-b">Customer Id</th>
              <th className="py-2 px-4 border-b">
                First Name
                <button className="ml-2 transform transition-transform hover:scale-110"
                onClick={handleSortByFirstName}
                
                >
                  <SortByAlphaIcon />
                </button>
                </th>
                <th scope="col">Last Name</th>
                <th scope="col">Email Id</th>
                <th scope="col">Contact No</th>
                <th scope="col">Password</th>
                <th scope="col">Registration Date</th>
                <th scope="col">Address Line-1</th>
                <th scope="col">Address Line-2</th>
                <th scope="col">City</th>
                <th scope="col">State</th>
                <th scope="col">Pincode</th>
                <th scope="col">Gender</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(allCustomerData) && allCustomerData.map((data) => (
                <tr key={data.customerId}>
                  <td>{data.customerId}</td>
                  <td>{data.firstName}</td>
                  <td>{data.lastName}</td>
                  <td>{data.emailId}</td>
                  <td>{data.contactNo}</td>
                  <td>{data.password}</td>
                  <td>{data.registrationDate}</td>
                  <td>{data.addressLine1}</td>
                  <td>{data.adressLine2}</td>
                  <td>{data.city}</td>
                  <td>{data.state}</td>
                  <td>{data.pincode}</td>
                  <td>{data.gender}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    
    
    
      )}
      

   
  



     
<div className='bottomSection flex justify-end'>

<input type="number"
placeholder={`Page No btw 1 to ${totalPages}`}
onChange={(e)=> {setPageNo(e.target.value)}}
max={totalPages}
min={1}
className='w-40'
/>

<span>Page.No:{pageable.pageNumber+1}</span>

<button  className={`backButton ml-2 transform transition-transform hover:scale-110 hover:bg-green-500 ${isFirstPage ? 'cursor-not-allowed opacity-50 filter blur-md' : ''}`}
 onClick={handleBackButton}
disabled={isFirstPage}
>
  <FirstPageIcon/>
</button>

<button className={`forwardButton ml-2 mr-16 transform transition-transform hover:scale-110 hover:bg-green-500 ${isLastPage ? 'cursor-not-allowed opacity-50 filter blur-md' : ''}`}
  onClick={handleFrontButton}
disabled={isLastPage}
>
  <LastPageIcon/>
</button>

</div>


   
  </div>
);
};

export default AllCustomerShowToAdmin;
