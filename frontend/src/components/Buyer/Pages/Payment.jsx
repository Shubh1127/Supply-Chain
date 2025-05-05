import { usePayment,initiatePayment } from "../../../Context/Paymentcontext";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const { paymentDetails } = usePayment();
  const navigate = useNavigate();

  if (!paymentDetails) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>No payment details found. Please go back and try again.</p>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go Back
        </button>
      </div>
    );
  }

  const { product, buyer } = paymentDetails;

  const handlePayment = () => {
    const options = {
      key: "your_test_key", // Replace with your Razorpay test key
      amount: product.price * 100,
      currency: "INR",
      name: "Supply Chain Pro",
      description: `Payment for ${product.name}`,
      order_id: paymentDetails.orderId,
      handler: (response) => {
        console.log("Payment successful:", response);
        navigate("/role/buyer/orders");
      },
      prefill: {
        name: buyer.name,
        email: buyer.email,
        contact: buyer.phone,
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Payment</h1>
      <div className="border p-4 rounded-md">
        <h2 className="text-lg font-semibold">Product Details</h2>
        <p>Name: {product.name}</p>
        <p>Price: ₹{product.price}</p>
        <p>Description: {product.description}</p>
      </div>
      <button
        onClick={handlePayment}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Pay Now
      </button>
    </div>
  );
};

export default Payment;