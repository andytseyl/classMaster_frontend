// "use client";

// import { useState, useEffect, Fragment } from "react";
// import { Chart as ChartJS, defaults } from "chart.js/auto";
// import { Bar, Doughnut, Line } from "react-chartjs-2";
// import Loading from "@/app/components/Loading";

// defaults.plugins.title.display = true;
// defaults.plugins.title.align = "start";
// defaults.plugins.title.font.size = 20;
// // defaults.plugins.title.color = "white";
// defaults.responsive = true;
// defaults.maintainAspectRatio = false;

// const Dashboard = () => {
//   const getCurrentYearMonth = () => {
//     const now = new Date();
//     const year = now.getFullYear();
//     const month = String(now.getMonth() + 1).padStart(2, "0");
//     return `${year}-${month}`;
//   };
//   const [dashboardData, setDashboardData] = useState({
//     backendMsg: null,
//     currentMonth: "--",
//     currentMonthRevenue: "--",
//     currentMonthAvgProfit: "--",
//     lastMonthAvgProfit: "--",
//     currentMonthParticipant: "--",
//     lastMonthParticipant: "--",
//     currentMonthParticipantFormatted: "--",
//     currentMonthAvgProfitFormatted: "--",
//     selectedMonth: getCurrentYearMonth() || "-- Select Month --",
//     yearData: [{ year_month: getCurrentYearMonth(), total_amount: 0 }],
//     programNames_Amount: [{ year_month: getCurrentYearMonth(), Name: 0 }],
//     programTypes_Amount: [{ year_month: getCurrentYearMonth(), Type: 0 }],
//     participantData_ProgramNames: [["ProgramA", 0]],
//     participantData_ProgramTypes: [["TypeA", 0]],
//     selectedYear_ProgramNames_Amount: "",
//     selectedDataset_ProgramNames_Amount: "All_Programs",
//     selectedYear_ProgramTypes_Amount: "",
//     selectedDataset_ProgramTypes_Amount: "All_Types",
//   });

//   // 替換原本的 setSelectedYear_ProgramNames_Amount
//   const setSelectedYear_ProgramNames_Amount = (year) => {
//     setDashboardData((prev) => ({
//       ...prev,
//       selectedYear_ProgramNames_Amount: year,
//     }));
//   };
//   const setSelectedYear_ProgramTypes_Amount = (year) => {
//     setDashboardData((prev) => ({
//       ...prev,
//       selectedYear_ProgramTypes_Amount: year,
//     }));
//   };

//   // 其他 setter 也類似
//   const setSelectedDataset_ProgramNames_Amount = (dataset) => {
//     setDashboardData((prev) => ({
//       ...prev,
//       selectedDataset_ProgramNames_Amount: dataset,
//     }));
//   };
//   const setSelectedDataset_ProgramTypes_Amount = (dataset) => {
//     setDashboardData((prev) => ({
//       ...prev,
//       selectedDataset_ProgramTypes_Amount: dataset,
//     }));
//   };

//   const setSelectedMonth = (month) => {
//     setDashboardData((prev) => ({
//       ...prev,
//       selectedMonth: month,
//     }));
//   };

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       const token = localStorage.getItem("token");
//       try {
//         const result = await fetch(
//           `${process.env.NEXT_PUBLIC_BACKEND_API}/get-revenue`,
//           {
//             method: "POST",
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         console.log("result", result);

//         const revenueDate = await result.json();

//         const getCurrentYearMonth = () => {
//           const now = new Date();
//           const year = now.getFullYear();
//           const month = String(now.getMonth() + 1).padStart(2, "0");
//           return `${year}-${month}`;
//         };

//         const getLastYearMonth = () => {
//           const now = new Date();
//           now.setMonth(now.getMonth() - 1);
//           const year = now.getFullYear();
//           const month = String(now.getMonth() + 1).padStart(2, "0");
//           return `${year}-${month}`;
//         };

//         const formatYearMonth = (dateString) => {
//           const date = new Date(dateString + "-01");
//           return date.toLocaleString("en-US", {
//             month: "short",
//             year: "numeric",
//           });
//         };

