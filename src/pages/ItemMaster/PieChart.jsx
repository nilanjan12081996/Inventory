import { useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getPieDashboardPieChart } from "../../slices/DashBoardPieCharSlice";

const PieChart = () => {
  const dispatch = useDispatch();
  const { pieData } = useSelector((state) => state.dashPie);
  useEffect(() => {
   dispatch(getPieDashboardPieChart());
  }, [dispatch]);
  const series = pieData?.map((item) => item?.count);
  const labels =
    Array.isArray(pieData) && pieData?.map((item) => item?.materialtype_code);
  console.log("pp", pieData);
  const options = {
    chart: {
      type: "donut",
    },
    colors: ["#10B981", "#375E83", "#259AE6", "#FFA70B"],
    labels: labels,
    legend: {
      show: true,
      position: "bottom",
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          background: "transparent",
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
  };

  return (
    <>
    
      <div className="mb-3 justify-between gap-4 flex">
        <div>
        </div>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart options={options} series={series} type="donut" />
        </div>
      </div>

      <div className="-mx-8 flex flex-wrap  gap-y-3">
        {Array.isArray(pieData) &&
          pieData?.map((pie) => {
            return (
              <>
                <div className="w-full px-8 sm:w-1/2">
                  <div className="flex w-full items-center">
                    <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-primary"></span>
                    <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                      <span> {pie?.materialtype_code} </span>
                      <span>{pie?.percentage} %</span>
                    </p>
                  </div>
                </div>
              </>
            );
          })}
      </div>
      </>
  );
};

export default PieChart;
