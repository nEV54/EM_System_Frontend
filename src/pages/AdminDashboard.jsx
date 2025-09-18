import React from 'react'
import { useAuth } from '../context/authContext'
import AdminSideBar from '../components/dashboard/AdminSidebar'
import Navbar from '../components/dashboard/Navbar'
import { Outlet } from 'react-router-dom'
import AdminSidebar from '../components/dashboard/AdminSidebar'


const AdminDashboard = () => {

  const { user } = useAuth()

  return (
    <div className='flex bg-gray-100 min-h-screen'>
      <AdminSidebar />
      <div className='flex-1 ml-64 flex flex-col'>
        <Navbar />
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard