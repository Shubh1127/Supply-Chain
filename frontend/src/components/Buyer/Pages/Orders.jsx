import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/BuyerHeader';
import { useBuyer } from '../../../Context/BuyerContext';

const Orders = () => {
  const { buyer } = useBuyer();
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3000/orders', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('Buyertoken')}`,
          },
        });
        setOrders(response.data.orders);
        setFilteredOrders(response.data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    setFilteredOrders(
      orders.filter(order =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, orders]);

  return (
    <>
      <Header />
      <div className="p-8 bg-red-500 w-3/4 mx-auto">
        <div className='flex '>
        <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
        <input
          type="text"
          placeholder="Search for an order"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded w-2/4"
          />
          </div>
        {filteredOrders.length === 0 ? (
          <p>Looks like you did not place an order.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOrders.map((order) => (
              <div key={order.id} className="border border-gray-300 p-4 rounded">
                <p>Order ID: {order.id}</p>
                <p>Order Date: {new Date(order.date).toLocaleDateString()}</p>
                <p>Total Amount: ${order.totalAmount}</p>
                {/* Add more order details as needed */}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Orders;