//         const formatNumber = (amount) => {
//           return `${Number(amount).toLocaleString()}`;
//         };
//         const currMonthRevenue = Math.floor(
//           revenueDate.resultGroupedByYearMonth.filter(
//             (revenueData) => revenueData.year_month === getCurrentYearMonth()
//           )[0].total_amount
//         );

//         const lastMonthRevenue = Math.floor(
//           revenueDate.resultGroupedByYearMonth.filter(
//             (revenueData) => revenueData.year_month === getLastYearMonth()
//           )[0].total_amount
//         );
//         const currMonthParti = revenueDate.resultGroupedByYearMonth.filter(
//           (revenueData) => revenueData.year_month === getCurrentYearMonth()
//         )[0].total_count;

//         const lastMonthParti = revenueDate.resultGroupedByYearMonth.filter(
//           (revenueData) => {
//             return revenueData.year_month === getLastYearMonth();
//           }
//         )[0].total_count;

//         setDashboardData((prevState) => ({
//           ...prevState,
//           backendMsg: true,
//           currentMonth: formatYearMonth(getCurrentYearMonth()),
//           currentMonthRevenue: formatNumber(currMonthRevenue),
//           currentMonthAvgProfit: formatNumber(
//             Math.floor(currMonthRevenue / currMonthParti)
//           ),
//           lastMonthAvgProfit: formatNumber(
//             Math.floor(lastMonthRevenue / lastMonthParti)
//           ),
//           currentMonthParticipant: currMonthParti,
//           lastMonthParticipant: lastMonthParti,
//           yearData: [
//             ...revenueDate.resultGroupedByYearMonth,
//             {
//               year_month: "2022-01",
//               total_amount: 1000,
//               total_count: 5,
//             },
//             {
//               year_month: "2022-02",
//               total_amount: 1800,
//               total_count: 3,
//             },
//             {
//               year_month: "2022-03",
//               total_amount: 2200,
//               total_count: 4,
//             },
//             {
//               year_month: "2022-04",
//               total_amount: 1500,
//               total_count: 6,
//             },
//             {
//               year_month: "2022-05",
//               total_amount: 1700,
//               total_count: 2,
//             },
//             {
//               year_month: "2022-06",
//               total_amount: 2000,
//               total_count: 4,
//             },
//             {
//               year_month: "2022-07",
//               total_amount: 1300,
//               total_count: 5,
//             },
//             {
//               year_month: "2022-09",
//               total_amount: 2400,
//               total_count: 7,
//             },
//             {
//               year_month: "2022-10",
//               total_amount: 1600,
//               total_count: 3,
//             },
//             {
//               year_month: "2022-12",
//               total_amount: 2500,
//               total_count: 8,
//             },
//             {
//               year_month: "2023-01",
//               total_amount: 1800,
//               total_count: 6,
//             },
//             {
//               year_month: "2023-02",
//               total_amount: 2100,
//               total_count: 5,
//             },
//             {
//               year_month: "2023-03",
//               total_amount: 2500,
//               total_count: 7,
//             },
//             {
//               year_month: "2023-04",
//               total_amount: 2300,
//               total_count: 4,
//             },
//             {
//               year_month: "2023-05",
//               total_amount: 2700,
//               total_count: 6,
//             },
//             {
//               year_month: "2023-06",
//               total_amount: 2900,
//               total_count: 5,
//             },
//             {
//               year_month: "2023-07",
//               total_amount: 3200,
//               total_count: 8,
//             },
//             {
//               year_month: "2023-08",
//               total_amount: 3500,
//               total_count: 9,
//             },
//             {
//               year_month: "2023-09",
//               total_amount: 3700,
//               total_count: 10,
//             },
//             {
//               year_month: "2023-10",
//               total_amount: 4000,
//               total_count: 11,
//             },
//             {
//               year_month: "2023-11",
//               total_amount: 4200,
//               total_count: 12,
//             },
//             {
//               year_month: "2023-12",
//               total_amount: 4500,
//               total_count: 13,
//             },
//           ],
//           programNames_Amount:
//             revenueDate.resultGroupedByYearMonth_programNames,
//           programTypes_Amount:
//             revenueDate.resultGroupedByYearMonth_programTypes,
//           participantData_ProgramNames:
//             revenueDate.resultGroupedByYearMonth_programNames_participantArray,
//           participantData_ProgramTypes:
//             revenueDate.resultGroupedByYearMonth_programTypes_participantArray,
//           currentMonthParticipantFormatted: formatNumber(currMonthParti),
//           currentMonthAvgProfitFormatted: formatNumber(
//             Math.floor(currMonthRevenue / currMonthParti)
//           ),
//         }));
//       } catch (err) {
//         console.log("Fetch Stats Error");
//         console.log(err);
//       }
//     };
//     fetchProfileData();
//   }, []);

