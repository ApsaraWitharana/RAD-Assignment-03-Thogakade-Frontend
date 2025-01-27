import { useEffect, useState } from "react";
import { Trash2 } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { AppDispatch } from "../store/store.ts";
import { saveItem, getItems} from "../reducers/ItemReducer.ts";
import { Item } from "../model/Item.ts";

export function Items() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();


  const [ItemId, setItemId] = useState("");
  const [Name, setName] = useState("");
  const [Quantity, setQuantity] = useState("");
  const [Price, setPrice] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const items = useSelector((state) => state.item );


  const [lastItemId, setLastItemId] = useState(
      parseInt(localStorage.getItem("lastItemId") || "0", 10)
  );

  useEffect(() => {
    if (items.length === 0) {
      dispatch(getItems());
    }
    resetForm();
  }, [dispatch]);

  const generateItemId = () => {
    const newNumber = lastItemId + 1;
    const formattedNumber = String(newNumber).padStart(3, "0");
    return `ITM-${formattedNumber}`;
  };



  function handleAdd ()  {
    const newItem = new Item(
        lastItemId + 1,
        Name,
        parseInt(Quantity, 10),
        parseFloat(Price)
    );

    dispatch(saveItem(newItem));
    alert("Added successfully");
    getItems();

    const newNumber = lastItemId + 1;
    setLastItemId(newNumber);
    localStorage.setItem("lastItemId", newNumber.toString());
    resetForm();
    navigate("/");
  }

  const resetForm = () => {
    setName("");
    setQuantity("");
    setPrice("");
    const newId = generateItemId();
    setItemId(newId);
    setIsEditing(false);
  };

  return (
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
              type="text"
              name="item_id"
              placeholder="Item ID"
              value={ItemId}
              readOnly
              onChange={(e) => setItemId(e.target.value)}
              className="border p-2 rounded bg-gray-200 cursor-not-allowed"
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
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={Quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="border p-2 rounded"
          />
          <input
              type="number"
              step="0.01"
              name="price"
              placeholder="Price"
              value={Price}
              onChange={(e) => setPrice(e.target.value)}
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
            <th className="border px-4 py-2">Item ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Quantity</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
          </thead>
          <tbody>

          {items.map((item) => (
                  <tr key={item.ItemID} className="hover:cursor-pointer hover:bg-slate-600 hover:text-white">
                    <td className="border px-4 py-2">{item.ItemID}</td>
                    <td className="border px-4 py-2">{item.Name}</td>
                    <td className="border px-4 py-2">{item.Quantity}</td>
                    <td className="border px-4 py-2">{item.Price}</td>
                    <td className="border px-4 py-2 text-center">
                      <button className="bg-red-500 text-white p-2 rounded-lg">
                        <Trash2 />
                      </button>
                    </td>
                  </tr>
         ) )}

          </tbody>
        </table>
      </div>
  );
}
