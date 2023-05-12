import React from 'react';
import userData from '../Data/data.json';
import UserChart from '../Components/UserChart';

const ChartScreen = () => {
  return (
    <div className='h-screen w-screen bg-gray-600'>
    <p className=' font-bold text-center mb-5' style={{fontSize : '4rem', textAlign : 'center'}}>User Data Charts</p>
    <UserChart users={userData} />
  </div>
  )
}

export default ChartScreen
