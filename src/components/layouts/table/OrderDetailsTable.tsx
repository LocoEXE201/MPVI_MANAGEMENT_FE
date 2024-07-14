import React from "react";
interface OrderDetails {
    result: any;
    orderId: number;
    customerId: string;
    receiverName: string;
    receiverAddress: string;
    receiverPhoneNumber: string;
    total: number;
    createdOn: string; // Assuming this is a date string
    // Add more fields as needed
  }
interface OrderDetailsPopupProps {
  order: OrderDetails; // Replace 'any' with the type of your order object
  onClose: () => void; // Assuming onClose is a function that takes no parameters and returns void
}

const OrderDetailsPopup: React.FC<OrderDetailsPopupProps> = ({ order, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div
          className="fixed inset-0 transition-opacity"
          aria-hidden="true"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        {/* Popup content */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>
        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            {/* Order details content */}
            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
              Order Details
            </h3>
            <div className="mt-5" style={{ color: 'black' }}>
              {/* Display order details here */}
              <p>Mã đơn hàng: {order.result.orderId}</p>
              <p>Mã khách hàng: {order.result.customerId}</p>
              <p>Tên người nhận: {order.result.receiverName}</p>
              <p>Địa chỉ: {order.result.receiverAddress}</p>
              <p>Số điện thoại: {order.result.receiverPhoneNumber}</p>
              <p>Tổng: {order.result.total}</p>
              <p>Ngày tạo: {order.result.createdOn}</p>
              {/* Add more fields as needed */}
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            {/* Close button */}
            <button
              onClick={onClose}
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPopup;
