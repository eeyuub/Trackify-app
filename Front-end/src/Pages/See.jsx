import React, { useEffect, useState } from 'react';

const SSEClient = () => {
  const [orderData, setOrderData] = useState(null);

    useEffect(() => {
        // Create a new EventSource instance to connect to the SSE endpoint
        const eventSource = new EventSource('http://localhost:3000/orders/new-order');

        // Listen for messages from the server
        eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setOrderData(data.order); // Update the state with the new order data
        };

        // Handle errors
        eventSource.onerror = (error) => {
        console.error('EventSource failed:', error);
        eventSource.close(); // Close the connection on error
        };

        // Cleanup function to close the connection when the component unmounts
        return () => {
        eventSource.close();
        };
    }, []);

  return (
    <>
      <div className='flex justify-center items-center h-[90vh]'>
        <h1>New Order</h1>
        {orderData ? (
          <pre>{JSON.stringify(orderData, null, 2)}</pre>
        ) : (
          <p>Waiting for new orders...</p>
        )}
      </div>
  
    </>
  );
};

export default SSEClient;