//   if (!dashboardData.backendMsg) {
//     return <Loading />;
//   }

//   // ProgramNames Amount Starts
//   const years_ProgramNames_Amount = dashboardData.programNames_Amount
//     ? [
//         ...new Set(
//           dashboardData.programNames_Amount.map(
//             (data) => data.year_month.split("-")[0]
//           )
//         ),
//       ]
//     : [];

//   const filteredData_ProgramNames_Amount =
//     dashboardData.selectedYear_ProgramNames_Amount
//       ? dashboardData.programNames_Amount.filter((data) =>
//           data.year_month.startsWith(
//             dashboardData.selectedYear_ProgramNames_Amount
//           )
//         )
//       : dashboardData.programNames_Amount;

//   const datas_ProgramNames_Amount = filteredData_ProgramNames_Amount
//     ? [
//         ...new Set(
//           filteredData_ProgramNames_Amount.flatMap((data) =>
//             Object.keys(data).filter((key) => key !== "year_month")
//           )
//         ),
//       ]
//     : ["All_Programs"];

//   // ProgramNames Amount Ends

//   // ProgramTypes Amount Starts
//   const years_ProgramTypes_Amount = dashboardData.programTypes_Amount
//     ? [
//         ...new Set(
//           dashboardData.programTypes_Amount.map(
//             (data) => data.year_month.split("-")[0]
//           )
//         ),
//       ]
//     : [];

//   const filteredData_ProgramTypes_Amount =
//     dashboardData.selectedYear_ProgramTypes_Amount
//       ? dashboardData.programTypes_Amount.filter((data) =>
//           data.year_month.startsWith(
//             dashboardData.selectedYear_ProgramTypes_Amount
//           )
//         )
//       : dashboardData.programTypes_Amount;

//   const datas_ProgramTypes_Amount = filteredData_ProgramTypes_Amount
//     ? [
//         ...new Set(
//           filteredData_ProgramTypes_Amount.flatMap((data) =>
//             Object.keys(data).filter((key) => key !== "year_month")
//           )
//         ),
//       ]
//     : ["All_Programs"];

//   // ProgramTypes Amount Ends

//   const pieData_ProgramNames_Amount = dashboardData.programNames_Amount
//     ? dashboardData.programNames_Amount
//         .filter((data) => data.year_month === dashboardData.selectedMonth)
//         .map((data) =>
//           Object.entries(data).filter(
//             ([key]) => key !== "year_month" && key !== "All_Programs"
//           )
//         )
//         .flat()
//     : [["ProgramA", 0]];
//   const pieData_ProgramTypes_Amount = dashboardData.programTypes_Amount
//     ? dashboardData.programTypes_Amount
//         .filter((data) => data.year_month === dashboardData.selectedMonth)
//         .map((data) =>
//           Object.entries(data).filter(
//             ([key]) => key !== "year_month" && key !== "All_Types"
//           )
//         )
//         .flat()
//     : [["TypeA", 0]];

//   const compareMonthParti =
//     dashboardData.currentMonthParticipant -
//       dashboardData.lastMonthParticipant || "--";
//   const compareMonthPartiPercent = () => {
//     // Check if both values are valid numbers and not zero
//     if (
//       dashboardData.currentMonthParticipant &&
//       dashboardData.lastMonthParticipant
//     ) {
//       // Calculate percentage change
//       const percentChange =
//         (dashboardData.currentMonthParticipant /
//           dashboardData.lastMonthParticipant -
//           1) *
//         100;

