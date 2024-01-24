import React from 'react'
import { Link } from 'react-router-dom';

const LoginNavbar = () => {
    const handleLogout = () => {
        // Clear the username from localStorage
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        localStorage.removeItem('adminId');
        localStorage.removeItem('adminName');
        // Redirect to the login page
        // navigate('/login');
      };
  
  
  
    return (
    <nav class="bg-gray-800">
  <div class="mx-auto ">
    <div class="h-16  "  style={{display:'flex' , justifyContent:'left' , alignItems:'center'}}>
     
    <Link to="/home"   style={{color:'white', 
   
  fontSize:'x-large', fontWeight:'700', fontFamily:'cursive'
  ,textDecoration: 'none'
  }}              >Wallet App</Link>
    
            <Link to="/register"      
            style={{marginLeft:'22px', color:'white', 
          fontWeight:'600', fontSize:'2vh' , textDecoration: 'none'
          
          }}
            
            
    >Register</Link>
            
            
            <Link to="/login"   style={{marginLeft:'22px', color:'white', 
          fontWeight:'600', fontSize:'2vh', textDecoration: 'none'
          
          }}>Login</Link>
            
            <Link to="/adminLogin"   style={{marginLeft:'22px', color:'white', 
          fontWeight:'600', fontSize:'2vh', textDecoration: 'none'
          
          }}>Admin Login</Link>
            
            {/* <button onClick={handleLogout}  style={{marginLeft:'22px', color:'white', 
          fontWeight:'600', fontSize:'2vh', textDecoration: 'none'
          
          }}>LogOut</button> */}
         
     
    </div>
  </div>

   {/* <div class="hidden sm:ml-6 sm:block">
          <div class="flex space-x-4">
            <Link to="/home" class="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">Dashboard</Link>
            <Link to="/home" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Home Page</Link>
            <Link to="/createAccount" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Create Account</Link>
            <Link to="/login" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Login</Link>
            <button onClick={handleLogout} class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">LogOut</button>
          </div>
        </div> */}
  
</nav>

  )
}

export default LoginNavbar
