import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ITEM_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useSelector } from 'react-redux';

function Edit() {
  const { isAuthenticated } = useSelector(store => store.auth);
  const { darkMode } = useSelector(store => store.theme);
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productName: "",
    productType: "",
    totalPrice: "",
    quantity: "",
    purchaseDate: "",
    condition: "New",
  });

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`${ITEM_API_END_POINT}/${id}`, { withCredentials: true });
        const item = res.data.item[0];
        const formattedDate = item.purchaseDate ? item.purchaseDate.slice(0, 10) : "";
        setFormData({ ...item, purchaseDate: formattedDate });
      } catch (error) {
        toast.error("Failed to load item.");
      }
    };
    fetchItem();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${ITEM_API_END_POINT}/update/${id}`, formData, { withCredentials: true });
      toast.success("Item updated successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to update item.");
    }
  };

  return (
    <div className={`${darkMode ? 'bg-slate-900' : 'bg-gray-100'} min-h-screen flex items-center justify-center`}>
      {isAuthenticated && (
        <div className={`${darkMode ? 'bg-slate-800' : 'bg-white'} p-8 rounded-lg shadow-lg w-full max-w-md`}>
          <h2 className={`${darkMode ? 'text-blue-300' : 'text-blue-700'} text-2xl font-bold text-center mb-6`}>
            Edit Item
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className={`${darkMode ? 'text-gray-200' : 'text-gray-700'} block mb-1 text-sm font-medium`}>
                Product Name
              </label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                className={`${darkMode ? 'bg-slate-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'} w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
                required
              />
            </div>

            <div>
              <label className={`${darkMode ? 'text-gray-200' : 'text-gray-700'} block mb-1 text-sm font-medium`}>
                Product Category
              </label>
              <select
                name="productType"
                value={formData.productType}
                onChange={handleChange}
                className={`${darkMode ? 'bg-slate-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'} w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
                required
              >
                <option value="">Select Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Furniture">Furniture</option>
                <option value="Clothing">Clothing</option>
                <option value="Appliances">Appliances</option>
                <option value="Books">Books</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div>
              <label className={`${darkMode ? 'text-gray-200' : 'text-gray-700'} block mb-1 text-sm font-medium`}>
                Total Price
              </label>
              <input
                type="number"
                name="totalPrice"
                value={formData.totalPrice}
                onChange={handleChange}
                className={`${darkMode ? 'bg-slate-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'} w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
                required
                min="0"
              />
            </div>

            <div>
              <label className={`${darkMode ? 'text-gray-200' : 'text-gray-700'} block mb-1 text-sm font-medium`}>
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className={`${darkMode ? 'bg-slate-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'} w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
                required
                min="1"
              />
            </div>

            <div>
              <label className={`${darkMode ? 'text-gray-200' : 'text-gray-700'} block mb-1 text-sm font-medium`}>
                Purchase Date
              </label>
              <input
                type="date"
                name="purchaseDate"
                value={formData.purchaseDate}
                onChange={handleChange}
                className={`${darkMode ? 'bg-slate-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'} w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
                required
              />
            </div>

            <div>
              <label className={`${darkMode ? 'text-gray-200' : 'text-gray-700'} block mb-1 text-sm font-medium`}>
                Condition
              </label>
              <select
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                className={`${darkMode ? 'bg-slate-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'} w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
              >
                <option value="New">New</option>
                <option value="Like New">Like New</option>
                <option value="Used">Used</option>
                <option value="Refurbished">Refurbished</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
            >
              Update Item
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Edit;