//       // Round to whole number
//       return Math.round(percentChange) || "--";
//     }

//     return "--";
//   };
//   const compareMonthAvgProfit =
//     Math.floor(
//       dashboardData.currentMonthAvgProfit - dashboardData.lastMonthAvgProfit
//     ) || "--";
//   const compareMonthAvgProfitPercent =
//     Math.floor(
//       dashboardData.currentMonthAvgProfit / dashboardData.lastMonthAvgProfit - 1
//     ) * 100 || "--";

//   return (
//     <>
//       <div className="flex flex-col items-center w-full">
//         {/*-------------------------------- Key Numbers --------------------------------*/}
//         <div className="flex justify-center w-full">
//           <div className="mt-12 mb-4 stats stats-vertical lg:stats-horizontal shadow-md w-11/12 ">
//             <div className="stat">
//               <div className="stat-title">Month's profits</div>
//               <div className="stat-value">
//                 ${dashboardData.currentMonthRevenue}
//               </div>
//               <div className="stat-desc">{dashboardData.currentMonth}</div>
//             </div>
//             <div className="stat">
//               <div className="stat-title">Month's Participants</div>
//               <div className="stat-value">
//                 {dashboardData.currentMonthParticipantFormatted}
//               </div>
//               <div className="stat-desc">
//                 {compareMonthParti >= 0 ? (
//                   <span className="text-green-500">
//                     ↗︎ {compareMonthParti} (+{compareMonthPartiPercent()}%)
//                   </span>
//                 ) : (
//                   <span className="text-red-500">
//                     ↘ {isNaN(compareMonthParti) ? "--" : compareMonthParti} (
//                     {compareMonthPartiPercent()}%)
//                   </span>
//                 )}
//               </div>
//             </div>
//             <div className="stat">
//               <div className="stat-title">Average Profit per Participant</div>
//               <div className="stat-value">
//                 ${dashboardData.currentMonthAvgProfitFormatted}
//               </div>
//               <div className="stat-desc">
//                 {compareMonthAvgProfit >= 0 ? (
//                   <span className="text-green-500">
//                     ↗︎ ${compareMonthAvgProfit} ({compareMonthAvgProfitPercent}
//                     %)
//                   </span>
//                 ) : (
//                   <span className="text-red-500">
//                     ↘ ${compareMonthAvgProfit} ({compareMonthAvgProfitPercent}
//                     %)
//                   </span>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//         {/*---------------------------------- Year-over-year data START ----------------------------------*/}

