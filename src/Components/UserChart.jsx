import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart , CategoryScale, LinearScale} from 'chart.js/auto';

Chart.register(
    CategoryScale,LinearScale
)


const filterUserData = (users) => {
    const filteredUsers = users.filter(
      (user) => new Date().getFullYear() - new Date(user.dob).getFullYear() > 30
    );
    const maleCount = filteredUsers.filter(
      (user) => user.gender === 'Male'
    ).length;
    const femaleCount = filteredUsers.filter(
      (user) => user.gender === 'Female'
    ).length;
    return {
      labels: ['Male', 'Female'],
      datasets: [
        {
          label: 'Users over 30 years old by Gender',
          data: [maleCount, femaleCount],
          backgroundColor: ['#36A2EB', '#FF6384'],
        },
      ],
    };
  };
  
  const countUsersByCountry = (users) => {
    const countryCount = {};
    users.forEach((user) => {
      if (countryCount[user.country]) {
        countryCount[user.country]++;
      } else {
        countryCount[user.country] = 1;
      }
    });
    return {
      labels: Object.keys(countryCount),
      datasets: [
        {
          label: 'Users by Country',
          data: Object.values(countryCount),
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#33FFCC',
            '#99FF99',
            '#FF99CC',
            '#CCFF33',
          ],
        },
      ],
    };
  };
  


const UserChart = ({ users }) => {
    const genderData = filterUserData(users);
    const countryData = countUsersByCountry(users);
  
    return (
      <div className='w-screen flex justify-around mt-4'>
        <div className='w-[30%]'>
        <h2 className='text-3xl font-bold mb-4'>Users over 30 years old by Gender</h2>
        <Pie data={genderData} />
        </div>
        <div className='w-1/2'>

        <h2 className='text-3xl font-bold mb-4'>Users by Country</h2>
        <Bar data={countryData} />
        </div>
      </div>
    );
  };
  
  export default UserChart;
  