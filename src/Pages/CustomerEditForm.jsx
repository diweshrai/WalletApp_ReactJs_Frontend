import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';
import PhoneInput from 'react-phone-number-input';

import 'react-phone-number-input/style.css';

const CustomerEditForm = (props) => {
  const { rowData, setOpenPopUp, fetchData } = props;
  const { handleSubmit, control, register, formState: { errors } } = useForm();
  // isShowAddressLine2
  const [ isShowAddressLine2, setIsShowAddressLine2 ] = useState(false);

  const addAddressLine2 = (value) =>{ 
      setIsShowAddressLine2(value)
    }

  const onSubmit = async (data) => {
    // Combine existing rowData with updated form data
    const updatedData = { ...rowData, ...data };
    if (updatedData?.contactNo && updatedData?.contactNo.startsWith("+91")) {
      updatedData.contactNo = updatedData?.contactNo.slice(3);
    }

    console.log(updatedData);
    // Show a confirmation dialog
    const confirmResult = await Swal.fire({
      title: 'Are you sure?',
      text: 'You want to update this customer information?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!',
    });

    if (confirmResult.isConfirmed) {
      try {
        // Make API request to update customer details using Axios
        const response = await axios.post('http://localhost:8966/admin/api/editCustomerDetailsByAdmin', updatedData, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
    
        // Handle success, show success message
        Swal.fire({
          title: 'Success',
          text: 'Customer details updated successfully',
          icon: 'success',
          zIndex: 99999, // Set a higher z-index to bring it in front of Dialog
        });
    
        // Close the popup
        setOpenPopUp(false);
    
        // Fetch updated data
        fetchData();
      } catch (error) {
        // Handle error, show error message
        if (axios.isAxiosError(error) && error.response && error.response.status === 403) {
          // Handle 403 Forbidden error
          alert('Token expired. Please log in again.');
          localStorage.removeItem('toke'); // Remove token on 403 error
          localStorage.removeItem('userId');
          window.location.href = '/AdminLoginPage'; // Replace '/login' with the actual login page URL
        } else {
          console.error('Error updating customer details:', error);
          Swal.fire({
            title: 'Error',
            text: 'Failed to update customer details',
            icon: 'error',
            zIndex: 99999, // Set a higher z-index to bring it in front of Dialog
          });
        }
      }
    } else {
      // User clicked Cancel, handle accordingly (optional)
      Swal.fire({
        title: 'Cancelled',
        text: 'Update operation cancelled',
        icon: 'info',
        zIndex: 99999, // Set a higher z-index to bring it in front of Dialog
      });
    }
  }

  return (
    <div className="containerreg" style={{ marginLeft: '10%', marginRight: '10%', marginTop: '5%', marginBottom: '10%' }}>
      <h1 id="regtextpage" style={{ display: "flex", justifyContent: "center", fontSize: "7vh", fontWeight: "bolder", fontFamily: "emoji" }}>Edit Customer.</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
         <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Edit Customer</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Enter Your Correct Details here...</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">First name <span className="text-red-500">*</span></label>
              <div className="mt-2">
                <Controller
                  name="firstName"
                  control={control}
                  defaultValue={rowData.firstName}
                  rules={{
                    required: 'This field is required',
                    minLength: {
                      value: 1,
                      message: 'Minimum length is 6 characters',
                    },
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  )}
                />
              </div>
              {errors.firstName && (
    <span className="text-red-500 text-sm">{errors.firstName.message}</span>
  )}
            </div>
       



            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">Last name</label>
              <div className="mt-2">
                <Controller
                  name="lastName"
                  control={control}
                  defaultValue={rowData.lastName}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  )}
                />
              </div>
            </div>

            <div className="sm:col-span-8">
  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
    Email address <span className="text-red-500">*</span>
  </label>
  <div className="mt-2">
    <Controller
      name="email"
      control={control}
      defaultValue={rowData.emailId}
      rules={{
        required: 'This field is required',
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          message: 'Invalid email address',
        },
      }}
      render={({ field }) => (
        <>
          <input
            {...field}
            type="email"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </>
      )}
    />
  </div>
