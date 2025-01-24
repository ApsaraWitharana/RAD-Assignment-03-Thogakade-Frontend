import React, { useState } from "react"
import { Trash2 } from "react-feather"

function Customer() {
  const [customers, setCustomers] = useState([
    {
      id: "C001",
      name: "John Doe",
      nic: "123456789V",
      email: "john@example.com",
      phone: "1234567890"
    },
    {
      id: "C002",
      name: "Jane Smith",
      nic: "987654321X",
      email: "jane@example.com",
      phone: "0987654321"
    }
  ])

  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [nic, setNic] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [isEditing, setIsEditing] = useState(false)

  const handleAdd = () => {
    if (!id || !name || !nic || !email || !phone) {
      alert("All fields are required!")
      return
    }
    setCustomers([...customers, { id, name, nic, email, phone }])
    resetForm()
  }

  const handleEdit = (customer: any) => {
    setId(customer.id)
    setName(customer.name)
    setNic(customer.nic)
    setEmail(customer.email)
    setPhone(customer.phone)
    setIsEditing(true)
  }

  const handleUpdate = () => {
    if (!id || !name || !nic || !email || !phone) {
      alert("All fields are required!")
      return
    }
    setCustomers(
      customers.map((customer) =>
        customer.id === id ? { id, name, nic, email, phone } : customer
      )
    )
    resetForm()
  }

  const handleDelete = (customerId: string) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      setCustomers(customers.filter((customer) => customer.id !== customerId))
    }
  }

  const resetForm = () => {
    setId("")
    setName("")
    setNic("")
    setEmail("")
    setPhone("")
    setIsEditing(false)
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          name="id"
          placeholder="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="border p-2 rounded-full"
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded-full"
        />
        <input
          type="text"
          name="nic"
          placeholder="NIC"
          value={nic}
          onChange={(e) => setNic(e.target.value)}
          className="border p-2 rounded-full"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded-full"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border p-2 rounded-full"
        />
      </div>
      <div className="flex justify-end">
        {isEditing ? (
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white p-2 rounded mr-2 rounded-full"
          >
            Update
          </button>
        ) : (
          <button
            onClick={handleAdd}
            className="bg-green-500 text-white p-2 rounded mr-2 rounded-full w-25 hover:bg-green-600 hover:text-black hover:cursor-pointer"
          >
            Add
          </button>
        )}
        {isEditing && (
          <button
            onClick={resetForm}
            className="bg-gray-500 text-white p-2 rounded rounded-md"
          >
            Cancel
          </button>
        )}
      </div>
      <table className="min-w-full table-auto border-collapse mt-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">NIC</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Phone</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr
              key={customer.id}
              onClick={() => handleEdit(customer)}
              className="hover:cursor-pointer hover:bg-slate-600 hover:text-white"
            >
              <td className="border px-4 py-2">{customer.id}</td>
              <td className="border px-4 py-2">{customer.name}</td>
              <td className="border px-4 py-2">{customer.nic}</td>
              <td className="border px-4 py-2">{customer.email}</td>
              <td className="border px-4 py-2">{customer.phone}</td>
              <td className="border px-4 py-2 text-center">
                <button
                  onClick={() => handleDelete(customer.id)}
                  className="bg-red-500 text-white p-2 rounded-lg"
                >
                  <Trash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Customer
