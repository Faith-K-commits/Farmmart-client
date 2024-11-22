import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function CheckoutPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [billingDetails, setBillingDetails] = useState({
    name: '',
    email: '',
    addressLine1: '',
    addressLine2: '',
  });
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expirationMonth: '',
    expirationYear: '',
    cvc: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const navigate = useNavigate();

  // Fetch order and order items
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/orders/1`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setOrder(data);

        const itemsResponse = await fetch(`/api/orderitems?order_id=1`);
        if (!itemsResponse.ok) {
          throw new Error(`HTTP error! status: ${itemsResponse.status}`);
        }
        const itemsData = await itemsResponse.json();
        setOrderItems(itemsData.items);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchOrder();
  }, [orderId]);

  const handlePlaceOrder = async () => {
    try {
      // Send payment details to the backend
      const paymentResponse = await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order_id: 1,
          user_id: 1,
          amount: total,
        }),
      });

      if (!paymentResponse.ok) {
        throw new Error('Payment processing failed');
      }

      const paymentData = await paymentResponse.json();

      // Mark the order as complete
      const orderResponse = await fetch(`/api/orders/${orderId}/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to complete the order');
      }

      alert('Order placed successfully!');
      navigate(`/order-confirmation/${orderId}`);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('There was an issue placing your order. Please try again.');
    }
  };


  const total = orderItems.reduce((sum, item) => sum + (item.subtotal || 0), 0);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 shadow rounded-lg">
        {/* Billing Details */}
        <h2 className="text-2xl font-semibold mb-4">Billing Details</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            placeholder="First & Last Name"
            className="border border-gray-300 rounded-lg p-2"
            value={billingDetails.name}
            onChange={(e) =>
              setBillingDetails({ ...billingDetails, name: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Email Address"
            className="border border-gray-300 rounded-lg p-2"
            value={billingDetails.email}
            onChange={(e) =>
              setBillingDetails({ ...billingDetails, email: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Address Line 1"
            className="border border-gray-300 rounded-lg p-2 col-span-2"
            value={billingDetails.addressLine1}
            onChange={(e) =>
              setBillingDetails({ ...billingDetails, addressLine1: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Address Line 2"
            className="border border-gray-300 rounded-lg p-2 col-span-2"
            value={billingDetails.addressLine2}
            onChange={(e) =>
              setBillingDetails({ ...billingDetails, addressLine2: e.target.value })
            }
          />
        </div>

        {/* Order Summary */}
        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
        <div className="border border-gray-300 rounded-lg p-4 mb-6">
          {orderItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center py-2 border-b last:border-none"
            >
              <div>
                <p className="font-medium">{item.animal_id}</p>
                <p className="text-gray-500">Qty: {item.quantity}</p>
              </div>
              <p className="font-medium text-gray-700">sh. {item.unit_price.toFixed(2)}</p>
            </div>
          ))}
          <div className="flex justify-between items-center text-lg mt-4">
            <p>Total:</p>
            <p>sh. {total.toFixed(2)}</p>
          </div>
        </div>

        {/* Payment Method */}
        <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
        <label className="flex items-center space-x-2 mb-4">
          <input
            type="radio"
            name="paymentMethod"
            value="creditCard"
            className="w-4 h-4"
            checked={paymentMethod === 'creditCard'}
            onChange={() => setPaymentMethod('creditCard')}
          />
          <span>Credit Card</span>
        </label>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            placeholder="Card Number"
            className="border border-gray-300 rounded-lg p-2 col-span-3"
            value={paymentDetails.cardNumber}
            onChange={(e) =>
              setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="MM"
            className="border border-gray-300 rounded-lg p-2"
            value={paymentDetails.expirationMonth}
            onChange={(e) =>
              setPaymentDetails({ ...paymentDetails, expirationMonth: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="YY"
            className="border border-gray-300 rounded-lg p-2"
            value={paymentDetails.expirationYear}
            onChange={(e) =>
              setPaymentDetails({ ...paymentDetails, expirationYear: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="CVC"
            className="border border-gray-300 rounded-lg p-2"
            value={paymentDetails.cvc}
            onChange={(e) =>
              setPaymentDetails({ ...paymentDetails, cvc: e.target.value })
            }
          />
        </div>
      </div>

      {/* Place Order Button */}
      <div className="flex justify-center mt-6">
        <button
          className="w-80 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105"
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

export default CheckoutPage;
