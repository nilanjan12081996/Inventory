import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPieDashboardPieChart } from "../slices/DashBoardPieCharSlice";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ColChart = () => {
  const dispatch = useDispatch();
  const { pieData } = useSelector((state) => state.dashPie);
  console.log("pp", pieData);
  useEffect(() => {
    dispatch(getPieDashboardPieChart());
  }, [dispatch]);

  const data =
    pieData?.map((dta) => ({
      name: dta?.materialtype_code,
      count: dta?.count,
      percentage: dta?.percentage,
    })) || []; // Ensure data is an array even if pieData is null or undefined
  console.log(data);
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />

        <Bar dataKey="count" stackId="a" fill="#82ca9d" />
        <Bar dataKey="percentage" stackId="a" fill="#8884d8" />
        <Bar dataKey="name" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ColChart;
