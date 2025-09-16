import { useNavigate } from "react-router-dom"
import axios from "axios"

export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno,
        width: "80px"
    },
    {
        name: "Department Name",
        selector: (row) => row.dep_name,
        sortable: true
    },
    {
        name: "Action",
        selector: (row) => row.action,
        width: "200px"
    },
]

export const DepartmentButtons = ({ Id, onDepartmentDelete }) => {
    const navigate = useNavigate()

    const handleDelete = async (id) => {
        const confirm = window.confirm("Do you want to delete this department?")
        if (confirm) {
            try {
                const response = await axios.delete(`http://localhost:3000/api/department/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                })

                if (response.data.success) {
                    onDepartmentDelete()
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
            }
        }
    }

    return (
        <div className="flex space-x-3">
            <button
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition shadow"
                onClick={() => navigate(`/admin-dashboard/department/${Id}`)}
            >
                Edit
            </button>
            <button
                className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md transition shadow"
                onClick={() => handleDelete(Id)}
            >
                Delete
            </button>
        </div>
    )
}
