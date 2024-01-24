
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';

import Register from './Component/Register';
import HomePage from './Component/HomePage';
import AllAccounts from './Pages/AllAccounts';
import CreateAccount from './Pages/CreateAccount';
import Deposite from './Pages/Deposite';
import FundTransfer from './Pages/FundTransfer';
import Statement from './Pages/Statement';
import Widhraw from './Pages/Widhraw';
import LoginPage from './Component/LoginPage';
import { useEffect } from 'react';
import AllState from './Pages/AllState';
import Facts from './Pages/Facts';
import UploadDoc from './Pages/UploadDoc';
import ShowDocuments from './Pages/ShowDocuments';
import AdminLoginPage from './Component/AdminLoginPage';
import AdminHomePage from './Component/AdminHomePage';
import AllCustomerShowToAdmin from './Pages/AllCustomerShowToAdmin';
import BulkCustomersUpload from './Pages/BulkCustomersUpload';
import HelpingPage from './Pages/HelpingPage';
import CustomerEditForm from './Pages/CustomerEditForm';
import AdminNavbar from './Component/AdminNavbar';

function App() {
  
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token && window.location.pathname !== '/register' && window.location.pathname !== '/adminLogin') {
      // Redirect to the login page if the token is not available
      navigate('/login', { replace: true });
    }
  }, [token, navigate]);
  
  
  
  
  return (
<>
<Routes>


<Route path= "/login" element={<LoginPage/>}   / >
<Route path= "/register" element={<Register/>}   / >
<Route path= "/adminLogin" element={<AdminLoginPage/>}   / >

{token ? (
          <>

<Route path= "/home" element={<HomePage />}   / >
<Route path= "/allAccount" element={<AllAccounts />}   / >
<Route path= "/createAccount" element={<CreateAccount />}   / >
<Route path= "/deposite" element={<Deposite />}   / >
<Route path= "/fundTransfer" element={<FundTransfer />}   / >
<Route path= "/statement" element={<Statement />}   / >
<Route path= "/widhraw" element={<Widhraw />}   / >
<Route path= "/allstate" element={<AllState />}   / >
<Route path= "/facts" element={<Facts />}   / >
<Route path= "/uploadDoc" element={<UploadDoc />}   / >
<Route path= "/showDoc" element={<ShowDocuments />}   / >
<Route path= "/adminHomePage" element={<AdminHomePage />}   / >
<Route path= "/allCustomerShowToAdmin" element={<AllCustomerShowToAdmin />}   / >
<Route path= "/bulkCustomerUpload" element={<BulkCustomersUpload />}   / >
<Route path= "/help" element={<HelpingPage />}   / >
<Route path= "/customerEditForm" element={<CustomerEditForm />}   / > 
<Route path= "/adminNavbar" element={<AdminNavbar />}   / > 
</>
        ) : null}


</Routes>


</>


   );
}

export default App;
