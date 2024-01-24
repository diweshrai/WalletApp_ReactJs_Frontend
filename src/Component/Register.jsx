import React, { useState } from 'react';

import './reg.css';
import LoginNavbar from './LoginNavbar';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    // Current date for registration
    const navigate = useNavigate();
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is 0-based, so add 1
    const day = String(currentDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [contactnumber, setContactnumber] = useState('');
    const [gender, setGender] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpass, setConfirmpass] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [terms, setTerms] = useState(false);
    const [date, setDate] = useState(formattedDate);

    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const handlePasswordChange = (e) => {
        const passwordValue = e.target.value;
        setPassword(passwordValue);

        // Check if passwords match
        setPasswordsMatch(passwordValue === confirmpass);
    };

    const handleConfirmPasswordChange = (e) => {
        const confirmPasswordValue = e.target.value;
        setConfirmpass(confirmPasswordValue);

        // Check if passwords match
        setPasswordsMatch(password === confirmPasswordValue);
    };

    const Registerbutton = () => {
        const regData = {
            firstName: firstname,
            lastName: lastname,
            emailId: email,
            contactNo: contactnumber,
            password: password,
            registrationDate: date,
            addressLine1: address1,
            adressLine2: address2,
            city: city,
            state: state,
            pincode: zipcode,
            gender: gender
        };

        fetch('http://localhost:8966/addCust', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(regData),
        })
            .then((response) => {
                response.json().then((resp) => {
                    console.log(resp);
                    const errorMessages = Object.values(resp).join('\n');
                if(response.ok){
                    alert('done with registration');
                    navigate('/login')
                }else{
                   
                    
                    alert(`error ${errorMessages}`);
                }
                
                
                });
            });
    };


    return (
<div>

    <LoginNavbar/>



        <div   className='containerreg'  style={{marginLeft:"10%", marginRight:"10%", marginTop:"5%" , marginBottom:"10%" }}>




            
            <h1  id="regtextpage" style={{display:"flex", justifyContent:"center",fontSize:"7vh",
        fontWeight:"bolder", fontFamily:"emoji"
         }} >REGISTRATION FORM </h1>
             
             <br/>
             <br/>             
                <div class="space-y-12">

                    <div class="border-b border-gray-900/10 pb-12">
                        <h2 class="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                        <p class="mt-1 text-sm leading-6 text-gray-600">Enter Your Correct Details here...</p>

                        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div class="sm:col-span-3">
                                <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">First name</label>
                                <div class="mt-2">
                                    <input type="text" name="first-name" id="first-name"
                                        autocomplete="given-name" class="block w-full rounded-md 
            border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
             ring-gray-300 placeholder:text-gray-400 focus:ring-2 
             focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"   
                                onChange={(e)=>{setFirstname(e.target.value)}}  />
                                </div>
                            </div>

                            <div class="sm:col-span-3">
                                <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Last name</label>
                                <div class="mt-2">
                                    <input type="text" name="last-name" id="last-name"
                                         class="block w-full
             rounded-md border-0 py-1.5 text-gray-900 shadow-sm
              ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
               focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
               
               onChange={(e)=>{setLastname(e.target.value)}} 
               />
                                </div>
                            </div>

                            <div class="sm:col-span-3">
                                <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                                <div class="mt-2">
                                    <input id="email" name="email" type="email"
                                        autocomplete="email" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
             focus:ring-indigo-600 sm:text-sm sm:leading-6"
             onChange={(e)=>{setEmail(e.target.value)}} 
             />
                                </div>
                            </div>

                            <div class="sm:col-span-3">
                                <label for="Contactno" class="block text-sm font-medium leading-6 text-gray-900">Contact Number</label>
                                <div class="mt-2">
                                    <input id="email" name="contactnumber" type="number"
                                         class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
             focus:ring-indigo-600 sm:text-sm sm:leading-6"
             onChange={(e)=>{setContactnumber(e.target.value)}} 
             
             />
                                </div>
                            </div>

                            <div class="sm:col-span-8">
                                <label for="country" class="block text-sm font-medium leading-6 text-gray-900">Gender</label>
                                <div class="mt-2">
                                    <select id="country" name="gender" autocomplete="gender" 
                                    onChange={(e)=>{setGender(e.target.value)}} 
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Others</option>



                                    </select>
                                </div>
                            </div>


                            <div class="sm:col-span-3">
                                <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                <div class="mt-2">
                                    <input id="password" name="password" type="password"
                                         class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
             focus:ring-indigo-600 sm:text-sm sm:leading-6"  
             onChange={handlePasswordChange} 
            
             />
                                </div>
                            </div>



                            <div class="sm:col-span-3">
                                <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
                                <div class="mt-2">
                                    <input id="password" name="confirmpassword" type="password"
                                         class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
             focus:ring-indigo-600 sm:text-sm sm:leading-6"
             onChange={handleConfirmPasswordChange} 
             
             />
             {passwordsMatch ? null : <p className="text-red-500">Passwords do not match</p>}

                                </div>
                            </div>

                            
                         


                            
                            <div class="col-span-full">
                                <label for="street-address" class="block text-sm font-medium leading-6 text-gray-900">Address Line-1</label>
                                <div class="mt-2">
                                    <input type="text" name="address1" id="street-address"
                                        autocomplete="street-address" class="block w-full rounded-md 
             border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset 
             ring-gray-300 placeholder:text-gray-400 focus:ring-2 
             focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
             onChange={(e)=>{setAddress1(e.target.value)}} 
             
             />
                                </div>
                            </div>


                            <div class="col-span-full">
                                <label for="street-address" class="block text-sm font-medium leading-6 text-gray-900">Address Line-2</label>
                                <div class="mt-2">
                                    <input type="text" name="address2" id="street-address"
                                        autocomplete="street-address" class="block w-full rounded-md 
             border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset 
             ring-gray-300 placeholder:text-gray-400 focus:ring-2 
             focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
             onChange={(e)=>{setAddress2(e.target.value)}} 
             
             />
                                </div>
                            </div>


                            <div class="sm:col-span-2 sm:col-start-1">
                                <label for="city" class="block text-sm font-medium leading-6 text-gray-900">City</label>
                                <div class="mt-2">
                                    <input type="text" name="city" id="city" autocomplete="address-level2"
                                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm 
            ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
            focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={(e)=>{setCity(e.target.value)}} 
            
            />
                                </div>
                            </div>

                            <div class="sm:col-span-2">
                                <label for="region" class="block text-sm font-medium leading-6 text-gray-900">State / Province</label>
                                <div class="mt-2">
                                    <input type="text" name="region" id="region"
                                        autocomplete="address-level1" class="block w-full 
            rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset 
            ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
            focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={(e)=>{setState(e.target.value)}} 
            
            />
                                </div>
                            </div>

                            <div class="sm:col-span-2">
                                <label for="postal-code" class="block text-sm font-medium leading-6 text-gray-900">ZIP / Postal code</label>
                                <div class="mt-2">
                                    <input type="text" name="postal-code" id="postal-code"
                                        autocomplete="postal-code" class="block w-full rounded-md 
            border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset 
            ring-gray-300 placeholder:text-gray-400 focus:ring-2 
            focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={(e)=>{setZipcode(e.target.value)}} 
            />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="border-b border-gray-900/10 pb-12">
                        <h2 class="text-base font-semibold leading-7 text-gray-900">Terms And Condition</h2>
                        <p class="mt-1 text-sm leading-6 text-gray-600">Accept all the terms and condtions then only you can REGISTER.</p>
                        

                        <br/> 
                        
                        <div class="relative flex gap-x-3"> 

                        
                                        <div class="flex h-6 items-center">
                                            <input id="comments" name="comments" type="checkbox" 
                                            class="h-4 w-4 rounded border-gray-300 text-indigo-600 
                                            focus:ring-indigo-600"
                                            
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                  setTerms(true);
                                                } else {
                                                  setTerms(false);
                                                }
                                              }}
                                            />
                                        </div>

                                        <div class="text-sm leading-6">
                                            <label for="comments" class="font-medium text-gray-900">Accepted</label>
                                            
                                        </div>
                                    </div>
                        </div>
                       </div>
                   
              
              {    terms&&(   
                <div class="mt-6 flex items-center ">
                    
                    <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 
                    text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 
                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
                    focus-visible:outline-indigo-600" onClick={Registerbutton}>Register Now</button>
                </div>

    )    
                };   

            
</div>
        </div>
    )
}

export default Register
