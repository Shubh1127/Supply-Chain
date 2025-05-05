import { createContext, useContext, useState } from "react";
import axios from "axios";

const PaymentContext = createContext();

export const usePayment = () => useContext(PaymentContext);

export const PaymentProvider = ({ children }) => {
  const [paymentDetails, setPaymentDetails] = useState(null);

  const initiatePayment = async (product, buyer) => {
    try {
      const response = await axios.post("https://api.razorpay.com/v1/orders", {
        amount: product.price * 100, // Amount in paise
        currency: "INR",
        receipt: `receipt_${product._id}`,
      }, {
        auth: {
          username: "your_test_key", // Replace with your Razorpay test key
          password: "your_test_secret", // Replace with your Razorpay secret key
        },
      });

      setPaymentDetails({
        orderId: response.data.id,
        product,
        buyer,
      });
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  return (
    <PaymentContext.Provider value={{ paymentDetails, initiatePayment }}>
      {children}
    </PaymentContext.Provider>
  );
};