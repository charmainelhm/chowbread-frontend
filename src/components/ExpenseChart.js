import { Pie } from "react-chartjs-2";
import { Chart as ChartJs } from "chart.js/auto";

const hideLegend = {
  plugins: {
    legend: {
      display: false,
    },
  },
};

const ExpenseChart = ({ chartData }) => {
  return <Pie data={chartData} options={hideLegend} />;
};

export default ExpenseChart;
