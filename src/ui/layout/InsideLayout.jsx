import { useEffect, useState } from "react";
import { Suspense } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../layout/header";
import Sidebar from "../layout/Sidebar";
import { useDispatch } from "react-redux";
import { logout } from "../../slices/AuthSlice";
import PageLoader from "./loader/PageLoader";
const InsideLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const token = JSON.parse(sessionStorage.getItem("adminToken")) || null;
  let error = false;
  if (token === null) {
    error = true;
  } else if (
    typeof token !== "object" ||
    (typeof token === "object" && !token?.token)
  ) {
    error = true;
  }
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      dispatch(logout());
      navigate("/");
    }
  }, [error, dispatch, navigate]);
  return (
    <>
      <div className="dark:bg-boxdark-2 dark:text-bodydark">
        {/* <!-- ===== Page Wrapper Start ===== --> */}
        <div className="flex h-screen overflow-hidden">
          {/* <!-- ===== Sidebar Start ===== --> */}
          {/* <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}
          {/* <!-- ===== Sidebar End ===== --> */}

          {/* <!-- ===== Content Area Start ===== --> */}
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden bg-gray-100">
            {/* <!-- ===== Header Start ===== --> */}
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            {/* <!-- ===== Header End ===== --> */}

            {/* <!-- ===== Main Content Start ===== --> */}
            <main>
              <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                <Suspense fallback={<PageLoader />}>
                  <Outlet />
                </Suspense>
              </div>
            </main>
            {/* <!-- ===== Main Content End ===== --> */}
          </div>
          {/* <!-- ===== Content Area End ===== --> */}
        </div>
        {/* <!-- ===== Page Wrapper End ===== --> */}
      </div>
    </>
  );
};

export default InsideLayout;
