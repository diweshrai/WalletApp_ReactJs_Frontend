import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import Dropdown from 'react-dropdown-select';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import Swal from 'sweetalert2';
import SettingsBackupRestoreOutlinedIcon from '@mui/icons-material/SettingsBackupRestoreOutlined';
import PopUpDialoge from './PopUpDialoge';
import PopForUploadBulk from './PopForUploadBulk';
import DownloadIcon from '@mui/icons-material/Download';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { BASE_URL_API } from '../env';
import AdminNavbar from '../Component/AdminNavbar';



const HelpingPage = () => {
    
 // const [loading, setLoading] = useState(false); // State to manage loading state
const [openPopup , setOpenPopUp] = useState(false);
const [rowDataForEdit ,setRowDataForEdit] = useState([]);
const [openBulkUpload ,setOpenBulkUpload] = useState(false);

const sortingColumnName  = {
  'Customer ID':'customerId',
  'First Name':'firstName',
  'Last Name':'lastName',
  'Email':'emailId',
  'Contact No':'contactNo',
  'Registration Date':'registrationDate',
  'Address Line 1':'addressLine1',
  'Address Line 2':'addressLine2',
  'City':'city',
  'State':'state',
  'Pincode':'pincode',
  'Gender':'gender'

};


    const columns = [
        { selector:(row)=>row['customerId'], name: 'Customer ID', width: 100,sortable:true,sortActive: true, },
        { selector:(row)=>row['firstName'], name: 'First Name', width: 100,sortable: true },
        { selector:(row)=>row['lastName'] , name: 'Last Name', width: 100,sortable: true },
        { selector:(row)=>row['emailId'] , name: 'Email', width: 220,sortable: true },
        { selector:(row)=>row['contactNo'] , name: 'Contact No', width: 100 },
        { selector:(row)=>row['registrationDate'] , name: 'Registration Date', width: 180,sortable: true },
        { selector:(row)=>row['addressLine1'] , name: 'Address Line 1', width: 300,sortable: true },
        { selector:(row)=>row['adressLine2'] , name: 'Address Line 2', width: 150,sortable: true },
        { selector:(row)=>row['city'] , name: 'City', width: 120,sortable: true },
        { selector:(row)=>row[ 'state'], name: 'State', width: 120,sortable: true },
        { selector:(row)=>row['pincode'] , name: 'Pincode', width: 100,sortable: true },
        { selector:(row)=>row['gender'] , name: 'Gender', width: 100,sortable: true },
        { 
          selector: 'customerStatus',
          name: 'Customer Status', 
          width: 90, 
          sortable: true,
          cell: (row) => (
            <div style={{ color: row.customerStatus === 'inactive' ? 'red' : 'inherit' }}>
              {row.customerStatus}
            </div>
          )
        },
        {
          name: 'Action',
          width: 250,
          selector: 'Action',
          cell: (row) => (
            <div style={{ display: 'flex', gap: '5px' }}>
            <IconButton onClick={() => handleAction(row, 'edit')}>
              <EditIcon />
              </IconButton>
        {row.customerStatus === 'inactive' ? (
          <IconButton onClick={() => handleAction(row, 'undo')}>
            <SettingsBackupRestoreOutlinedIcon  className="text-green-400"/>
          </IconButton>
        ) : (
          <IconButton onClick={() => handleAction(row, 'delete')}>
            <DeleteIcon  className="text-red-500" />
          </IconButton>
        )}
            <IconButton onClick={() => handleAction(row, 'download')}>
              <CloudDownloadIcon />
            </IconButton>
          </div>
          ),
        }, 
      ];

     

      const dropdownContainerRef = useRef(null);

      const dropdownStyles = {
        control: (provided) => ({
          ...provided,
          width: '100%', // Set the width of the dropdown
        }),
      };
      
      const handleAction =async  (row, action) => {
        switch (action) {
          case 'edit':
            handleEdit(row);
            break;
            case 'undo':
            const undoCustomer = await askUserForReactivateConfirmation ();
            if(undoCustomer){
              await handleUndo(row.customerId);
            }  
           
              break;
              
          case 'delete':
            const shouldDelete = await askUserForDeleteConfirmation();
    if (shouldDelete) {
      await deleteCustomer(row.customerId);
    }
            break;
          case 'download':
            const shouldDownload = await askUserForDownloadConfirmation();
            if (shouldDownload) {
              await handleDownloadPDF(row);
            }
            break;
          default:
            // Handle other cases if needed
        }
      };

      const askUserForReactivateConfirmation = async () => {
        const result = await Swal.fire({
          title: 'Reactivate User?',
          text: 'This action will reactivate the user!',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Yes, reactivate it!',
          cancelButtonText: 'No, keep it inactive',
        });
      
        return result.isConfirmed;
      };


      const askUserForDeleteConfirmation = async () => {
        const result = await Swal.fire({
          title: 'Are you sure?',
          text: 'This action cannot be undone!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, keep it',
          customClass: {
            confirmButton: 'bg-red-500 text-white !important',
          },
        });
    
        return result.isConfirmed;
      };

      const askUserForDownloadConfirmation = async () => {
        const result = await Swal.fire({
          title: 'Download PDF?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
        });
    
        return result.isConfirmed;
      };


      const handleEdit = (row) => {
        setRowDataForEdit(row);
        setOpenPopUp(true);
        // Implement the edit functionality here
        console.log('Edit clicked for row:', row);
      };
    
      const handleUndo = async (customerId) => {
        try {
          // Make the API request using Axios
          const response = await axios.post(
            `${BASE_URL_API}/admin/api/activateCustomerStatusActive/${customerId}`,
            null,
            {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              }
            }
          );
      
          // Handle the response as needed
          if (response.status === 200) {
            console.log('Customer reactivated:', response.data);
            fetchData();
          }
        } catch (error) {
          if (axios.isAxiosError(error) && error.response && error.response.status === 403) {
            // Handle 403 Forbidden error
            alert('Token expired. Please log in again.');
            localStorage.removeItem('token'); // Remove token on 403 error
            localStorage.removeItem('userId');
            window.location.href = '/AdminLoginPage'; // Replace '/login' with the actual login page URL
          } else {
            console.error('Error reactivating customer:', error);
          }
        }
      };


      const deleteCustomer = async (customerId) => {
        try {
          // Make the API request using Axios
          const response = await axios.delete(`http://localhost:8966/admin/api/deleteCustomer/${customerId}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
      
          // Handle the response as needed
          if (response.status === 200) {
            console.log('Customer deleted:', response.data);
            // Refresh the data or perform any other actions after deletion
            fetchData(); // Assuming fetchData is a function to fetch data again
          }
        } catch (error) {
          if (axios.isAxiosError(error) && error.response && error.response.status === 403) {
            // Handle 403 Forbidden error
            alert('Token expired. Please log in again.');
            localStorage.removeItem('token'); // Remove token on 403 error
            localStorage.removeItem('userId');
            window.location.href = '/login'; // Replace '/login' with the actual login page URL
          } else {
            console.error('Error deleting customer:', error);
          }
        }
      };
    
      const handleDownloadPDF = async (row) => {
        try {
          // Make the API request using Axios
          const response = await axios.get(
            `http://localhost:8966/admin/api/downloadCustomerDetailInPdfByCustomerId/${row.customerId}`,
            { responseType: 'arraybuffer', headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
          );
      
          // Create a Blob from the response data
          const blob = new Blob([response.data], { type: 'application/pdf' });
      
          // Create a download link and trigger a click event
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = 'customer_details.pdf';
          link.click();
        } catch (error) {
          if (axios.isAxiosError(error) && error.response && error.response.status === 403) {
            // Handle 403 Forbidden error
            alert('Token expired. Please log in again.');
            localStorage.removeItem('token'); // Remove token on 403 error
            localStorage.removeItem('userId');
            window.location.href = '/login'; // Replace '/login' with the actual login page URL
          } else {
            console.error('Error downloading PDF:', error);
          }
        }
        console.log('Download PDF clicked for row:', row);
      };


const bulkUploadCustomer = () =>{
setOpenBulkUpload(true);
};

const handleDownloadExcel = async () => {
  try {
    const response = await axios.get(
      'http://localhost:8966/admin/api/downloadAllCustomersInExcel',
      {
        responseType: 'blob',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
    );

    const blob = response.data;

    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'allCustomers.xlsx');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response && error.response.status === 403) {
      // Handle 403 Forbidden error
      alert('Token expired. Please log in again.');
      localStorage.removeItem('token'); // Remove token on 403 error
      localStorage.removeItem('userId');
      window.location.href = '/login'; // Replace '/login' with the actual login page URL
    } else {
      console.error('Error downloading Excel file:', error);
    }
  }
};



     
        const [data, setData] = useState([]);
        const [totalPages, setTotalPages] = useState(0);
        const [offSet, setOffSet] = useState(1);
        const [limit , setLimit] = useState(5);
        const [totalElements , setTotalElements] = useState(0);
        const [sortedType , setSortedType] = useState("asc");
        const  [ sortByName ,setSortByName] = useState("customerId");
        const [searchByName , setSearchByName] = useState("");





        const handlePageChange = (pageData) =>{
          setOffSet(pageData);
        };

        useEffect(() => {
          setData();
            fetchData();

          }, [offSet, limit, sortedType, sortByName,searchByName]); // Add dependencies if necessary
            
          const handleItemsPerPageChange=(newSize, page)=>{
            setLimit(newSize)
            setOffSet(page)
          }
          useEffect(() => {
            fetchData();
          }, []); // Add dependencies if necessary
        
          const handleSort = (column, sortDirection) => {
             setSortByName(sortingColumnName[column.name])
            console.log(sortDirection , column.name)
             setSortedType(sortDirection)
          }    

          const fetchData = () => {
            const firstData = {
              searchByFieldName: searchByName,
              offSet: offSet === 1 ? 0 : offSet - 1,
              limit: limit,
              sortedType: sortedType,
              sortByFieldName: sortByName,
            };
          
            axios.post('http://localhost:8966/admin/api/pagination', firstData, {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              },
            })
              .then(response => {
                if (response?.data?.data && response?.data?.data?.length > 0) {
                  const rowsWithId = response.data.data.map((row, index) => ({
                    ...row
                  }));
          
                  setData(rowsWithId);
                  setTotalPages(response.data.totalPages);
                  setTotalElements(response.data.totalElements);
                  console.log(rowsWithId);
                  console.log(totalElements + " elements " + totalPages);
                }
              })
              .catch(err => {
                if (axios.isAxiosError(err) && err.response && err.response.status === 403) {
                  // Handle 403 Forbidden error
                  console.log("error mess"+err.message);
                  console.log("error mess"+err.response.message);
                  console.log("error mess"+err.response);
                  alert('Token expired. Please log in again.');
                  localStorage.removeItem('token'); // Remove token on 403 error
                  localStorage.removeItem('userId');
                  window.location.href = '/AdminLoginPage'; // Replace '/login' with the actual login page URL
                } else {
                  console.error(err);
                }
              });
          };
    
    
    return (
<div>
<AdminNavbar/>

      <div className="searchButton flex justify-end mt-5">
        <input
          className='rounded-lg mt-2 hover:bg-slate-200 pl-2'
          type="text"
          placeholder=" 🔍 SEARCH HERE "
          onChange={(e) => setSearchByName(e.target.value)}
        />


<button
                onClick={handleDownloadExcel}
                    className="bg-green-300 px-2 py-2 rounded-lg font-bold mr-2 ml-2" 
                    style={{background:'#dc9ee1'}}>
                    Excel <DownloadIcon />
                </button>


                <button
                onClick={bulkUploadCustomer}

                    className=" px-2 py-2 rounded-lg font-bold mr-16 "
                    style={{background:'#dc9ee1'}}
                    >
                    Excel <UploadFileIcon />
                </button>

      </div>

      <div className='mt-1 ml-3 mr-3' style={{ height: 400, width: '96%' }}>
        <DataTable
          title="Customers Data"
          columns={columns}
          data={data}
          pagination
          highlightOnHover
          paginationServer
          striped
          paginationPerPage={limit}
          paginationRowsPerPageOptions={[5, 10, 20, 30]}
          paginationTotalRows={totalElements}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleItemsPerPageChange}
          onSort={handleSort}
          
        />
      </div>

      <PopUpDialoge 
      
      openPopup={openPopup}
      setOpenPopUp ={setOpenPopUp}
      rowDataForEdit={rowDataForEdit}
      fetchData={fetchData}
      />

<PopForUploadBulk
openBulkUpload={openBulkUpload}
setOpenBulkUpload={setOpenBulkUpload}
/>


    </div>
  );
};
export default HelpingPage;
