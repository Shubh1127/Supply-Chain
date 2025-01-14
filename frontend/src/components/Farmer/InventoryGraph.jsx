import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const InventoryGraph = () => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/farmer/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const products = Array.isArray(response.data) ? response.data : response.data.products;
        setInventory(products);
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };

    fetchInventory();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Inventory</h2>
      {/* Scrollable table container */}
      <div className="mb-[15vh] max-h-[200px] border border-gray-300 rounded shadow-md">
        <table className="min-w-full bg-white">
          <thead className=" bg-gray-200">
            <tr>
              <th className="py-2 px-4 border-b text-left">Name</th>
              <th className="py-2 px-4 border-b text-left">Photo</th>
              <th className="py-2 px-4 border-b text-left">Price</th>
              <th className="py-2 px-4 border-b text-left">Description</th>
              <th className="py-2 px-4 border-b text-left">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((product) => (
              <tr key={product._id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{product.name}</td>
                <td className="py-2 px-4 border-b">
                  <img src={product.photo} alt={product.name} className="w-16 h-16 object-cover" />
                </td>
                <td className="py-2 px-4 border-b">₹{product.price}</td>
                <td className="py-2 px-4 border-b">{product.description}</td>
                <td className="py-2 px-8 border-b">{product.quantity}Kg</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-semibold mt-12 mb-4">Inventory Quantity Graph</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={inventory}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="quantity" fill="#4CAF50" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InventoryGraph;
