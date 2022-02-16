import React, { useEffect } from "react";
import { render } from "react-dom";
import { Line } from "react-chartjs-2";

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul"],
  datasets: [
    {
      fill: false,
      lineTension: 0.2,
      // backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "#54cc7d",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "#54cc7d",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "#54cc7d",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [1500000, 3900000, 3000000, 4100000, 2300000, 1800000, 2000000],
      fill: "start",
      backgroundColor: "#54cc7d14"
    },
  ],
};

const lineOptions = {
  plugins: {
    legend: {
      display: false,
    },
    gridLines: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
  legend: {
    display: false,
  },
  tooltips: {
    mode: 'index',
    intersect: false
},
hover: {
    mode: 'index',
    intersect: false
}
};

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
};

const Chart = () => {
 
  return (
    <div style={styles}>
      <Line width={900} height={300} data={data} options={lineOptions} />
    </div>
  );
};

export default Chart;