//         <div className="flex justify-center text-2xl w-full font-semibold underline underline-offset-2 mb-4 mt-4">
//           Year-Over-Year Data
//         </div>
//         <div className="flex justify-around bg-base-200 p-4 rounded-2xl w-11/12 mb-4 shadow-md">
//           {/*-------------------------------- All Programs - Amount --------------------------------*/}
//           <div className="flex flex-col items-center min-h-56 w-5/12 bg-base-100 p-4 rounded-2xl shadow-md">
//             <>
//               <div className="w-11/12 min-h-56">
//                 <Line
//                   data={{
//                     labels: [
//                       "01",
//                       "02",
//                       "03",
//                       "04",
//                       "05",
//                       "06",
//                       "07",
//                       "08",
//                       "09",
//                       "10",
//                       "11",
//                       "12",
//                     ],
//                     datasets: [
//                       {
//                         // Current Year
//                         label: new Date().getFullYear(),
//                         data: dashboardData.yearData
//                           .filter((year) =>
//                             year.year_month.startsWith(new Date().getFullYear())
//                           )
//                           .map((year) => year.total_amount),
//                         borderRadius: 5,
//                       },
//                       {
//                         // Current Year - 1
//                         label: new Date().getFullYear() - 1,
//                         data: dashboardData.yearData
//                           .filter((year) =>
//                             year.year_month.startsWith(
//                               new Date().getFullYear() - 1
//                             )
//                           )
//                           .map((year) => year.total_amount),
//                         borderRadius: 5,
//                       },
//                       {
//                         // Current Year - 2
//                         label: new Date().getFullYear() - 2,
//                         data: dashboardData.yearData
//                           .filter((year) =>
//                             year.year_month.startsWith(
//                               new Date().getFullYear() - 2
//                             )
//                           )
//                           .map((year) => year.total_amount),
//                         borderRadius: 5,
//                       },
//                     ],
//                   }}
//                   options={{
//                     plugins: {
//                       title: {
//                         display: true,
//                         text: "All Profits (HKD)",
//                         align: "center",
//                         padding: {
//                           top: 10,
//                         },
//                       },
//                     },
//                   }}
//                 />
//               </div>
//             </>
//           </div>
//           {/*-------------------------------- All Programs - Participants --------------------------------*/}
//           <div className="flex flex-col items-center min-h-56 w-5/12 bg-base-100 p-4 rounded-2xl shadow-md">
//             {dashboardData.yearData && (
//               <>
//                 <div className="w-11/12 min-h-56">
//                   <Line
//                     data={{
//                       // labels: yearData.map((year) => year.year_month),
//                       labels: [
//                         "01",
//                         "02",
//                         "03",
//                         "04",
//                         "05",
//                         "06",
//                         "07",
//                         "08",
//                         "09",
//                         "10",
//                         "11",
//                         "12",
//                       ],
//                       datasets: [
//                         {
//                           // Current Year
//                           label: new Date().getFullYear(),
//                           data: dashboardData.yearData
//                             .filter((year) =>
//                               year.year_month.startsWith(
//                                 new Date().getFullYear()
//                               )
//                             )
//                             .map((year) => year.total_count),
//                           borderRadius: 5,
//                         },
//                         {
//                           // Current Year - 1
//                           label: new Date().getFullYear() - 1,
//                           data: dashboardData.yearData
//                             .filter((year) =>
//                               year.year_month.startsWith(
//                                 new Date().getFullYear() - 1
//                               )
//                             )
//                             .map((year) => year.total_count),
//                           borderRadius: 5,
//                         },
//                         {
//                           // Current Year - 2
//                           label: new Date().getFullYear() - 2,
//                           data: dashboardData.yearData
//                             .filter((year) =>
//                               year.year_month.startsWith(
//                                 new Date().getFullYear() - 2
//                               )
//                             )
//                             .map((year) => year.total_count),
//                           borderRadius: 5,
//                         },
//                       ],
//                     }}
//                     options={{
//                       plugins: {
//                         title: {
//                           display: true,
//                           text: "All Participants",
//                           align: "center",
//                           padding: {
//                             top: 10,
//                           },
//                         },
//                       },
//                     }}
//                   />
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//         {/*---------------------------------- Year-over-year data END ----------------------------------*/}
//         <div className="divider divider-secondary w-11/12 place-self-center"></div>
//         {/*-------------------------------- Profit START --------------------------------*/}
//         <div className="flex justify-center text-2xl w-full font-semibold underline underline-offset-2 mb-4 ">
//           Profit Breakdown
//         </div>
//         <div className="flex justify-around bg-base-200 p-4 rounded-2xl w-11/12 mb-4 shadow-md">
//           {/*-------------------------------- programNames Amount & Participant Number --------------------------------*/}
//           <div className="flex flex-col items-center min-h-64 w-5/12 bg-base-100 p-4 rounded-2xl shadow-md">
//             {dashboardData.programNames_Amount && (
//               <>
//                 {/* select */}
//                 <div className="flex justify-between w-4/6">
//                   {/* <label htmlFor="year-select">Select Year</label> */}
//                   <select
//                     id="year-select"
//                     onChange={(e) =>
//                       setSelectedYear_ProgramNames_Amount(e.target.value)
//                     }
//                     value={dashboardData.selectedYear_ProgramNames_Amount}
//                     className="select select-bordered w-2/5 overflow-y-auto max-w-xs max-h-[200px] select-sm"
//                   >
//                     <option value="">All Years</option>
//                     {years_ProgramNames_Amount.map((year) => (
//                       <option key={year} value={year}>
//                         {year}
//                       </option>
//                     ))}
//                   </select>

