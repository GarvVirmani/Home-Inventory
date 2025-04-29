import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { ITEM_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';

function AddItem() {
  const { isAuthenticated } = useSelector(state => state.auth);
  const { darkMode } = useSelector(state => state.theme);
  const navigate = useNavigate();

  const [productName, setProductName] = useState('');
  const [productType, setProductType] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [condition, setCondition] = useState('New');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('You must be logged in to add an item.', {
        style: {
          background: darkMode ? '#000000' : '#ffffff',
          color: darkMode ? '#ffffff' : '#000000',
          borderRadius: '8px',
          boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.15)',
        },
        iconTheme: {
          primary: darkMode ? '#ffffff' : '#000000',
          secondary: darkMode ? '#000000' : '#ffffff',
        },
      });
      navigate('/login');
      return;
    }
    try {
      const res = await axios.post(
        `${ITEM_API_END_POINT}/create`,
        { productName, productType, totalPrice, quantity, purchaseDate, condition },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success('Item added successfully!', {
          style: {
            background: darkMode ? '#000000' : '#ffffff',
            color: darkMode ? '#ffffff' : '#000000',
            borderRadius: '8px',
            boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.15)',
          },
          iconTheme: {
            primary: darkMode ? '#ffffff' : '#000000',
            secondary: darkMode ? '#000000' : '#ffffff',
          },
        });
        navigate('/');
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        style: {
          background: darkMode ? '#000000' : '#ffffff',
          color: darkMode ? '#ffffff' : '#000000',
          borderRadius: '8px',
          boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.15)',
        },
        iconTheme: {
          primary: darkMode ? '#ffffff' : '#000000',
          secondary: darkMode ? '#000000' : '#ffffff',
        },
      });
    }
  };

  return (
    <div className={`${darkMode ? 'bg-slate-900' : 'bg-gray-100'} min-h-screen flex items-center justify-center`}>
      <div className={`${darkMode ? 'bg-slate-800' : 'bg-white'} p-8 rounded-lg shadow-lg w-full max-w-md`}>
        <h2 className={`${darkMode ? 'text-blue-300' : 'text-blue-700'} text-2xl font-bold text-center mb-6`}>
          Add New Item
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className={`${darkMode ? 'text-gray-200' : 'text-gray-700'} block mb-1 text-sm font-medium`}>
              Product Name
            </label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className={`${darkMode ? 'bg-slate-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'} w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
              placeholder="Enter product name"
              required
            />
          </div>

          <div>
            <label className={`${darkMode ? 'text-gray-200' : 'text-gray-700'} block mb-1 text-sm font-medium`}>
              Product Category
            </label>
            <select
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
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
              value={totalPrice}
              onChange={(e) => setTotalPrice(e.target.value)}
              className={`${darkMode ? 'bg-slate-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'} w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
              placeholder="Enter total price"
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
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className={`${darkMode ? 'bg-slate-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'} w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
              placeholder="Enter quantity"
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
              value={purchaseDate}
              onChange={(e) => setPurchaseDate(e.target.value)}
              className={`${darkMode ? 'bg-slate-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'} w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
              required
            />
          </div>

          <div>
            <label className={`${darkMode ? 'text-gray-200' : 'text-gray-700'} block mb-1 text-sm font-medium`}>
              Condition
            </label>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
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
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all duration-300"
          >
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddItem;