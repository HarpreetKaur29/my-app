import React, { useEffect, useState } from 'react'
import { Formik } from 'formik';
import * as Yup from 'yup';



const initialValues = {
  name : '',
  age :  0,
  email :  '',
  gender :  '',
  id : Math.random()
}



const formSchema = Yup.object().shape({
    name : Yup.string().min(4, 'Name must be of 4 characters.').required('Name is required.'),
    email : Yup.string().email('Please enter valid email address.').required(),
    age : Yup.number().required(' Please enter valid age'),
    gender : Yup.number().required('Gender is required')
})



const Modal = ({isModalOpen, setIsModalOpen, selectedUser, userData, setUsers}) => {
  const [userDetails, setUserDetails] = useState(initialValues);

  const handleCustomChange = (e)=>{
    setUserDetails({...userDetails, [e.target.name] : e.target.value})
  }

  useEffect(()=>{
    setUserDetails({
      name : selectedUser.first_name,
      email  :selectedUser.email,
      age : selectedUser.age || 0,
      gender : selectedUser.gender,
      id : selectedUser.id
    })
    console.log('this')
  },[selectedUser])


  const handleCustomSubmit = (e)=>{
    e.preventDefault();
    const newArray = [...userData];
    const index = userData.findIndex(each => each.id === selectedUser.id)
    console.log({index})
    const oldObject = {...newArray[index]};
    
    const newObject = {...oldObject, ...userDetails};
      console.log({newObject})
    newArray[index] = newObject;

    console.log({newArray})

    setUsers(newArray)
  }

  return (
    <>
      <div className={`fixed flex flex-col  bg-gray-500 bg-opacity-70  w-screen h-screen justify-center items-center ${isModalOpen ? "block" : 'hidden'}`}>
       <div className="form_card w-[40vw] bg-white p-5 rounded-md shadow-md">
    <div className="form__card__header text-right text-2xl font-bold mb-4" onClick={()=> setIsModalOpen(false)}>
        X
    </div>
     <Formik
       initialValues={userDetails}
       validationSchema={formSchema}
    
     >
       {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
       }) => (
         <form onSubmit={handleCustomSubmit} className='flex flex-col gap-5'>
           <label htmlFor='name' className='text-xl'>
            Name
            <input
             type="name"
             id="name"
             name="name"
             onChange={handleCustomChange}
             onBlur={handleBlur}
             value={ userDetails.name || values.name}
             className='w-full border-gray-300 border p-2 text-xl rounded-sm'
           /></label>
           <label htmlFor='email ' className='text-xl'>
            Email
            <input
             type="email"
             name="email"
             id="email"
             onChange={handleCustomChange}
             onBlur={handleBlur}
             className='w-full border-gray-300 border p-2 text-xl rounded-sm'
             value={userDetails.email || values.email}
           /></label>
           <label htmlFor="age" className='text-xl'>Age<input
             type="age"
             name="age"
             id="age"
             onChange={handleCustomChange}
             onBlur={handleBlur}
             className='w-full border-gray-300 border p-2 text-xl rounded-sm'
             value={ userDetails.age || values.age}
           /></label>
          <label htmlFor="gender" className='text-xl'>Gender <input
             type="gender"
             id="gender"
             name="gender"
             onChange={handleCustomChange}
             onBlur={handleBlur}
             className='w-full border-gray-300 border p-2 text-xl rounded-sm'
             value={userDetails.gender || values.gender}
           /></label>
           <button type="submit" disabled={isSubmitting} className='w-full py-3 text-xl font-bold bg-blue-600 rounded-md text-white'>
             Submit
           </button>
         </form>
       )}
     </Formik>
       </div>
    
   </div>
    </>
  )
}

export default Modal
