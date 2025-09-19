import React from 'react'
import { useState,useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { Link } from 'react-router-dom'
import { columns } from '../../utils/EmployeeHelper'
import axios from 'axios'
import { EmployeeButtons } from '../../utils/EmployeeHelper'

const List = () => {
    const [employees, setEmployees] = useState([])
    const [empLoading, setEmpLoading] = useState(false)
    const [filteredEmployee, setFilteredEmployees] = useState([])

      useEffect(() => {
        const fetchEmployees = async () => {
            
            setEmpLoading(true)
            try{
                  
                const response = await axios.get('https://ems-system-backend.vercel.app/api/employee', {
                    headers: {
                        "Authorization" : `Bearer ${localStorage.getItem('token')}`
                    }
                })
                console.log(response.data)
                
                if(response.data.success) {
                    
                    let sno = 1;
                    const data = await response.data.employees.map((emp) => (
                    {
                        _id: emp._id,
                        sno: sno++,
                        dep_name: emp.department.dep_name,
                        name:emp.userId.name,
                        dob: new Date(emp.dob).toLocaleDateString(),
                        profileImage:<img width={40} className='rounded-full' src={`https://ems-system-backend.vercel.app/${emp.userId.profileImage}`} alt="Profile" />,
                        action: (<EmployeeButtons Id={emp._id} />)
                    }
                   
                ))
                 console.log(response.data.employees)
                    setEmployees(data)
                    setFilteredEmployees(data)
                   
                }
            } catch(error) {
             if(error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
        } finally {
            setEmpLoading(false)
        }
        } 
        fetchEmployees();
    }, [])

    const handleFilter = (e) => {
        const records = employees.filter((emp) => (
            emp.name.toLowerCase().includes(e.target.value.toLowerCase())
        ))
        setFilteredEmployees(records)
    }

    // Custom DataTable styling
  const customStyles = {
    headCells: {
      style: {
        backgroundColor: '#f3f4f6',
        fontWeight: 'bold',
        fontSize: '14px',
      },
    },
    rows: {
      style: {
        minHeight: '55px',
        '&:hover': {
          backgroundColor: '#f9fafb',
        },
      },
    },
    pagination: {
      style: {
        borderTop: '1px solid #e5e7eb',
        padding: '10px',
      },
    },
  }

  return (
     <>{empLoading ?<div className="text-center py-10 text-lg font-medium text-gray-600">Loading Employees...</div> : 
    <div className='p-6'>
        <div className='text-center mb-6'>
            <h3 className="text-3xl font-extrabold text-gray-800">Manage Employee</h3>
        </div>
          {/* Search + Add Employee */}
        <div className="flex justify-between items-center mb-6">
            <input type="text" placeholder="🔍 Search by Dep Name" className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-400 focus:outline-none w-1/3"  
                onChange={handleFilter}
            />
            <Link to="/admin-dashboard/add-employee"   className="px-5 py-2 bg-teal-600 rounded-lg shadow hover:bg-teal-700 transition text-white font-medium"> ➕ Add New Employee</Link>
        </div>

        {/* Employee Table */}
        <div className="bg-white rounded-xl shadow-lg p-4">
            <DataTable columns={columns} data={filteredEmployee} pagination  highlightOnHover striped pointerOnHover/>
        </div>
    </div>
 }</>
  )
}

export default List