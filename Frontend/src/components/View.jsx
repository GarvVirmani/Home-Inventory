import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ITEM_API_END_POINT } from "@/utils/constant";
import { useSelector } from "react-redux";

function View() {
  const { isAuthenticated } = useSelector(store => store.auth);
  const { darkMode } = useSelector(store => store.theme);
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`${ITEM_API_END_POINT}/${id}`, { withCredentials: true });
        setItem(res.data.item[0]);
      } catch (error) {
        console.error("Failed to fetch item:", error);
      }
    };
    fetchItem();
  }, [id]);

  if (!item) {
    return (
      <div className={`text-center mt-10 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
        Loading...
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-all ${
        darkMode
          ? "bg-gradient-to-bl from-gray-900 to-gray-800"
          : "bg-gradient-to-bl from-blue-50 to-blue-200"
      }`}
    >
      {isAuthenticated && (
        <div
          className={`p-8 rounded-2xl shadow-2xl w-full max-w-md transition-all ${
            darkMode ? "bg-slate-800 text-gray-200" : "bg-white text-gray-700"
          }`}
        >
          <h2
            className={`text-3xl font-bold text-center mb-6 ${
              darkMode ? "text-indigo-300" : "text-indigo-700"
            }`}
          >
            {item.productName}
          </h2>
          <div className="space-y-4">
            <p><span className="font-semibold">Category:</span> {item.productType}</p>
            <p><span className="font-semibold">Price:</span> ₹{item.totalPrice}</p>
            <p><span className="font-semibold">Quantity:</span> {item.quantity}</p>
            <p><span className="font-semibold">Purchase Date:</span> {item.purchaseDate?.slice(0, 10)}</p>
            <p><span className="font-semibold">Condition:</span> {item.condition}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default View;