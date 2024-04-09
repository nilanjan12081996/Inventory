import { Suspense } from "react";
import DashboardCard from "../../components/DashboardCard.jsx";
import ChartThree from "../../components/ChartThree.jsx";
import ChartTwo from "../../components/ChartTwo.jsx";
import ColChart from "../../components/ColChart.jsx";

const Dashboard = () => {
  const roles = localStorage.getItem("userRole");
  console.log("item master Role: ", roles);
  return (
    <div className="wrapper_area max-w-7xl my-0 mx-auto px-0">
      <div className="bg-white mb-4 md:mb-0 py-6 px-6 shadow-md rounded-xl w-full h-full">
        <h1 className="text-2xl font-medium text-[#556ee6] mb-4">Dashboard</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          <Suspense fallback={"loading..."}>
            {roles === "ROLE_QAEXECUTIVE" ||
            roles === "ROLE_WHEXECUTIVE" ||
            roles === "ROLE_HREXECUTIVE" ? (
              <></>
            ) : (
              <DashboardCard />
            )}
          </Suspense>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            {roles === "ROLE_QAEXECUTIVE" ||
            roles === "ROLE_WHEXECUTIVE" ||
            roles === "ROLE_HREXECUTIVE" ||
            roles === "ROLE_HRSUPERVISOR" ||
            roles === "ROLE_USER" ? (
              <></>
            ) : (
              <ChartTwo />
            )}
          </div>
          <div>
            {roles === "ROLE_QAEXECUTIVE" ||
            roles === "ROLE_WHEXECUTIVE" ||
            roles === "ROLE_HREXECUTIVE" ||
            roles === "ROLE_HRSUPERVISOR" ||
            roles === "ROLE_USER" ? (
              <></>
            ) : (
              <ChartThree />
            )}
          </div>
          <div>
            {roles === "ROLE_QAEXECUTIVE" ||
            roles === "ROLE_WHEXECUTIVE" ||
            roles === "ROLE_HREXECUTIVE" ||
            roles === "ROLE_HRSUPERVISOR" ||
            roles === "ROLE_USER" ? (
              <></>
            ) : (
              <ColChart />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
