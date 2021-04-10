import React from "react";
import { render } from "react-dom";
import { Line } from "react-chartjs-2";
import "../Style/chartLine.css";
const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul"],
  datasets: [
    {
      label: "incom for this month",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "#e1c340",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [1500000, 3900000, 3000000, 4100000, 2300000, 1800000, 2000000],
    },
  ],
};

const lineOptions = {
  scales: {
    xAxes: [
      {
        gridLines: {
          display: false,
        },
      },
    ],
    yAxes: [
      {
        // stacked: true,
        gridLines: {
          display: false,
        },
        ticks: {
          beginAtZero: true,
          // Return an empty string to draw the tick line but hide the tick label
          // Return `null` or `undefined` to hide the tick line entirely
          userCallback(value) {
            // Convert the number to a string and splite the string every 3 charaters from the end
            value = value.toString();
            value = value.split(/(?=(?:...)*$)/);

            // Convert the array to a string and format the output
            value = value.join(".");
            return `${value} $`;
          },
        },
      },
    ],
  },
  legend: {
    display: false,
  },
  tooltips: {
    enabled: true,
  },
};

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
};

const ChartLine = () => (
  <div className="chartLine-ovrlay">
    <div className="chartLine-holder">
      <div style={styles}>
        <Line data={data} options={lineOptions} />
      </div>
    </div>
  </div>
);
export default ChartLine;
