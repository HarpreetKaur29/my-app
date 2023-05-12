import React, { useState } from 'react'
import { useTable } from 'react-table';
import UserData from '../Data/data.json'
import Modal from '../Components/Modal';
import { Link } from 'react-router-dom';


 const TableScreen =()=> {

  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState(UserData)


   const data = users.map((each)=>{
      return {
        col1 : each.first_name,
        col2 : each.email,
        col3 : each.age || 'NA',
        col4 : each.gender,
        col5 :  <button onClick={()=>{setIsModalOpen(true); setSelectedUser(each)}} className='px-4 py-2 bg-white rounded-md text-xl cursor-pointer' >Edit</button>
      }
     })
 
   const columns  = React.useMemo(
     () => [
       {
         Header: 'Name',
         accessor: 'col1', 
       },
       {
         Header: 'Email',
         accessor: 'col2',
       },
       {
        Header: 'Age',
        accessor: 'col3', 
      },
      {
        Header: 'Gender',
        accessor: 'col4',
      },
      {
        Header: 'Action',
        accessor: 'col5',
      },
     ],
     []
   )
 
   const {
     getTableProps,
     getTableBodyProps,
     headerGroups,
     rows,
     prepareRow,
   } = useTable({ columns, data })

 
   return ( <>
   {selectedUser && <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} selectedUser={selectedUser} userData={users} setUsers={setUsers} />}
   <div className='flex justify-center flex-col gap-4 pt-4 p-6'>
    <div className="header flex justify-between">
    <p className='text-3xl font-bold'>Users Data Table</p>
<Link to='/chart'className='px-5 py-2 rounded-md bg-blue-600 text-white font-bold'>Go to Charts</Link>
    </div>
     <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
       <thead>
         {headerGroups.map(headerGroup => (
           <tr {...headerGroup.getHeaderGroupProps()}>
             {headerGroup.headers.map(column => (
               <th
                 {...column.getHeaderProps()}
                 style={{
                   borderBottom: 'solid 3px red',
                   padding : '1rem 0',
                   background: 'aliceblue',
                   color: 'black',
                   fontWeight: 'bold',
                 }}
               >
                 {column.render('Header')}
               </th>
             ))}
           </tr>
         ))}
       </thead>
       <tbody {...getTableBodyProps()}>
         {rows.map(row => {
           prepareRow(row)
           return (
             <tr {...row.getRowProps()}>
               {row.cells.map(cell => {
                 return (
                   <td
                     {...cell.getCellProps()}
                     style={{
                       padding: '10px',
                       border: 'solid 1px gray',
                       background: '#bde0fe',
                     }}
                   >
                     {cell.render('Cell')}
                   </td>
                 )
               })}
             </tr>
           )
         })}
       </tbody>
     </table>
     </div>
     </>
   )
 }


 export default TableScreen