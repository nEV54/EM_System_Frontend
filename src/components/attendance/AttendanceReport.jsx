import axios from 'axios'
import React, { useState, useEffect } from 'react'

const AttendanceReport = () => {
  const [report, setReport] = useState({})
  const [limit, setLimit] = useState(5)
  const [skip, setSkip] = useState(0)
  const [dateFilter, setDateFilter] = useState()
  const [loading, setLoading] = useState(false)

  const fetchReport = async () => {
    try {
      setLoading(true)
      const query = new URLSearchParams({ limit, skip })
      if (dateFilter) {
        query.append("date", dateFilter)
      }
      const response = await axios.get(`https://ems-system-backend.vercel.app/api/attendance/report?${query.toString()}`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
      })

      if (response.data.success) {
        if (skip === 0) {
          setReport(response.data.groupData)
        } else {
          setReport((prevData) => ({ ...prevData, ...response.data.groupData }))
        }
      }
      setLoading(false)
    } catch (error) {
      alert(error.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReport()
  }, [skip, dateFilter])

  const handleLoadmore = () => {
    setSkip((prevSkip) => prevSkip + limit)
  }

  return (
    <div className="min-h-screen p-10 bg-white">
      <h2 className="text-center text-2xl font-bold mb-6">Attendance Report</h2>

      {/* Filter */}
      <div className="mb-6 flex items-center gap-4">
        <h2 className="text-lg font-medium">Filter by Date:</h2>
        <input
          type="date"
          className="border rounded-lg px-3 py-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => {
            setDateFilter(e.target.value)
            setSkip(0)
          }}
        />
      </div>

      {loading ? (
        <div className="text-center text-lg font-semibold">Loading...</div>
      ) : (
        Object.entries(report).map(([date, record]) => (
          <div className="mb-8" key={date}>
            <h2 className="text-lg font-semibold mb-3">{date}</h2>
            <div className="overflow-x-auto shadow rounded-lg">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200 text-left">
                    <th className="px-4 py-2 border">S No</th>
                    <th className="px-4 py-2 border">Employee ID</th>
                    <th className="px-4 py-2 border">Name</th>
                    <th className="px-4 py-2 border">Department</th>
                    <th className="px-4 py-2 border">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {record.map((data, i) => (
                    <tr key={data.employeeId} className="odd:bg-white even:bg-gray-50">
                      <td className="px-4 py-2 border">{i + 1}</td>
                      <td className="px-4 py-2 border">{data.employeeId}</td>
                      <td className="px-4 py-2 border">{data.employeeName}</td>
                      <td className="px-4 py-2 border">{data.departmentName}</td>
                      <td className="px-4 py-2 border">{data.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}

      <div className="flex justify-center">
        <button
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
          onClick={handleLoadmore}
        >
          Load More
        </button>
      </div>
    </div>
  )
}

export default AttendanceReport
