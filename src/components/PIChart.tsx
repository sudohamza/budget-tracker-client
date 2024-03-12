import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { Card } from "antd";

type ChartData = {
  name: string;
  data: number;
  color: string;
};

type PICartData = {
  data: Array<ChartData>;
};

const PIChart: React.FC<PICartData> = ({ data }) => {
  const labels = data.map((item) => item.name);
  const colors = data.map((item) => item.color);
  const series = data.map((item) => item.data);

  const options: ApexOptions = {
    chart: {
      type: "pie",
    },
    labels,
    series,
    colors,
    legend: {
      show: true,
      position: "top",
    },
  };

  return (
    <div>
      <Card>
        <ReactApexChart
          type="pie"
          width={400}
          series={series}
          options={options}
        />
      </Card>
    </div>
  );
};

export default PIChart;
