import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ITEM_API_END_POINT } from '@/utils/constant';
import Item from '../Item';

function AllItems() {
    const { isAuthenticated } = useSelector(state => state.auth);
    const [items, setItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortAsc, setSortAsc] = useState(true);
    const navigate = useNavigate();
    const { darkMode } = useSelector(state => state.theme);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await axios.get(`${ITEM_API_END_POINT}/user`, {
                    withCredentials: true,
                });
                setItems(res.data.items);
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };

        fetchItems();
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSort = () => {
        setSortAsc(!sortAsc);
    };

    const handleAddItem = () => {
        if (!isAuthenticated) {
            navigate('/login');
        } else {
            navigate('/add-item');
        }
    };

    const filteredItems = items.filter(item =>
        item.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedItems = filteredItems.sort((a, b) => {
        return sortAsc ? a.totalPrice - b.totalPrice : b.totalPrice - a.totalPrice;
    });

    const handleDelete = (id) => {
        setItems(prev => prev.filter(item => item._id !== id));
    };

    return (
        <div className={`max-w-7xl mx-auto my-10 p-8 rounded-lg shadow-xl transition-colors duration-500 ${darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100' : 'bg-gradient-to-br from-blue-50 via-blue-100 to-white text-gray-800'}`}>
            <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className={`py-2 px-4 rounded-full shadow-inner w-full sm:w-auto transition-colors duration-300 focus:outline-none focus:ring-2 ${darkMode ? 'bg-gray-700 text-gray-200 focus:ring-blue-500 border-gray-600' : 'bg-white text-gray-700 focus:ring-blue-300 border-gray-300'}`}
                />
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto">
                    <button
                        onClick={handleSort}
                        className={`py-2 px-4 rounded-full shadow-md w-full sm:w-auto transition-colors duration-300 ${darkMode ? 'bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-600 hover:to-blue-400 text-white' : 'bg-gradient-to-r from-green-400 to-green-600 hover:from-green-300 hover:to-green-500 text-white'}`}
                    >
                        Sort by Price {sortAsc ? '↓' : '↑'}
                    </button>
                    <button
                        onClick={handleAddItem}
                        className={`py-2 px-4 rounded-full shadow-md w-full sm:w-auto transition-colors duration-300 ${darkMode ? 'bg-gradient-to-r from-purple-700 to-purple-500 hover:from-purple-600 hover:to-purple-400 text-white' : 'bg-gradient-to-r from-indigo-500 to-indigo-700 hover:from-indigo-400 hover:to-indigo-600 text-white'}`}
                    >
                        Add Item
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto rounded-lg overflow-hidden">
                    <thead className={`${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-blue-100 text-blue-800'} shadow-md`}>
                        <tr>
                            <th className="py-3 px-4 text-left font-semibold uppercase tracking-wider">Name</th>
                            <th className="py-3 px-4 text-left font-semibold uppercase tracking-wider">Category</th>
                            <th className="py-3 px-4 text-left font-semibold uppercase tracking-wider">Price</th>
                            <th className="py-3 px-4 text-left font-semibold uppercase tracking-wider">Quantity</th>
                            <th className="py-3 px-4 text-left font-semibold uppercase tracking-wider">Purchase Date</th>
                            <th className="py-3 px-4 text-left font-semibold uppercase tracking-wider">Condition</th>
                            <th className="py-3 px-4 text-left font-semibold uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className={`${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
                        {isAuthenticated && sortedItems.map(item => (
                            <Item key={item._id} item={item} onDelete={handleDelete} darkMode={darkMode} />
                        ))}
                        {!isAuthenticated && (
                            <tr>
                                <td colSpan="7" className={`py-4 px-4 text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    Please log in to view your inventory.
                                </td>
                            </tr>
                        )}
                        {isAuthenticated && sortedItems.length === 0 && (
                            <tr>
                                <td colSpan="7" className={`py-4 px-4 text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    No items in your inventory. Click "Add Item" to get started!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AllItems;