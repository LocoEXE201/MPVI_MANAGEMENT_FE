import React from "react";
import axios from "axios";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonIcon from "@mui/icons-material/Person";
import PaymentsIcon from "@mui/icons-material/Payments";
import { LineChart } from "@mui/x-charts/LineChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

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
  const [data, setData] = React.useState<DashboardData | null>(null);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const [profitOfYear, setProfitOfYear] =React.useState<[]>([]);
  const [profitOfWeek, setProfitOfWeek] = React.useState<[]>([]);
  const [selectedDate, setSelectedDate] =React.useState<Dayjs>(dayjs("2024-06-12"));

 React.useEffect(() => {
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

    if (token) {
      fetchData();
    }
  }, [token]);

  React.useEffect(() => {
    const fetchProfitOfYear = async () => {
      try {
        const response = await axios.get(
          `http://14.225.211.1:8083/api/shop/ProfitThisYear?selectedYear=${selectedDate.format("YYYY-MM-DD")}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProfitOfYear(response.data.result.$values);
      } catch (error) {
        console.error("Error fetching the profit of the year data:", error);
      }
    };

    if (token) {
      fetchProfitOfYear();
    }
  }, [token, selectedDate]);

  React.useEffect(() => {
    const fetchProfitOfWeek = async () => {
      try {
        const response = await axios.get(
          `http://14.225.211.1:8083/api/shop/ProfitThisWeek?selectedWeek=${selectedDate.format("MM/DD/YYYY")}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProfitOfWeek(response.data.result.$values);
      } catch (error) {
        console.error("Error fetching the profit of the week data:", error);
      }
    };

    if (token) {
      fetchProfitOfWeek();
    }
  }, [token, selectedDate]);

  if (!data) {
    return <div>Loading...</div>;
  }

  const handleChangeDay = (date: Dayjs | null) => {
    if (date) {
      setSelectedDate(date);
    }
  };

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
                <PaymentsIcon className="w-6 h-6 text-white" fontSize="large" />
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
                <PersonIcon className="w-6 h-6 text-white" fontSize="large" />
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
                <PersonAddAlt1Icon
                  className="w-6 h-6 text-white"
                  fontSize="large"
                />
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
                <ShoppingCartOutlinedIcon
                  className="w-6 h-6 text-white"
                  fontSize="large"
                />
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
