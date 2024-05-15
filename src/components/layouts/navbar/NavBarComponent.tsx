"use client";
import React, { useState } from "react";
import "./Header.css"; // You can define your styles in a separate CSS file
import Search from "antd/es/input/Search";

const Header = () => {
  // State for managing the visibility of the user profile menu
  const [isUserProfileMenuOpen, setUserProfileMenuOpen] = useState(false);

  // Function to toggle the user profile menu
  const toggleUserProfileMenu = () => {
    setUserProfileMenuOpen(!isUserProfileMenuOpen);
  };

  return (
    <nav
      className="flex-grow-0 justify-between px-20 items-center bg-white"
      style={{ paddingBottom: "1.5rem", paddingTop: "1.5rem" }}
    >
      <div className="flex items-center">
        <div className="flex items-center">
          <Search placeholder="Type to Search..." style={{ width: "30rem" }} />
        </div>
        <div className="ml-auto">
          <ul className="flex items-center space-x-6 justify-end">
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4ZM20 8L12 13L4 8"
                />
              </svg>
            </li>
            <div className="user-profile flex" onClick={toggleUserProfileMenu}>
              <div style={{ marginRight: "0.5rem", textAlign: "right" }}>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  <li>Ánh Linh</li>
                  <li>Admin</li>
                </ul>
              </div>
              {/* Profile Picture */}
              <img
                src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1605"
                alt="User"
              />
              {/* User Profile Menu Dropdown */}
              {isUserProfileMenuOpen && (
                <div className="dropdown-menu">
                  <ul>
                    {/* <li>Username</li>
                    <li>User Role</li>
                    <li>Settings</li> */}
                    <li>Logout</li>
                  </ul>
                </div>
              )}
              <li
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: "0.5rem",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M6 8L12 14L18 8"
                  />
                </svg>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
