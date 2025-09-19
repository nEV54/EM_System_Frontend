import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

// Icons
import { FaUser, FaBirthdayCake, FaVenusMars } from 'react-icons/fa'
import { MdBadge } from 'react-icons/md'
import { HiOfficeBuilding } from 'react-icons/hi'
import { GiLoveMystery } from 'react-icons/gi'

const View = () => {
  const { id } = useParams()
  const [employee, setEmployee] = useState(null)

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`https://ems-system-backend.vercel.app/api/employee/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        if (response.data.success) {
          setEmployee(response.data.employee)
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error)
        }
      }
    }
    fetchEmployee()
  }, [id])

  return (
    <>
      {employee ? (
        <div className="max-w-4xl mx-auto mt-12 bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
          {/* Title */}
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-10 border-b pb-4">
            Employee Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
            {/* Profile Image */}
            <div className="flex justify-center">
              <img
                src={`https://ems-system-backend.vercel.app/${employee.userId.profileImage}`}
                alt="Profile"
                className="w-40 h-40 object-cover rounded-full border-4 border-gray-200 shadow-md"
              />
            </div>

            {/* Info Section */}
            <div className="md:col-span-2 space-y-5">
              <div className="flex justify-between border-b pb-2">
                <p className="flex items-center font-semibold text-gray-600 gap-2">
                  <FaUser className="text-blue-500" /> Name:
                </p>
                <p className="text-gray-800">{employee.userId.name}</p>
              </div>

              <div className="flex justify-between border-b pb-2">
                <p className="flex items-center font-semibold text-gray-600 gap-2">
                  <MdBadge className="text-green-500" /> Employee ID:
                </p>
                <p className="text-gray-800">{employee.employeeId}</p>
              </div>

              <div className="flex justify-between border-b pb-2">
                <p className="flex items-center font-semibold text-gray-600 gap-2">
                  <FaBirthdayCake className="text-pink-500" /> Date of Birth:
                </p>
                <p className="text-gray-800">
                  {new Date(employee.dob).toLocaleDateString()}
                </p>
              </div>

              <div className="flex justify-between border-b pb-2">
                <p className="flex items-center font-semibold text-gray-600 gap-2">
                  <FaVenusMars className="text-purple-500" /> Gender:
                </p>
                <p className="text-gray-800 capitalize">{employee.gender}</p>
              </div>

              <div className="flex justify-between border-b pb-2">
                <p className="flex items-center font-semibold text-gray-600 gap-2">
                  <HiOfficeBuilding className="text-orange-500" /> Department:
                </p>
                <p className="text-gray-800">{employee.department.dep_name}</p>
              </div>

              <div className="flex justify-between">
                <p className="flex items-center font-semibold text-gray-600 gap-2">
                  <GiLoveMystery className="text-red-500" /> Marital Status:
                </p>
                <p className="text-gray-800 capitalize">{employee.maritalStatus}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center mt-20 text-gray-500">Loading...</div>
      )}
    </>
  )
}

export default View
