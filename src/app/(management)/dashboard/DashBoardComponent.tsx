import React, { useEffect, useState } from "react";
import axios from "axios";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonIcon from "@mui/icons-material/Person";
import PaymentsIcon from "@mui/icons-material/Payments";
import { LineChart } from "@mui/x-charts/LineChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

interface DashboardData {
  total_money: number;
  last_month_total_money: string;
  total_user: number;
  last_month_total_user: string;
  new_client_inmonth: number;
  last_month_new_client_inmonth: string;
  total_sales_inmonth: number;
  last_month_total_sales_inmonth: string;
}

const DashBoardComponent: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const token = localStorage.getItem("accessToken");
  const [profitOfYear, setProfitOfYear] = useState([]);
  const [profitOfWeek, setProfitOfWeek] = useState([]);

  const [selectedDate, setSelectedDate] = useState(dayjs("06/12/2024"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://14.225.211.1:8083/api/shop/DashBoard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data.result);
      } catch (error) {
        console.error("Error fetching the dashboard data:", error);
      }
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    const fetchProfitOfYear = async () => {
      try {
        const response = await axios.get(
          `http://14.225.211.1:8083/api/shop/ProfitThisYear?selectedYear=${selectedDate.format("MM/DD/YYYY")}`,
          {
            headers: {
              Accept: "text/plain",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProfitOfYear(response.data.result.$values);
      } catch (error) {
        console.error("Error fetching the profit of the year data:", error);
      }
    };

    fetchProfitOfYear();
  }, [token, selectedDate]);

  useEffect(() => {
    const fetchProfitOfWeek = async () => {
      try {
        const response = await axios.get(
          `http://14.225.211.1:8083/api/shop/ProfitThisWeek?selectedWeek=${selectedDate.format("MM/DD/YYYY")}`,
          {
            headers: {
              Accept: "text/plain",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProfitOfWeek(response.data.result.$values);
      } catch (error) {
        console.error("Error fetching the profit of the year data:", error);
      }
    };

    fetchProfitOfWeek();
  }, [token, selectedDate]);

  if (!data) {
    return <div>Loading...</div>;
  }

  const handleChangeDay = (date: any) => {
    setSelectedDate(date);
  };

  // console.log(profitOfWeek);

  const today = dayjs();

  const chartSetting = {
    yAxis: [
      {
        label: "Money Unit (VND)",
      },
    ],
    series: [{ dataKey: "revenue", label: "VND" }],
    height: 300,
    sx: {
      [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
        transform: "translateX(-10px)",
      },
    },
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F1F5F9" }}>
      <div
        className="min-h-screen"
        style={{
          paddingLeft: "2rem",
          paddingRight: "2rem",
          paddingTop: "1.5rem",
        }}
      >
        <div className="min-h-screen">
          <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
            <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
              <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="w-6 h-6 text-white"
                > */}
                <PaymentsIcon className="w-6 h-6 text-white" fontSize="large">
                  <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"></path>
                  <path
                    fillRule="evenodd"
                    d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
                    clipRule="evenodd"
                  ></path>
                  <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z"></path>
                </PaymentsIcon>
              </div>
              <div className="p-4 text-right">
                <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                  Total Money
                </p>
                <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                  {(data.total_money ?? 0)
                    .toLocaleString("vi-VN")
                    .replace(/\./g, ",")}{" "}
                  VND
                </h4>
              </div>
              <div className="border-t border-blue-gray-50 p-4">
                <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                  <strong className="text-green-500">
                    {data.last_month_total_money ?? "0%"}
                  </strong>
                  &nbsp;than last month
                </p>
              </div>
            </div>
            <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
              <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-pink-600 to-pink-400 text-white shadow-pink-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="w-6 h-6 text-white"
                > */}
                <PersonIcon className="w-6 h-6 text-white" fontSize="large">
                  <path
                    fillRule="evenodd"
                    d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                    clipRule="evenodd"
                  ></path>
                </PersonIcon>
              </div>
              <div className="p-4 text-right">
                <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                  Total Users
                </p>
                <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                  {data.total_user ?? 0}
                </h4>
              </div>
              <div className="border-t border-blue-gray-50 p-4">
                <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                  <strong className="text-green-500">
                    {data.last_month_total_user ?? "0%"}
                  </strong>
                  &nbsp;than last month
                </p>
              </div>
            </div>
            <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
              <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-green-600 to-green-400 text-white shadow-green-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="w-6 h-6 text-white"
                > */}
                <PersonAddAlt1Icon
                  className="w-6 h-6 text-white"
                  fontSize="large"
                >
                  <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"></path>
                </PersonAddAlt1Icon>
              </div>
              <div className="p-4 text-right">
                <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                  New Clients
                </p>
                <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                  {data.new_client_inmonth ?? 0}
                </h4>
              </div>
              <div className="border-t border-blue-gray-50 p-4">
                <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                  <strong className="text-green-500">
                    {data.last_month_new_client_inmonth ?? "0%"}
                  </strong>
                  &nbsp;than last month
                </p>
              </div>
            </div>
            <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
              <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-orange-500 to-orange-400 text-white shadow-orange-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="w-6 h-6 text-white"
                > */}
                <ShoppingCartOutlinedIcon
                  className="w-6 h-6 text-white"
                  fontSize="large"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                    clipRule="evenodd"
                  ></path>
                </ShoppingCartOutlinedIcon>
              </div>
              <div className="p-4 text-right">
                <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                  Total Sales
                </p>
                <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                  {(data.total_sales_inmonth ?? 0)
                    .toLocaleString("vi-VN")
                    .replace(/\./g, ",")}{" "}
                  VND
                </h4>
              </div>
              <div className="border-t border-blue-gray-50 p-4">
                <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                  <strong className="text-green-500">
                    {data.last_month_total_sales_inmonth ?? "0%"}
                  </strong>
                  &nbsp;than last month
                </p>
              </div>
            </div>
          </div>

          {/* Code bên dưới là code cái phần table không quan trọng có thể xóa để thêm mây cái chart vào */}

          <div className="flex flex-row gap-4">
            <div className="bg-white rounded-xl overflow-hidden text-gray-700 shadow-none p-4 flex flex-col justify-center items-center content-cneter">
              <div>
                <DemoContainer components={["DatePicker"]}>
                  <DemoItem label="Chọn năm">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        views={["month", "day", "year"]}
                        value={selectedDate}
                        onChange={handleChangeDay}
                      />
                    </LocalizationProvider>
                  </DemoItem>
                </DemoContainer>
              </div>
              <LineChart
                dataset={profitOfYear}
                xAxis={[
                  {
                    scaleType: "band",
                    dataKey: "time",
                  },
                ]}
                series={[
                  // {
                  //   data: [2, 5.5, 2, 8.5, 1.5, 5, 12, 16, 11.5],
                  //   valueFormatter: (value) =>
                  //     value == null ? "NaN" : value.toString(),
                  //   area: true,
                  // },
                  {
                    dataKey: "revenue",
                    area: true,
                  },
                ]}
                width={900}
                height={200}
                margin={{ top: 10, bottom: 20 }}
              />
            </div>
            <div className="bg-white rounded-xl overflow-hidden text-gray-700 shadow-none p-4">
              <BarChart
                dataset={profitOfWeek}
                xAxis={[
                  {
                    scaleType: "band",
                    dataKey: "time",
                  },
                ]}
                {...chartSetting}
                width={500}
                height={300}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardComponent;
