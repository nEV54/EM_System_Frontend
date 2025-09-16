import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/authContext';

const List = () => {
    const [leaves, setLeaves] = useState(null)
    let sno = 1;
    const { id } = useParams()
    const { user } = useAuth()

    const fetchLeaves = async () => {

        try {
            const response = await axios.get(`http://localhost:3000/api/leave/${id}/${user.role}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            console.log(response.data)
            if (response.data.success) {

                setLeaves(response.data.leaves)

            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.message)
            }
        }
    };

    useEffect(() => {
        fetchLeaves();
    }, []);

    if (!leaves) {
        return <div>Loading ...</div>
    }


    return (
        <div className='p-6'>
            <div className='text-center'>
                <h3 className='text-2xl font-bold'>Manage Leaves</h3>
            </div>
            <div className='flex justify-between items-center'>
                <input type="text" placeholder="🔍 Search by Leave Name" className='px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-400 focus:outline-none w-1/4'

                />
                {user.role === "employee" && (
                    <Link to="/employee-dashboard/add-leave" className='px-4 py-1 bg-teal-600 rounded text-white'>Add New Leave</Link>
                )}
            </div>

            <table className="w-full text-sm  text-gray-500 mt-6 border-collapse">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
                    <tr>
                        <th className="px-6 py-3 text-center">SNO</th>
                        <th className="px-6 py-3 text-left">Leave Type</th>
                        <th className="px-6 py-3 text-center">From</th>
                        <th className="px-6 py-3 text-center">To</th>
                        <th className="px-6 py-3 text-left">Description</th>
                        <th className="px-6 py-3 text-center">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {leaves.map((leave) => (
                        <tr
                            key={leave._id}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 "
                        >
                            <td className="px-6 py-3">{sno++}</td>
                            <td className="px-6 py-3 text-left">{leave.leaveType}</td>
                            <td className="px-6 py-3 text-center">{new Date(leave.startDate).toLocaleDateString()}</td>
                            <td className="px-6 py-3 text-center">{new Date(leave.endDate).toLocaleDateString()}</td>
                            <td className="px-6 py-3 text-left">{leave.reason}</td>
                            <td className="px-6 py-3 text-center">{leave.status}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default List