import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/authContext"

// Employee Table Columns
export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno,
        width: "80px",
        style: { paddingLeft: "12px", paddingRight: "12px" }
    },
    {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
        width: "140px",
        style: { paddingLeft: "12px", paddingRight: "12px" }
    },
    {
        name: "Image",
        selector: (row) => row.profileImage,
        width: "100px",
        style: { paddingLeft: "12px", paddingRight: "12px" }
    },
    {
        name: "Department",
        selector: (row) => row.dep_name,
        width: "160px",
        style: { paddingLeft: "12px", paddingRight: "12px" }
    },
    {
        name: "DOB",
        selector: (row) => row.dob,
        sortable: true,
        width: "140px",
        style: { paddingLeft: "12px", paddingRight: "12px" }
    },
    {
        name: "Action",
        selector: (row) => row.action,
        center: true,
        style: { paddingLeft: "12px", paddingRight: "12px" }
    }
]

// Fetch departments
export const fetchDepartments = async () => {
    let departments
    try {
        const response = await axios.get("http://localhost:3000/api/department", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })

        if (response.data.success) {
            departments = response.data.departments
        }
    } catch (error) {
        if (error.response && !error.response.data.success) {
            alert(error.response.data.error)
        }
    }
    return departments
}

// Fetch employees by department
export const getEmployees = async (id) => {
    let employees
    try {
        const response = await axios.get(
            `http://localhost:3000/api/employee/department/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        )
        if (response.data.success) {
            employees = response.data.employees
        }
    } catch (error) {
        if (error.response && !error.response.data.success) {
            alert(error.response.data.error)
        }
    }
    return employees
}

// Employee action buttons
export const EmployeeButtons = ({ Id }) => {
    const navigate = useNavigate()

    return (
        <div className="flex gap-4">
            <button
                className="px-3 py-1 bg-teal-600 text-white rounded hover:bg-teal-700"
                onClick={() => navigate(`/admin-dashboard/employees/${Id}`)}
            >
                View
            </button>
            <button
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => navigate(`/admin-dashboard/employees/edit/${Id}`)}
            >
                Edit
            </button>
            <button
                className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700"
                onClick={() => navigate(`/admin-dashboard/employees/salary/${Id}`)}
            >
                Salary
            </button>
            <button
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={() => navigate(`/admin-dashboard/employees/leaves/${Id}`)}
            >
                Leave
            </button>
        </div>
    )
}
