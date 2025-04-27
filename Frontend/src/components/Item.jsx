import { Link } from "react-router-dom";
import axios from "axios";
import { ITEM_API_END_POINT } from "@/utils/constant";
import { Eye, Edit, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";

function Item({ item, onDelete }) {
  const { darkMode } = useSelector((store) => store.theme);

  const handleDelete = async () => {
    try {
      await axios.delete(`${ITEM_API_END_POINT}/delete/${item._id}`, { withCredentials: true });
      onDelete(item._id);
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  return (
    <tr
      className={`border-b transition ${
        darkMode
          ? "hover:bg-slate-700 hover:text-white"
          : "hover:bg-gray-50 hover:text-black"
      }`}
    >
      <td className="px-4 py-3">{item.productName}</td>
      <td className="px-4 py-3">{item.productType}</td>
      <td className="px-4 py-3">₹{item.totalPrice}</td>
      <td className="px-4 py-3">{item.quantity}</td>
      <td className="px-4 py-3">{item.purchaseDate.slice(0, 10)}</td>
      <td className="px-4 py-3">{item.condition}</td>
      <td className="px-4 py-3 flex gap-4 justify-center">
        <Link to={`/items/view/${item.productName}`} className="text-blue-500 hover:scale-110 transition">
          <Eye size={20} />
        </Link>
        <Link to={`/items/edit/${item.productName}`} className="text-yellow-500 hover:scale-110 transition">
          <Edit size={20} />
        </Link>
        <button onClick={handleDelete} className="text-red-500 hover:scale-110 transition">
          <Trash2 size={20} />
        </button>
      </td>
    </tr>
  );
}

export default Item;