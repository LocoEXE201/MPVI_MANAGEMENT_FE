import {
  ActiveAccount,
  GetCodeForStaffList,
  SOCKET_SERVER_URL,
  UnactiveAccount,
} from "@/api/services/api";
import {
  CallApiGetToken,
  getStaffList,
  importStaffList,
} from "@/api/services/service";
import { getUserInfo } from "@/utils/jwt";
import { Grid } from "@mui/material";
import { Button } from "@nextui-org/react";
import { Console } from "console";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import io from "socket.io-client";

const UserList: React.FC = () => {
  const [userInfo, setUserInfo]: any = useState();
  const [users, setUsers]: any = useState();
  const [code, setCode]: any = useState("");
  // const socket = io(SOCKET_SERVER_URL);

  // useEffect(() => {
  //   socket.on('connect', () => {
  //     console.log('Connected to server');
  //   });

  //   // Listen for messages from the server
  //   socket.on('message', (data:any) => {
  //     toast.info(data)
  //   });

  //   sendMessage(`{"protocol":"json","version":1}`)

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, [])

  // const sendMessage = (message:any) => {
  //   socket.emit('message', message);
  // };

  const ActiveAcc = async (email: string) => {
    CallApiGetToken(`${ActiveAccount}?email=${email}`).then(() => {
      getSList();
    });
  };

  const UntiveAcc = async (email: string) => {
    CallApiGetToken(`${UnactiveAccount}?email=${email}`).then(() => {
      getSList();
    });
  };
  const importStaff = (file: any) => {
    importStaffList(file).then((res: any) => {
      console.log("import res", res);
      if (Object.keys(res?.result)?.length == 0) {
        toast.error("Import Staff Failed");
      } else {
        toast.success("Import Staff Successfully");
        getSList();
      }
    });
  };

  const getSList = async () => {
    if (code?.length > 0) {
      getStaffList(userInfo?.id, code)
        .then((res) => {
          console.log(res);
          setUsers(res.result);
        })
        .catch(() => {
          toast.error("Error Code");
        });
    } else {
      toast.warning("Insert code");
    }
  };

  const mapUser = () => {
    console.log("users", users);
    if (!users)
      return Array.from({ length: 10 }).map((_, index) => (
        <React.Fragment key={index}>{userDiv}</React.Fragment>
      ));
    else
      return users.map((staff: any, index: any) => (
        <React.Fragment key={index}>{userDiv2(staff)}</React.Fragment>
      ));
  };
  const getCode = async () => {
    CallApiGetToken(`${GetCodeForStaffList}?email=${userInfo?.email}`).then(
      () => {
        toast.success("check your email for code");
      }
    );
  };
  useEffect(() => {
    const userInfoStr: any = getUserInfo();
    setUserInfo(JSON.parse(userInfoStr));
  }, []);

  const userDiv = (
    <Grid item xs={12} sm={6} md={4} lg={2.4}>
      <div className="animate-pulse mx-auto right-0 mt-2 w-60">
        <div className="bg-white rounded overflow-hidden shadow-lg">
          <div className="text-center p-6 bg-gray-800 border-b">
            <svg
              aria-hidden="true"
              role="img"
              className="h-24 w-24 text-white rounded-full mx-auto"
              width="32"
              height="32"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 256 256"
            >
              <path
                fill="currentColor"
                d="M172 120a44 44 0 1 1-44-44a44 44 0 0 1 44 44Zm60 8A104 104 0 1 1 128 24a104.2 104.2 0 0 1 104 104Zm-16 0a88 88 0 1 0-153.8 58.4a81.3 81.3 0 0 1 24.5-23a59.7 59.7 0 0 0 82.6 0a81.3 81.3 0 0 1 24.5 23A87.6 87.6 0 0 0 216 128Z"
              ></path>
            </svg>
            <p className="pt-2 text-lg font-semibold text-gray-50"></p>
            <p className="text-sm text-gray-100"></p>
            <div className="mt-5">
              <div className="border rounded-full py-2 px-4 text-xs font-semibold text-gray-100">
                Manage your Account
              </div>
            </div>
          </div>
          <div className="border-b">
            <Link href="/account/campaigns">
              <div className="px-4 py-2 hover:bg-gray-100 flex">
                <div className="text-green-600">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                  >
                    <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <div className="pl-3">
                  <p className="text-sm font-medium text-gray-800 leading-none">
                    Campaigns
                  </p>
                  <p className="text-xs text-gray-500">View your campaigns</p>
                </div>
              </div>
            </Link>
            <Link href="/account/donations">
              <div className="px-4 py-2 hover:bg-gray-100 flex">
                <div className="text-gray-800">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                  >
                    <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="pl-3">
                  <p className="text-sm font-medium text-gray-800 leading-none">
                    Donations
                  </p>
                  <p className="text-xs text-gray-500">
                    View your last donations
                  </p>
                </div>
              </div>
            </Link>
          </div>

          <div>
            <button className="w-full px-4 py-2 pb-4 hover:bg-gray-100 flex">
              <p className="text-sm font-medium text-gray-800 leading-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="img"
                  className="h-4 w-4 text-gray-800 fill-current animate-spin"
                  width="32"
                  height="32"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 1024 1024"
                >
                  <path
                    fill="currentColor"
                    d="M988 548c-19.9 0-36-16.1-36-36c0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9a437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7c26.7 63.1 40.2 130.2 40.2 199.3c.1 19.9-16 36-35.9 36z"
                  ></path>
                </svg>{" "}
              </p>
            </button>
          </div>
        </div>
      </div>
    </Grid>
  );

  const userDiv2 = (staff: any) => (
    <Grid item xs={12} sm={6} md={4} lg={2.4}>
      <div className="mx-auto right-0 mt-2 w-60">
        <div className="bg-white rounded overflow-hidden shadow-lg">
          <div className="text-center p-6 bg-gray-800 border-b">
            <svg
              aria-hidden="true"
              role="img"
              className="h-24 w-24 text-white rounded-full mx-auto"
              width="32"
              height="32"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 256 256"
            >
              <path
                fill="currentColor"
                d="M172 120a44 44 0 1 1-44-44a44 44 0 0 1 44 44Zm60 8A104 104 0 1 1 128 24a104.2 104.2 0 0 1 104 104Zm-16 0a88 88 0 1 0-153.8 58.4a81.3 81.3 0 0 1 24.5-23a59.7 59.7 0 0 0 82.6 0a81.3 81.3 0 0 1 24.5 23A87.6 87.6 0 0 0 216 128Z"
              ></path>
            </svg>
            <p className="pt-2 text-lg font-semibold text-gray-50">
              {staff?.name}
            </p>
            <p className="text-sm text-gray-100">{staff?.email}</p>
            <div className="mt-5">
              <div className="border rounded-full py-2 px-4 text-xs font-semibold text-gray-100">
                Status: {staff?.status}
              </div>
            </div>
          </div>
          <div className="border-b">
            <Link href="/account/campaigns">
              <div className="px-4 py-2 hover:bg-gray-100 flex">
                <div className="text-green-600">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                  >
                    <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <div className="pl-3">
                  <p className="text-sm font-medium text-gray-800 leading-none">
                    Campaigns
                  </p>
                  <p className="text-xs text-gray-500">View your campaigns</p>
                </div>
              </div>
            </Link>
            <Link href="/account/donations">
              <div className="px-4 py-2 hover:bg-gray-100 flex">
                <div className="text-gray-800">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                  >
                    <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="pl-3">
                  <p className="text-sm font-medium text-gray-800 leading-none">
                    Donations
                  </p>
                  <p className="text-xs text-gray-500">
                    View your last donations
                  </p>
                </div>
              </div>
            </Link>
          </div>

          <div>
            <button
              onClick={() => {
                if (staff?.status == "Active") UntiveAcc(staff?.email);
                else ActiveAcc(staff?.email);
              }}
              className="w-full px-4 py-2 pb-4 hover:bg-gray-100 flex"
            >
              <p className="text-sm font-medium text-gray-800 leading-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="img"
                  className="h-4 w-4 text-gray-800 fill-current animate-spin"
                  width="32"
                  height="32"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 1024 1024"
                >
                  <path
                    fill="currentColor"
                    d="M988 548c-19.9 0-36-16.1-36-36c0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9a437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7c26.7 63.1 40.2 130.2 40.2 199.3c.1 19.9-16 36-35.9 36z"
                  ></path>
                </svg>{" "}
                {staff?.status == "Active" ? "Unactive" : "Active"}
              </p>
            </button>
          </div>
        </div>
      </div>
    </Grid>
  );

  return (
    <>
      <div className="flex h-20 px-10 justify-between items-center">
        <Button onPress={getCode} className="border">
          Nhận Mã
        </Button>
        <div className="flex items-center">
          <input
            value={code}
            onChange={(event) => setCode(event.target.value)}
            placeholder="Enter Here"
            className="border py-1 px-5 mr-3 text-black"
          />
          <Button onPress={getSList} className="border">
            Truy Xuất
          </Button>
        </div>
      </div>
      <Grid container spacing={2} style={{ backgroundColor: "#F1F5F9" }}>
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <input
            onChange={(event: any) => importStaff(event.target?.files[0])}
            hidden
            id="file"
            type="file"
          />
          <div
            onClick={() => {
              document.getElementById("file")?.click();
            }}
            className="group bg-gray-900/30 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-gray-900/40 hover:smooth-hover"
            style={{
              marginTop: "0.5rem",
              marginLeft: "1rem",
              paddingTop: "9rem",
              paddingBottom: "9rem",
              paddingLeft: 0,
              paddingRight: 0,
              width: "15.5rem",
            }}
          >
            <a
              className="bg-gray-900/70 text-white/50 group-hover:text-white group-hover:smooth-hover flex w-20 h-20 rounded-full items-center justify-center"
              href="#"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </a>
            <a
              className="text-white/50 group-hover:text-white group-hover:smooth-hover text-center"
              href="#"
            >
              Nhập Tệp
            </a>
          </div>
        </Grid>
        {mapUser()}
      </Grid>
    </>
  );
};

export default UserList;
