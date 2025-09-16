import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/authContext";

const ViewSalary = () => {
  const [salaries, setSalaries] = useState(null);
  const [filteredSalaries, setFilteredSalaries] = useState(null);
  const { id } = useParams();
  const { user } = useAuth();
  let sno = 1;

  const fetchSalaries = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/salary/${id}/${user.role}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        setSalaries(response.data.salary);
        setFilteredSalaries(response.data.salary);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    fetchSalaries();
  }, []);

  const filterSalaries = (e) => {
    const q = e.target.value;
    const filteredRecords = salaries.filter((leave) =>
      leave.employeeId.employeeId.toLowerCase().includes(q.toLowerCase())
    );
    setFilteredSalaries(filteredRecords);
  };

  return (
    <>
      {filteredSalaries === null ? (
        <div className="flex justify-center items-center h-64 text-gray-600">
          Loading ...
        </div>
      ) : (
        <div className="p-6 max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-teal-700">
              Salary History
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Detailed record of employee salary transactions
            </p>
          </div>

          {/* Search */}
          <div className="flex justify-end mb-4">
            <input
              type="text"
              placeholder="🔍 Search By Emp ID"
              className="border px-3 py-2 rounded-md shadow-sm border-gray-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              onChange={filterSalaries}
            />
          </div>

          {/* Table */}
          {filteredSalaries.length > 0 ? (
            <div className="overflow-x-auto shadow-lg rounded-lg">
              <table className="w-full text-sm text-left text-gray-600">
                <thead className="text-xs uppercase bg-teal-600 text-white">
                  <tr>
                    <th className="px-6 py-3">SNO</th>
                    <th className="px-6 py-3">Emp ID</th>
                    <th className="px-6 py-3">Salary</th>
                    <th className="px-6 py-3">Allowance</th>
                    <th className="px-6 py-3">Deduction</th>
                    <th className="px-6 py-3">Total</th>
                    <th className="px-6 py-3">Pay Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSalaries.map((salary) => (
                    <tr
                      key={salary._id}
                      className="bg-white border-b hover:bg-gray-100 transition duration-200"
                    >
                      <td className="px-6 py-3">{sno++}</td>
                      <td className="px-6 py-3">
                        {salary.employeeId.employeeId}
                      </td>
                      <td className="px-6 py-3 font-medium text-gray-700">
                        ₹{salary.basicSalary}
                      </td>
                      <td className="px-6 py-3 text-green-600">
                        +₹{salary.allowances}
                      </td>
                      <td className="px-6 py-3 text-red-600">
                        -₹{salary.deductions}
                      </td>
                      <td className="px-6 py-3 font-bold text-teal-700">
                        ₹{salary.netSalary}
                      </td>
                      <td className="px-6 py-3">
                        {new Date(salary.payDate).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center text-gray-500 mt-6">
              No salary records found
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ViewSalary;
