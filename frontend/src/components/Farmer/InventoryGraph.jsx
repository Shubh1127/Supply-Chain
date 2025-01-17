import { useEffect } from "react";
import { useFarmer } from "../../Context/FarmerContext";
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
  const {inventory, fetchInventory} = useFarmer();

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4 text-white">Inventory</h2>
      {/* Scrollable table container */}
      <div className=" overflow-y-auto max-h-[400px] border border-gray-300 rounded shadow-md">
        <table className="min-w-full bg-white">
          <thead className=" bg-gray-200">
            <tr>
              <th className="py-2 px-4 border-b text-left">Name</th>
              <th className="py-2 px-4 border-b text-left">Photo</th>
              <th className="py-2 px-2 border-b text-left">Price/Kg</th>
              <th className="py-2 px-4 border-b text-left">Description</th>
              <th className="py-2 px-4 border-b text-left">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((product) => (
              <tr key={product._id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{product.name}</td>
                <td className="py-2 px-4 border-b">
                  <img src={product.photo} alt={product.name} className="w-24 rounded-md h-16 object-cover" />
                </td>
                <td className="py-2 px-4 border-b">₹{product.price}</td>
                <td className="py-2 px-4 border-b">{product.description}</td>
                <td className="py-2 px-8 border-b">{product.quantity}Kg</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-semibold text-white mt-12 mb-4">Inventory Quantity Graph</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={inventory} >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="#FFFFFF" tick={{ fill: "#FFFFFF" }} />
          <YAxis stroke="#FFFFFF" tick={{ fill: "#FFFFFF" }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="quantity" fill="#4CAF50" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InventoryGraph;
