import React, { useEffect, useState } from 'react'
import SummaryCard from './SummaryCard'
import {
  FaCheckCircle,
  FaFileAlt,
  FaHourglassHalf,
  FaMoneyBillWave,
  FaTimesCircle,
  FaUsers,
  FaBuilding,
} from 'react-icons/fa'
import axios from 'axios'

const AdminSummary = () => {
  const [summary, setSummary] = useState(null)

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const summary = await axios.get('http://localhost:3000/api/dashboard/summary', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        setSummary(summary.data)
      } catch (error) {
        if (error.response) {
          console.log(error.message)
          alert(error.response.data.error)
        }
      }
    }
    fetchSummary()
  }, [])

  if (!summary) {
    return <div className="text-center text-lg font-semibold mt-10">Loading ...</div>
  }

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {/* Title */}
      <h3 className="text-3xl font-extrabold text-gray-800 mb-8">
        Dashboard Overview
      </h3>

      {/* Top Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard
          icon={<FaUsers size={28} />}
          text="Total Employees"
          number={summary.totalEmloyees}
          color="bg-gradient-to-r from-teal-500 to-teal-700"
          route="/admin-dashboard/employees"
        />
        <SummaryCard
          icon={<FaBuilding size={28} />}
          text="Total Departments"
          number={summary.totalDepartments}
          color="bg-gradient-to-r from-yellow-500 to-yellow-700"
          route="/admin-dashboard/departments"
        />
        <SummaryCard
          icon={<FaMoneyBillWave size={28} />}
          text="Monthly Salary"
          number={summary.totalSalary}
          color="bg-gradient-to-r from-red-500 to-red-700"
        />
      </div>

      {/* Leave Section */}
      <div className="mt-12">
        <h4 className="text-center text-2xl font-bold text-gray-700">
          Leave Details
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <SummaryCard
            icon={<FaFileAlt size={26} />}
            text="Leave Applied"
            number={summary.leaveSummary.appliedFor}
            color="bg-gradient-to-r from-teal-500 to-teal-700"
          />
          <SummaryCard
            icon={<FaCheckCircle size={26} />}
            text="Leave Approved"
            number={summary.leaveSummary.approved}
            color="bg-gradient-to-r from-green-500 to-green-700"
          />
          <SummaryCard
            icon={<FaHourglassHalf size={26} />}
            text="Leave Pending"
            number={summary.leaveSummary.pending}
            color="bg-gradient-to-r from-yellow-500 to-yellow-700"
          />
          <SummaryCard
            icon={<FaTimesCircle size={26} />}
            text="Leave Rejected"
            number={summary.leaveSummary.rejected}
            color="bg-gradient-to-r from-red-500 to-red-700"
          />
        </div>
      </div>
    </div>
  )
}

export default AdminSummary
