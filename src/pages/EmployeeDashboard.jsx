import React from 'react'
import Sidebar from '../components/EmployeeDashboard/Sidebar'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/dashboard/Navbar'
import SummaryCard from '../components/EmployeeDashboard/Summary'

export const EmployeeDashboard = () => {
  return (
    <div className='flex bg-gray-100 min-h-screen'>
      <Sidebar />
      <div className='flex-1 ml-64 flex flex-col'>
        <Navbar />
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
