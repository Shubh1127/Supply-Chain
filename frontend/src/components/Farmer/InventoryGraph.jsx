import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 5000 },
  { name: 'Apr', sales: 2780 },
  { name: 'May', sales: 1890 },
  { name: 'Jun', sales: 2390 },
]

function InventoryGraph() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Inventory Sales</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="sales" fill="#4CAF50" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default InventoryGraph