//                   {/* <label htmlFor="dataset-select">Select Dataset</label> */}
//                   <select
//                     id="dataset-select"
//                     onChange={(e) =>
//                       setSelectedDataset_ProgramNames_Amount(e.target.value)
//                     }
//                     value={dashboardData.selectedDataset_ProgramNames_Amount}
//                     className="select select-bordered w-3/5 overflow-y-auto max-w-xs max-h-[200px] select-sm"
//                   >
//                     {datas_ProgramNames_Amount.toSorted().map((data) => (
//                       <option key={data} value={data}>
//                         {data === "All_Programs" ? "All Programs" : data}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="w-11/12 min-h-56">
//                   <Bar
//                     data={{
//                       labels: filteredData_ProgramNames_Amount.map(
//                         (data) => data.year_month
//                       ),
//                       datasets: [
//                         {
//                           label: "Profits (HKD)",
//                           data: filteredData_ProgramNames_Amount.map(
//                             (data) =>
//                               data[
//                                 dashboardData
//                                   .selectedDataset_ProgramNames_Amount
//                               ]
//                           ),
//                           borderRadius: 5,
//                         },
//                       ],
//                     }}
//                     options={{
//                       plugins: {
//                         title: {
//                           display: true,
//                           text: `${
//                             dashboardData.selectedYear_ProgramNames_Amount ===
//                             ""
//                               ? "All Years"
//                               : dashboardData.selectedYear_ProgramNames_Amount
//                           } - ${
//                             dashboardData.selectedDataset_ProgramNames_Amount ===
//                             "All_Programs"
//                               ? "All Programs"
//                               : dashboardData.selectedDataset_ProgramNames_Amount
//                           }`,
//                           align: "center",
//                           padding: {
//                             top: 10,
//                           },
//                         },
//                       },
//                     }}
//                   />
//                 </div>
//               </>
//             )}
//           </div>
//           {/*-------------------------------- programTypes Amount  & Participant Number--------------------------------*/}
//           <div className="flex flex-col items-center min-h-64 w-5/12 bg-base-100 p-4 rounded-2xl shadow-md">
//             {dashboardData.programTypes_Amount && (
//               <>
//                 {/* select */}
//                 <div className="flex justify-between w-4/6">
//                   {/* <label htmlFor="year-select">Select Year</label> */}
//                   <select
//                     id="year-select"
//                     onChange={(e) =>
//                       setSelectedYear_ProgramTypes_Amount(e.target.value)
//                     }
//                     value={dashboardData.selectedYear_ProgramTypes_Amount}
//                     className="select select-bordered w-2/5 overflow-y-auto max-w-xs max-h-[200px] select-sm"
//                   >
//                     <option value="">All Years</option>
//                     {years_ProgramTypes_Amount.map((year) => (
//                       <option key={year} value={year}>
//                         {year}
//                       </option>
//                     ))}
//                   </select>

