import React from 'react'
import { useNavigate } from 'react-router-dom'

const SummaryCard = ({ icon, text, number, color, route }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    if (route) navigate(route) // navigate only if a route is provided
  }

  return (
    <div
      onClick={handleClick}
      className="flex items-center p-5 bg-white rounded-xl shadow-md 
                 hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
    >
      <div
        className={`flex justify-center items-center w-14 h-14 rounded-full ${color} text-white shadow-md`}
      >
        {icon}
      </div>
      <div className="ml-4">
        <p className="text-gray-600 font-medium text-sm">{text}</p>
        <p className="text-2xl font-bold text-gray-800">{number}</p>
      </div>
    </div>
  )
}

export default SummaryCard
