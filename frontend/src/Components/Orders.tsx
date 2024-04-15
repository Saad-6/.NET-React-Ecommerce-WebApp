import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useCancelOrderMutation,
  useConfirmOrderMutation,
  useDelieverOrderMutation,
  useGetAllOrdersQuery,
} from '../apis/OrderAPI';
import CartItemModel from '../Interfaces/CartItemModel';

interface Order {
  id: string;
  userAddress: string;
  status: string;
  cartItems: CartItemModel[];
  total: number;
  dateTime: string;
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [newStatus, setNewStatus] = useState<string>('');
  const [confirmOrder] = useConfirmOrderMutation();
  const [cancelOrder] = useCancelOrderMutation();
  const [deliveredOrder] = useDelieverOrderMutation();
  const { data, isLoading, isError, refetch } = useGetAllOrdersQuery(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setOrders(data);
    }
  }, [data]);

  const handleStatusChange = async (order: Order) => {
    if (newStatus && order) {
      switch (newStatus) {
        case 'confirmed':
          await confirmOrder({ orderId: order.id });
          break;
        case 'delivered':
          await deliveredOrder({ orderId: order.id });
          break;
        case 'cancelled':
          await cancelOrder({ orderId: order.id });
          break;
        default:
          break;
      }
      await refetch(); // Fetch updated data
      setNewStatus('');
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;
console.log()
  return (
    <div>
      <h2>Manage Orders</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Order No</th>
            <th>Products and Quantities</th>
            <th>Total</th>
            <th>Address</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>
                <ul>
                  {order.cartItems.map((item, index) => (
                    <li key={index}>
                      {item.menuItem.name} - {item.quantity}
                    </li>
                  ))}
                </ul>
              </td>
              <td>{order.total}</td>
              <td>{order.userAddress}</td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) => {
                    setNewStatus(e.target.value);
                    setSelectedOrder(order);
                  }}
                >
                  <option >{order.status.toLocaleUpperCase()}</option>
                  <option value="confirmed">CONFIRMED</option>
                  <option value="delivered">DELIVERED</option>
                  <option value="cancelled">CANCELLED</option>
                </select>
              </td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleStatusChange(selectedOrder as Order)}
                >
                  Update Status
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