//                   {/* <label htmlFor="dataset-select">Select Dataset</label> */}
//                   <select
//                     id="dataset-select"
//                     onChange={(e) =>
//                       setSelectedDataset_ProgramTypes_Amount(e.target.value)
//                     }
//                     value={dashboardData.selectedDataset_ProgramTypes_Amount}
//                     className="select select-bordered w-3/5 overflow-y-auto max-w-xs max-h-[200px] select-sm"
//                   >
//                     {datas_ProgramTypes_Amount.toSorted().map((data) => (
//                       <option key={data} value={data}>
//                         {data === "All_Types" ? "All Types" : data}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="w-11/12 min-h-56">
//                   <Bar
//                     data={{
//                       labels: filteredData_ProgramTypes_Amount.map(
//                         (data) => data.year_month
//                       ),
//                       datasets: [
//                         {
//                           label: "Profits (HKD)",
//                           data: filteredData_ProgramTypes_Amount.map(
//                             (data) =>
//                               data[
//                                 dashboardData
//                                   .selectedDataset_ProgramTypes_Amount
//                               ]
//                           ),
//                           borderRadius: 5,
//                         },
//                       ],
//                     }}
//                     options={{
//                       plugins: {
//                         title: {
//                           display: true,
//                           text: `${
//                             dashboardData.selectedYear_ProgramTypes_Amount ===
//                             ""
//                               ? "All Years"
//                               : dashboardData.selectedYear_ProgramTypes_Amount
//                           } - ${
//                             dashboardData.selectedDataset_ProgramTypes_Amount ===
//                             "All_Types"
//                               ? "All Types"
//                               : dashboardData.selectedDataset_ProgramTypes_Amount
//                           }`,
//                           align: "center",
//                           padding: {
//                             top: 10,
//                           },
//                         },
//                       },
//                     }}
//                   />
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//         {/*-------------------------------- Profit END --------------------------------*/}
//         <div className="divider divider-secondary w-11/12 place-self-center"></div>
//         {/*---------------------------------- Monthly Data Breakdown START ----------------------------------*/}
//         <div className="flex justify-center text-2xl w-full font-semibold underline underline-offset-2 mb-4">
//           Monthly Data Breakdown
//         </div>
//         <div className="flex justify-around bg-base-200 p-4 rounded-2xl w-11/12 mb-4 shadow-md">
//           {/*---------------------------------- Select Bar ----------------------------------*/}
//           <div className="flex flex-col w-full">
//             <div className="flex justify-center w-full mb-4">
//               {/* <label htmlFor="month-select">Select Month</label> */}
//               <select
//                 id="month-select"
//                 onChange={(e) => setSelectedMonth(e.target.value)}
//                 value={dashboardData.selectedMonth}
//                 className="select select-bordered w-1/5 overflow-y-auto max-w-xs max-h-[200px] select-sm"
//               >
//                 {/* <option value="">-- Select Month --</option> */}
//                 {dashboardData.programNames_Amount &&
//                   [
//                     ...new Set(
//                       dashboardData.programNames_Amount.map(
//                         (data) => data.year_month
//                       )
//                     ),
//                   ].map((month) => (
//                     <option key={month} value={month}>
//                       {month}
//                     </option>
//                   ))}
//               </select>
//             </div>
//             {/* Monthly Data Breakdown (ProgramNames & ProgramTypes) - Amount */}
//             <div className="flex justify-around w-full mb-4">
//               {dashboardData.selectedMonth &&
//                 pieData_ProgramNames_Amount.length > 0 && (
//                   <div className="min-h-64 w-5/12 bg-base-100 p-4 rounded-2xl shadow-md">
//                     <Doughnut
//                       data={{
//                         labels: pieData_ProgramNames_Amount.map(
//                           ([label]) => label
//                         ),
//                         datasets: [
//                           {
//                             label: "Profits (HKD)",
//                             data: pieData_ProgramNames_Amount.map(
//                               ([, value]) => value
//                             ),
//                             backgroundColor: [
//                               "#FF6384", // Pink
//                               "#36A2EB", // Blue
//                               "#FFCE56", // Yellow
//                               "#4BC0C0", // Teal
//                               "#9966FF", // Purple
//                               "#FF9F40", // Orange
//                               "#4DFFB8", // Mint Green
//                               "#FF6B9E", // Soft Pink
//                             ],
//                           },
//                         ],
//                       }}
//                       options={{
//                         plugins: {
//                           title: {
//                             display: true,
//                             text: `Profits by Program`,
//                             align: "center",
//                           },
//                         },
//                       }}
//                     />
//                   </div>
//                 )}
//               {dashboardData.selectedMonth &&
//                 pieData_ProgramTypes_Amount.length > 0 && (
//                   <div className="min-h-64 w-5/12 bg-base-100 p-4 rounded-2xl shadow-md">
//                     <Doughnut
//                       data={{
//                         labels: pieData_ProgramTypes_Amount.map(
//                           ([label]) => label
//                         ),
//                         datasets: [
//                           {
//                             label: "Profits",
//                             data: pieData_ProgramTypes_Amount.map(
//                               ([, value]) => value
//                             ),
//                             backgroundColor: [
//                               "#FF6384", // Pink
//                               "#36A2EB", // Blue
//                               "#FFCE56", // Yellow
//                               "#4BC0C0", // Teal
//                               "#9966FF", // Purple
//                               "#FF9F40", // Orange
//                               "#4DFFB8", // Mint Green
//                               "#FF6B9E", // Soft Pink
//                             ],
//                           },
//                         ],
//                       }}
//                       options={{
//                         plugins: {
//                           title: {
//                             display: true,
//                             text: `Profit by Type`,
//                             align: "center",
//                           },
//                         },
//                       }}
//                     />
//                   </div>
//                 )}
//             </div>
//             {/* Monthly Data Breakdown (ProgramNames & ProgramTypes) - Participant */}
//             <div className="flex  justify-around w-full">
//               {dashboardData.selectedMonth &&
//                 dashboardData.participantData_ProgramNames.length > 0 && (
//                   <div className="min-h-64 w-5/12 bg-base-100 p-4 rounded-2xl shadow-md">
//                     <Doughnut
//                       data={{
//                         labels: dashboardData.participantData_ProgramNames
//                           .filter(
//                             (data) =>
//                               data.year_month === dashboardData.selectedMonth
//                           )
//                           .map((data) =>
//                             Object.entries(data).filter(
//                               ([key]) => key !== "year_month"
//                             )
//                           )
//                           .flat()
//                           .map(([label]) => label),
//                         datasets: [
//                           {
//                             label: "Participants",
//                             data: dashboardData.participantData_ProgramNames
//                               .filter(
//                                 (data) =>
//                                   data.year_month ===
//                                   dashboardData.selectedMonth
//                               )
//                               .map((data) =>
//                                 Object.entries(data).filter(
//                                   ([key]) => key !== "year_month"
//                                 )
//                               )
//                               .flat()
//                               .map(([, value]) => value),
//                             backgroundColor: [
//                               "#FF6384", // Pink
//                               "#36A2EB", // Blue
//                               "#FFCE56", // Yellow
//                               "#4BC0C0", // Teal
//                               "#9966FF", // Purple
//                               "#FF9F40", // Orange
//                               "#4DFFB8", // Mint Green
//                               "#FF6B9E", // Soft Pink
//                             ],
//                           },
//                         ],
//                       }}
//                       options={{
//                         plugins: {
//                           title: {
//                             display: true,
//                             text: `Participants by Program`,
//                             align: "center",
//                           },
//                         },
//                       }}
//                     />
//                   </div>
//                 )}

