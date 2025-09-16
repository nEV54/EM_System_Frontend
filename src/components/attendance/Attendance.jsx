import React from 'react'
import { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { Link } from 'react-router-dom'
import { columns } from '../../utils/AttendanceHelper'
import axios from 'axios'
import { AttendanceHelper } from '../../utils/AttendanceHelper'

const Attendance = () => {
  const [attendance, setAttendance] = useState([])
  const [loading, setLoading] = useState(false)
  const [filteredAttendance, setFilteredAttendance] = useState([])

  const statusChange = () => {
    fetchAttendance()
  }

  const fetchAttendance = async () => {

    setLoading(true)
    try {

      const response = await axios.get('http://localhost:3000/api/attendance', {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      })
      // console.log(response.data)

      if (response.data.success) {

        let sno = 1;
        const data = await response.data.attendance.map((att) => (
          {
            employeeId: att.employeeId.employeeId,
            sno: sno++,
            department: att.employeeId.department.dep_name,
            name: att.employeeId.userId.name,
            action: (<AttendanceHelper status={att.status} employeeId={att.employeeId.employeeId} statusChange={statusChange} />)
          }

        ))
        console.log(response.data.attendance)
        setAttendance(data)
        setFilteredAttendance(data)

      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        console.error("Failed to update attendance", err);
        alert(error.response.data.error)
      }
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {

    fetchAttendance();
  }, [])

  const handleFilter = (e) => {
    const records = attendance.filter((emp) => (
      emp.employeeId.toLowerCase().includes(e.target.value.toLowerCase())
    ))
    setFilteredAttendance(records)
  }

  if (loading) {
    return <div>Loading ...</div>
  }


  return (

    <div className='p-6'>
      <div className='text-center'>
        <h3 className='text-2xl font-bold'>Manage Attendance</h3>
      </div>
      <div className='flex justify-between items-center mt-4'>
        <input type="text" placeholder="🔍 Search by EmployeeID" className='px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-400 focus:outline-none w-1/4'
          onChange={handleFilter}
        />
        <p className='text-2xl'>Mark Employees for <span className='text-2xl font-bold underline'>{new Date().toISOString().split("T")[0]}{" "}</span></p>
        <Link to="/admin-dashboard/attendance-report" className='px-4 py-1 bg-teal-600 rounded text-white'>Attendance Report</Link>
      </div>
      <div className='mt-6'>
        <DataTable columns={columns} data={filteredAttendance} pagination />
      </div>
    </div>

  )
}

export default Attendance