</div>


<div className="sm:col-span-8">
  <label htmlFor="contact-number" className="block text-sm font-medium leading-6 text-gray-900">
    Contact Number <span className="text-red-500">*</span>
  </label>
  <div className="mt-2">
    <Controller
      name="contactNo"
      control={control}
      defaultValue={rowData.contactNo}
      rules={{
        required: 'This field is required',
      }}
      render={({ field }) => (
        <>
         <PhoneInput
            country="IN"
            {...field}
            onChange={(value) => field.onChange(value)}
            onBlur={(e) => field.onBlur(e)}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={rowData.contactNo ? String(rowData.contactNo) : ''}
          />

          {errors.contactNumber && (
            <span className="text-red-500 text-sm">{errors.contactNumber.message}</span>
          )}
        </>
      )}
    />
  </div>
</div>

            <div className="sm:col-span-8">
  <label htmlFor="gender" className="block text-sm font-medium leading-6 text-gray-900">Gender <span className="text-red-500">*</span></label>
  <div className="mt-2">
    <div className="flex items-center">
      <input
        type="radio"
        id="male"
        value="male"
        className="mr-1"
        {...register("gender", { required: 'Please select a gender' })}
        defaultChecked={rowData.gender.toLowerCase() === 'male'}
      />
      <label htmlFor="male" className="text-sm">
        Male
      </label>
    </div>

    <div className="flex items-center">
      <input
        type="radio"
        id="female"
        value="female"
        className="mr-1"
        {...register("gender", { required: 'Please select a gender' })}
        defaultChecked={rowData.gender.toLowerCase() === 'female'}
      />
      <label htmlFor="female" className="text-sm">
        Female
      </label>
    </div>
  </div>
  {errors.gender && (
    <span className="text-red-500 text-sm">{errors.gender.message}</span>
  )}
</div>

<div className="col-span-full">
  <label htmlFor="address1" className="block text-sm font-medium leading-6 text-gray-900">
    Address Line-1 <span className="text-red-500">*</span>
  </label>
  <div className="mt-2">
    <Controller
      name="address1"
      control={control}
      defaultValue={rowData.addressLine1}
      rules={{
        required: 'This field is required',
      }}
      render={({ field }) => (
        <>
          <input
            {...field}
            type="text"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          {errors.address1 && (
            <span className="text-red-500 text-sm">{errors.address1.message}</span>
          )}
        </>
      )}
    />
  </div>
</div>

<br/>
              {/* { !isShowAddressLine2 &&
                <div>
                <button onClick={() => addAddressLine2(true)} type='button'> Add AdressLine 2</button>
              </div>}
              { isShowAddressLine2 
              && */}
            <div className="col-span-full">
              <label htmlFor="address2" className="block text-sm font-medium leading-6 text-gray-900">Address Line-2</label>
              <div className="mt-2">
                <Controller
                  name="adressLine2"
                  control={control}
                  defaultValue={rowData.adressLine2}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  )}
                />
              </div>
            </div>
                {/* } */}

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">City <span className="text-red-500">*</span></label>
              <div className="mt-2">
                <Controller
                  name="city"
                  control={control}
                  defaultValue={rowData.city}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  )}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">State / Province <span className="text-red-500">*</span></label>
              <div className="mt-2">
                <Controller
                  name="state"
                  control={control}
                  defaultValue={rowData.state}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  )}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="zipcode" className="block text-sm font-medium leading-6 text-gray-900">ZIP / Postal code <span className="text-red-500">*</span></label>
              <div className="mt-2">
              <Controller
            name="zipcode"
            control={control}
            defaultValue={rowData.pincode}
            rules={{
              required: 'This field is required',
            }}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  type="number"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                
                />
                {errors.zipcode && (
                  <span className="text-red-500 text-sm">{errors.zipcode.message}</span>
                )}
              </>
            )}
          />
        </div>
      </div>
          </div>
        </div>



        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Submit
        </button>
      </form>
    </div>



  )
}

export default CustomerEditForm