//               {/* 新的 Doughnut Chart for Participants - Program Types */}
//               {dashboardData.selectedMonth &&
//                 dashboardData.participantData_ProgramTypes.length > 0 && (
//                   <div className="min-h-64 w-5/12 bg-base-100 p-4 rounded-2xl shadow-md">
//                     <Doughnut
//                       data={{
//                         labels: dashboardData.participantData_ProgramTypes
//                           .filter(
//                             (data) =>
//                               data.year_month === dashboardData.selectedMonth
//                           )
//                           .map((data) =>
//                             Object.entries(data).filter(
//                               ([key]) => key !== "year_month"
//                             )
//                           )
//                           .flat()
//                           .map(([label]) => label),
//                         datasets: [
//                           {
//                             label: "Participants",
//                             data: dashboardData.participantData_ProgramTypes
//                               .filter(
//                                 (data) =>
//                                   data.year_month ===
//                                   dashboardData.selectedMonth
//                               )
//                               .map((data) =>
//                                 Object.entries(data).filter(
//                                   ([key]) => key !== "year_month"
//                                 )
//                               )
//                               .flat()
//                               .map(([, value]) => value),
//                             backgroundColor: [
//                               "#FF6384", // Pink
//                               "#36A2EB", // Blue
//                               "#FFCE56", // Yellow
//                               "#4BC0C0", // Teal
//                               "#9966FF", // Purple
//                               "#FF9F40", // Orange
//                               "#4DFFB8", // Mint Green
//                               "#FF6B9E", // Soft Pink
//                             ],
//                           },
//                         ],
//                       }}
//                       options={{
//                         plugins: {
//                           title: {
//                             display: true,
//                             text: `Participants by Type`,
//                             align: "center",
//                           },
//                         },
//                       }}
//                     />
//                   </div>
//                 )}
//             </div>
//           </div>
//         </div>
//         {/*---------------------------------- Monthly Data Breakdown END ----------------------------------*/}
//       </div>
//       {/* )} */}
//     </>
//   );
// };

// export default Dashboard;
