import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { getLineChart, getLineChartmstc } from "../../slices/DashBoardPieCharSlice";
import { getMaterialType } from "../../slices/NewItemSlice";

const BarChart = () => {
  const dispatch = useDispatch();
//   const { mtype } = useSelector((state) => state.newItem);
//   const { lineChart } = useSelector((state) => state.dashPie);

  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: "bar", // Change type to bar
        height: 350,
        zoom: {
          enabled: true,
        },
      },
      xaxis: {
        categories: [],
      },
    },
  });

  useEffect(() => {
    dispatch(getMaterialType());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getLineChart())
      .then((res) => {
        const apiData = res.payload;
        const seriesData = apiData.map((item) => item.count);
        const Percentage = apiData.map((item) => item.percentage);
        const materialtypeCode = apiData.map((item) => item.materialtype_code);

        setChartData({
          series: [
            { name: "Count", data: seriesData },
            { name: "Percentage", data: Percentage },
          ],
          options: {
            chart: {
              fontFamily: "Satoshi, sans-serif",
              type: "bar", // Change type to bar
              height: 355,
              dropShadow: {
                enabled: true,
                color: "#623CEA14",
                top: 10,
                blur: 4,
                left: 0,
                opacity: 0.1,
              },
              zoom: {
                enabled: false,
              },
              toolbar: {
                show: true,
              },
            },
            colors: ["#3C50E0", "#80CAEE"],
            responsive: [
              {
                breakpoint: 1024,
                options: {
                  chart: {
                    height: 300,
                  },
                },
              },
              {
                breakpoint: 1366,
                options: {
                  chart: {
                    height: 350,
                  },
                },
              },
            ],
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: "55%",
                endingShape: "rounded",
              },
            },
            stroke: {
              width: [2, 2],
              curve: "straight",
            },
            grid: {
              xaxis: {
                lines: {
                  show: true,
                },
              },
              yaxis: {
                lines: {
                  show: true,
                },
              },
            },
            dataLabels: {
              enabled: false,
            },
            markers: {
              size: 4,
              colors: "#fff",
              strokeColors: ["#3056D3", "#80CAEE"],
              strokeWidth: 3,
              strokeOpacity: 0.9,
              strokeDashArray: 0,
              fillOpacity: 1,
              discrete: [],
              hover: {
                size: undefined,
                sizeOffset: 5,
              },
            },
            xaxis: {
              type: "category",
              categories: materialtypeCode,

              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
            },
          },
        });
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);

  return (
    <>
      <div className="wrapper_area max-w-7xl my-0 mx-auto px-0">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <div className="flex items-center mr-4">
                <div className="max-w-md me-2">
                  <div className="mb-0 block"></div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <ReactApexChart
              options={chartData.options}
              series={chartData.series}
              type="bar" 
              height={350}
            />
          </div>
        
      </div>
    
    </>
  );
};

export default BarChart;
