// import React, { useEffect, useState } from "react";
// import Chart from "chart.js/auto";
// import { SortableTable } from "../table/CategoryTable";

// const CategoryComponent = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleDropdown = () => {
//     setIsOpen((prevIsOpen) => !prevIsOpen);
//   };

//   useEffect(() => {
//     const dataDoughnut = {
//       labels: ["JavaScript", "Python", "Ruby"],
//       datasets: [
//         {
//           label: "My First Dataset",
//           data: [300, 50, 100],
//           backgroundColor: [
//             "rgb(133, 105, 241)",
//             "rgb(164, 101, 241)",
//             "rgb(101, 143, 241)",
//           ],
//           hoverOffset: 4,
//         },
//       ],
//     };

//     const configDoughnut = {
//       type: "doughnut",
//       data: dataDoughnut,
//       options: {},
//     };

//     const chartDoughnut = new Chart(
//       document.getElementById("chartDoughnut"),
//       configDoughnut
//     );

//     return () => {
//       chartDoughnut.destroy();
//     };
//   }, []);

//   useEffect(() => {
//     const dataDoughnuts = {
//       labels: ["Script", "Python", "Ruby"],
//       datasets: [
//         {
//           label: "My First Dataset",
//           data: [300, 50, 100],
//           backgroundColor: [
//             "rgb(133, 105, 241)",
//             "rgb(164, 101, 241)",
//             "rgb(101, 143, 241)",
//           ],
//           hoverOffset: 4,
//         },
//       ],
//     };

//     const configDoughnut = {
//       type: "doughnut",
//       data: dataDoughnuts,
//       options: {},
//     };

//     const chartDoughnut = new Chart(
//       document.getElementById("chartDoughnuts"),
//       configDoughnut
//     );

//     return () => {
//       chartDoughnut.destroy();
//     };
//   }, []);

//   useEffect(() => {
//     const dataDoughnutss = {
//       labels: ["Script", "C#", "Ruby"],
//       datasets: [
//         {
//           label: "My First Dataset",
//           data: [300, 50, 100],
//           backgroundColor: [
//             "rgb(133, 105, 241)",
//             "rgb(164, 101, 241)",
//             "rgb(101, 143, 241)",
//           ],
//           hoverOffset: 4,
//         },
//       ],
//     };

//     const configDoughnut = {
//       type: "doughnut",
//       data: dataDoughnutss,
//       options: {},
//     };

//     const chartDoughnut = new Chart(
//       document.getElementById("chartDoughnutss"),
//       configDoughnut
//     );

//     return () => {
//       chartDoughnut.destroy();
//     };
//   }, []);

//   return (
//     <div className="" style={{ backgroundColor: '#F1F5F9' }}>
//       <div className="above flex justify-around">
//         <div className="flex">
//           <div className="relative group">
//             <button
//               onClick={toggleDropdown}
//               className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
//             >
//               <span className="mr-2">Open Dropdown</span>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="w-5 h-5 ml-2 -mr-1"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//                 aria-hidden="true"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </button>
//             {isOpen && (
//               <div className="absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1">
//                 <input
//                   className="block w-full px-4 py-2 text-gray-800 border rounded-md border-gray-300 focus:outline-none"
//                   type="text"
//                   placeholder="Search items"
//                 />
//                 <a
//                   href="#"
//                   className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md"
//                 >
//                   Uppercase
//                 </a>
//                 <a
//                   href="#"
//                   className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md"
//                 >
//                   Lowercase
//                 </a>
//                 <a
//                   href="#"
//                   className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md"
//                 >
//                   Camel Case
//                 </a>
//                 <a
//                   href="#"
//                   className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md"
//                 >
//                   Kebab Case
//                 </a>
//               </div>
//             )}
//           </div>
//         </div>
//         <div
//           className="flex shadow-lg rounded-lg overflow-hidden"
//           style={{ backgroundColor: "white" }}
//         >
//           <div className="">
//             <div
//               className="py-1 px-5 bg-gray-50"
//               style={{ fontWeight: "bold" }}
//             >
//               Doughnut chart
//             </div>
//             <canvas
//               className=""
//               id="chartDoughnut"
//               style={{ width: "200px", height: "200px" }}
//             ></canvas>
//             <div
//               style={{
//                 textAlign: "center",
//                 fontFamily: "sans-serif",
//                 fontSize: "smaller",
//               }}
//             >
//               Warehouse available
//             </div>
//           </div>
//           <div className="">
//             <div className="" style={{ paddingBottom: "2rem" }}></div>
//             <canvas
//               className=""
//               id="chartDoughnuts"
//               style={{ width: "200px", height: "200px" }}
//             ></canvas>
//             <div
//               style={{
//                 textAlign: "center",
//                 fontFamily: "sans-serif",
//                 fontSize: "smaller",
//               }}
//             >
//               Category stonk
//             </div>
//           </div>
//           <div className="">
//             <div className="" style={{ paddingBottom: "2rem" }}></div>
//             <canvas
//               className=""
//               id="chartDoughnutss"
//               style={{ width: "200px", height: "200px" }}
//             ></canvas>
//             <div
//               style={{
//                 textAlign: "center",
//                 fontFamily: "sans-serif",
//                 fontSize: "smaller",
//               }}
//             >
//               Category in low
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="below">
//         <SortableTable/>
//       </div>
//     </div>
//   );
// };

// export default CategoryComponent;
