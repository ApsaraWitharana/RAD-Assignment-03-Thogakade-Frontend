import { useState, useEffect } from "react";
import { Trash2 } from "react-feather";
import { useNavigate } from "react-router";
import { AppDispatch } from "../store/store.ts";
import { useDispatch } from "react-redux";
import { saveCustomer } from "../reducers/CustomerReducer.ts";
import { Customer } from "../model/Customer.ts";

export function Customers() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // State for the last customer code
  const [lastCustomerCode, setLastCustomerCode] = useState(
      parseInt(localStorage.getItem("lastCustomerCode") || "0", 10)
  );

  const [CustomerId, setCustomerId] = useState("");
  const [Name, setName] = useState("");
  const [Address, setAddress] = useState("");
  const [Email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Generate customer code only once when the component mounts
  useEffect(() => {
    const newCustomerCode = generateCustomerCode();
    setCustomerId(newCustomerCode);
  }, [lastCustomerCode]);

  const generateCustomerCode = () => {
    const nextNumber = lastCustomerCode + 1;
    const formattedNumber = String(nextNumber).padStart(3, "0");
    return `CUS-${formattedNumber}`;
  };

  const handleAdd = () => {
    const newCustomer = new Customer(CustomerId, Name, Address, Email);
    dispatch(saveCustomer(newCustomer));

    alert(JSON.stringify(newCustomer, null, 2));
    console.log(newCustomer);
    const nextNumber = lastCustomerCode + 1;
    setLastCustomerCode(nextNumber);

    localStorage.setItem("lastCustomerCode", nextNumber.toString());
    navigate("/");
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setAddress("");
    setEmail("");
    setIsEditing(false);
    const newCode = generateCustomerCode();
    setCustomerId(newCode);
  };

  return (
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
              type="text"
              name="id"
              placeholder="ID"
              value={CustomerId}
              className="border p-2 rounded"
              readOnly
          />
          <input
              type="text"
              name="name"
              placeholder="Name"
              value={Name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 rounded"
          />
          <input
              type="text"
              name="address"
              placeholder="Address"
              value={Address}
              onChange={(e) => setAddress(e.target.value)}
              className="border p-2 rounded"
          />
          <input
              type="email"
              name="email"
              placeholder="Email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 rounded"
          />
        </div>
        <div className="flex justify-end">
          {isEditing ? (
              <button className="bg-blue-500 text-white p-2 rounded mr-2">
                Update
              </button>
          ) : (
              <button
                  onClick={handleAdd}
                  className="bg-green-500 text-white p-2 rounded mr-2"
              >
                Add
              </button>
          )}
          {isEditing && (
              <button
                  onClick={resetForm}
                  className="bg-gray-500 text-white p-2 rounded"
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
            <th className="border px-4 py-2">Address</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
          </thead>
          <tbody>
          <tr className="hover:cursor-pointer hover:bg-slate-600 hover:text-white">
            <td className="border px-4 py-2"></td>
            <td className="border px-4 py-2"></td>
            <td className="border px-4 py-2"></td>
            <td className="border px-4 py-2"></td>
            <td className="border px-4 py-2 text-center">
              <button className="bg-red-500 text-white p-2 rounded-lg">
                <Trash2 />
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
  );
}

export default Customers;
