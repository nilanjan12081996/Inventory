import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useDispatch } from "react-redux";
import {
  getLineChart,
  getLineChartmstc,
} from "../../slices/DashBoardPieCharSlice";
import { useSelector } from "react-redux";
import { getMaterialType } from "../../slices/NewItemSlice";
import BarChart from "./BarChart";
import BarChart2 from "./Barchart2";
import PieChart from "./PieChart";
import PieChart2 from "./PieChart2";

const LineChartGraph = () => {
  const dispatch = useDispatch();
  const { mtype } = useSelector((state) => state.newItem);
  const { lineChart } = useSelector((state) => state.dashPie);
  console.log("l", lineChart);
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: "line",
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

  const [chartmstcData, setChartmstcData] = useState({
    series: [],
    options: {
      chart: {
        type: "line",
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

  const [selectedOption, setSelectedOption] = useState("select");
  useEffect(() => {
    dispatch(getMaterialType());
  }, [dispatch]);
  const handleChanges = (e) => {
    const selectedOption = e.target.value;

    setSelectedOption(selectedOption);
    if (selectedOption === "materialtype") {
      // Fetch and set chart data for Material Type
      dispatch(getLineChart())
        .then((res) => {
          const apiData = res.payload;
          const seriesData = apiData.map((item) => item.count);
          const Percentage = apiData.map((item) => item.percentage);
          const materialtypeCode = apiData.map(
            (item) => item.materialtype_code
          );

          setChartData({
            series: [
              { name: "Count", data: seriesData },
              { name: "Percentage", data: Percentage },
            ],
            options: {
              chart: {
                fontFamily: "Satoshi, sans-serif",
                type: "area",
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
                  show: true, // Show the toolbar
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
    } else if (selectedOption === "materialsubtype") {
      dispatch(getLineChartmstc({ materialTypeCode: e.target.value }))
        .then((res) => {
          const apiData = res.payload;
          const seriesData = apiData.map((item) => item.count);
          const Percentage = apiData.map((item) => item.percentage);
          const materialSubtypeCode = apiData.map(
            (item) => item.materialsubtype_code
          );

          setChartmstcData({
            series: [
              { name: "Count", data: seriesData },
              { name: "Percentage", data: Percentage },
            ],
            options: {
              chart: {
                fontFamily: "Satoshi, sans-serif",
                type: "area",
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
                  show: true, // Show the toolbar
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
                categories: materialSubtypeCode,

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
    }
  };

  const handleChange = (e) => {
    dispatch(getLineChartmstc({ materialTypeCode: e.target.value }))
      .then((res) => {
        const apiData = res.payload;
        const seriesData = apiData.map((item) => item.count);
        const Percentage = apiData.map((item) => item.percentage);
        const materialSubtypeCode = apiData.map(
          (item) => item.materialsubtype_code
        );

        setChartmstcData({
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
              categories: materialSubtypeCode,

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
  };
  return (
    <>
      <div className="wrapper_area max-w-7xl my-0 mx-auto px-0">
        <div className="bg-white mb-4 md:mb-0 py-6 px-6 shadow-md rounded-xl w-full h-full">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-medium text-[#556ee6]">
              Material Type and Material SubType Graph
            </h1>
          </div>

          <div>
            <select
              name=""
              id=""
              className="relative z-20 inline-flex appearance-none bg-transparent py-1 pl-3 pr-8 text-sm font-medium outline-none"
              onChange={(e) => handleChanges(e)}
              value={selectedOption}
            >
              <option value="select">Select</option>
              <option value="materialtype">Material Type</option>
              <option value="materialsubtype">Material Subtype</option>
            </select>
          </div>

          <div className="flex">
            {/* Material Type Chart */}
            {selectedOption === "materialtype" && (
              <div className="w-1/3">
                <div>
                  <BarChart />
                </div>
              </div>
            )}
            {selectedOption === "materialtype" && (
              <div className="w-1/3">
                <div>
                  <ReactApexChart
                    options={chartData.options}
                    series={chartData.series}
                    type="area"
                    height={350}
                  />
                </div>
              </div>
            )}
            {selectedOption === "materialtype" && (
              <div className="w-1/3">
                <PieChart />
              </div>
            )}
          </div>
          <br />

          <div className="flex">
            {/* Material Type Chart */}
            {selectedOption === "materialsubtype" && (
              <div className="w-1/3">
                <div>
                  <BarChart2 />
                </div>
              </div>
            )}
            {selectedOption === "materialsubtype" && (
              <div className="w-1/3">
                <div>
                  <select
                    name=""
                    id=""
                    className="relative z-20 inline-flex appearance-none bg-transparent py-1 pl-3 pr-8 text-sm font-medium outline-none"
                    onChange={(e) => handleChange(e)}
                  >
                    <option>Select</option>
                    {mtype.map((data) => (
                      <option key={data.id} value={data.materialtypeCode}>
                        {data.materialtypeCode}
                      </option>
                    ))}
                  </select>
                  <ReactApexChart
                    options={chartmstcData.options}
                    series={chartmstcData.series}
                    type="area"
                    height={350}
                  />
                </div>
              </div>
            )}
            {selectedOption === "materialsubtype" && (
              <div className="w-1/3">
                <PieChart2 />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LineChartGraph;
