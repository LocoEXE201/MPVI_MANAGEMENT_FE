import { formatDate } from "@/utils/utils";
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import OrderDetailsPopup from "./OrderDetailsTable";
import getOrderById from "@/api/services/service";

const TABLE_HEAD = [
  "Mã Đơn Hàng",
  "Mã Khách Hàng",
  "Ngày Đặt Hàng",
  "Tổng Giá Trị",
  "Trạng Thái Đơn Hàng",
  "Ghi Chú",
];

export function OrderTable({ orders, uos }: any) {
  const [id, setId]: any = useState("")
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const openOrderDetails = async (order: any) => {
    try {
        const detailedOrder = await getOrderById(order.orderId);
        setSelectedOrder(detailedOrder);
    } catch (error) {
        console.error("Error fetching order details:", error);
        // Handle error (e.g., show error message)
    }
};
const getOrdersById = async () => {
  getOrderById(id).then((res) => {
    setSelectedOrder(res.result)
  })
}
useEffect(() => {
  getOrdersById()
}, [id])
const closeOrderDetails = () => {
    setSelectedOrder(null);
};
  return (
    <div>
      <Card
        className="h-full w-full"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography
                variant="h5"
                color="blue-gray"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Danh Sách Đơn Hàng
              </Typography>
            </div>
          </div>
        </CardHeader>
        <CardBody
          className="overflow-scroll px-0"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={head}
                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      {head}{" "}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders?.map((order: any, index: any) => {
                const isLast = index === orders?.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={index}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                            placeholder={undefined}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                          >
                            {order?.orderId}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                            placeholder={undefined}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                          >
                            {order?.customerId}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        {order?.total}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={order?.paymentType + order?.orderStatus}
                        />
                      </div>
                      <select
                        onChange={(event) => {
                          uos(order?.orderId, event.target.value);
                        }}
                      >
                        <option value="_Pending">Pending</option>
                        <option value="_Payment_Successfully">
                          Payment_Successfully
                        </option>
                        <option value="_Arrived">Arrived</option>
                        <option value="_Completed">Completed</option>
                        <option value="_Refund">Refund</option>
                        <option value="_Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        {order?.notes}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                        onClick={() => openOrderDetails(order)}
                        style={{ cursor: "pointer" }}
                      >
                        Chi tiết
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
        <CardFooter
          className="flex items-center justify-between border-t border-blue-gray-50 p-4"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <Typography
            variant="small"
            color="blue-gray"
            className="font-normal"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Page 1 of 10
          </Typography>
          <div className="flex gap-2">
            <Button
              variant="outlined"
              size="sm"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Previous
            </Button>
            <Button
              variant="outlined"
              size="sm"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
      <div>
      {selectedOrder && (
        <OrderDetailsPopup
          order={selectedOrder}
          onClose={closeOrderDetails}
        />
      )}
    </div>
    </div>
  );
}
