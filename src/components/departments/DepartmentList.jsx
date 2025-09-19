import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import { columns, DepartmentButtons } from '../../utils/DepartmentHelper'
import axios from 'axios'

const DepartmentList = () => {
    const [departments, setDepartments] = useState([])
    const [depLoading, setDepLoading] = useState(false)
    const [filteredDepartments, setFilteredDepartments] = useState([])

    const onDepartmentDelete = () => {
        fetchDepartments()
    }

    const fetchDepartments = async () => {
        setDepLoading(true)
        try {
            const response = await axios.get('https://ems-system-backend.vercel.app/api/department', {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })

            if (response.data.success) {
                let sno = 1
                const data = response.data.departments.map((dep) => ({
                    _id: dep._id,
                    sno: sno++,
                    dep_name: dep.dep_name,
                    action: (
                        <DepartmentButtons
                            Id={dep._id}
                            onDepartmentDelete={onDepartmentDelete}
                        />
                    )
                }))

                setDepartments(data)
                setFilteredDepartments(data)
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
        } finally {
            setDepLoading(false)
        }
    }

    useEffect(() => {
        fetchDepartments()
    }, [])

    const filterDepartments = (e) => {
        const records = departments.filter((dep) =>
            dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase())
        )
        setFilteredDepartments(records)
    }

    return (
        <>
            {depLoading ? (
                <div className="text-center py-10 text-gray-600 text-lg">Loading ...</div>
            ) : (
                <div className="p-6 max-w-5xl mx-auto bg-white rounded-md shadow-md">
                    <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-800">Manage Departments</h3>
                    </div>

                    <div className="flex justify-between items-center mb-4">
                        <input
                            type="text"
                            placeholder="🔍 Search by Department Name"
                            className="px-4 py-2 border rounded-md w-72 focus:ring-2 focus:ring-teal-400 focus:outline-none"
                            onChange={filterDepartments}
                        />
                        <Link
                            to="/admin-dashboard/add-department"
                            className="px-4 py-2 bg-teal-600 rounded-md text-white shadow hover:bg-teal-700 transition"
                        >
                            + Add New Department
                        </Link>
                    </div>

                    <div className="mt-5">
                        <DataTable
                            columns={columns}
                            data={filteredDepartments}
                            pagination
                            highlightOnHover
                            dense
                            customStyles={{
                                rows: {
                                    style: {
                                        backgroundColor: "#fff",
                                        borderBottom: "1px solid #eee",
                                        "&:hover": {
                                            backgroundColor: "#f9fafb",
                                        }
                                    }
                                },
                                headCells: {
                                    style: {
                                        fontWeight: "bold",
                                        fontSize: "14px",
                                        backgroundColor: "#f3f4f6",
                                        color: "#374151"
                                    }
                                }
                            }}
                        />
                    </div>
                </div>
            )}
        </>
    )
}

export default DepartmentList
