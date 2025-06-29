/*
Template Name: Hando - Responsive Bootstrap 5 Admin Dashboard
Author: Zoyothemes
Version: 1.0.0
Website: https://zoyothemes.com/
File: Apexcharts Pie Charts
*/

//
// Simple Pie Chart
//
var options = {
  series: [44, 55, 13, 43, 22],
  chart: {
    height: 300,
    type: "pie",
    parentHeightOffset: 0,
  },
  labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
  legend: {
    position: "bottom",
  },
  colors: ["#287F71", "#522c8f", "#27ebb0", "#963b68", "#343a40"],
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: "bottom",
        },
      },
    },
  ],
};
var chart = new ApexCharts(
  document.querySelector("#simple_pie_chart"),
  options
);
chart.render();

//
// Simple Donut Chart
//
var options = {
  series: [44, 55, 41, 17, 15],
  chart: {
    height: 300,
    type: "donut",
    parentHeightOffset: 0,
  },
  legend: {
    position: "bottom",
  },
  colors: ["#287F71", "#963b68", "#c26316", "#108dff", "#01D4FF"],
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: "bottom",
        },
      },
    },
  ],
};
var chart = new ApexCharts(
  document.querySelector("#simple_donut_chart"),
  options
);
chart.render();

//
// Monochrome Pie Chart
//
var options = {
  series: [25, 15, 44, 55, 41, 17],
  chart: {
    height: 300,
    type: "pie",
    parentHeightOffset: 0,
  },
  labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  colors: ["#287F71", "#01D4FF"],
  theme: {
    monochrome: {
      enabled: true,
    },
  },
  plotOptions: {
    pie: {
      dataLabels: {
        offset: -5,
      },
    },
  },
  title: {
    text: "Monochrome Pie",
  },
  dataLabels: {
    formatter(val, opts) {
      const name = opts.w.globals.labels[opts.seriesIndex];
      return [name, val.toFixed(1) + "%"];
    },
  },
  legend: {
    show: false,
  },
};
var chart = new ApexCharts(
  document.querySelector("#monochrome_pie_chart"),
  options
);
chart.render();

//
// Gradient Donut Pie Charts
//
var options = {
  series: [44, 55, 41, 17, 15],
  chart: {
    height: 330,
    type: "donut",
    parentHeightOffset: 0,
  },
  plotOptions: {
    pie: {
      startAngle: -90,
      endAngle: 270,
    },
  },
  dataLabels: {
    enabled: false,
  },
  fill: {
    type: "gradient",
  },
  colors: ["#287F71", "#343a40", "#108dff", "#E7366B", "#E77636"],
  legend: {
    formatter: function (val, opts) {
      return val + " - " + opts.w.globals.series[opts.seriesIndex];
    },
    position: "bottom",
  },
  title: {
    text: "Gradient Donut With Custom Start-angle",
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: "bottom",
        },
      },
    },
  ],
};
var chart = new ApexCharts(
  document.querySelector("#gradient_donut_pie_chart"),
  options
);
chart.render();

//
// Semi Donut Pie Charts
//
var options = {
  series: [44, 55, 41, 17, 15],
  chart: {
    height: 300,
    type: "donut",
    parentHeightOffset: 0,
  },
  plotOptions: {
    pie: {
      startAngle: -90,
      endAngle: 90,
      offsetY: 10,
    },
  },
  grid: {
    borderColor: "#f1f1f1",
    padding: {
      bottom: -80,
    },
  },
  colors: ["#287F71", "#963b68", "#E77636", "#01D4FF", "#343a40"],
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: "bottom",
        },
      },
    },
  ],
};
var chart = new ApexCharts(
  document.querySelector("#semi_donut_pie_chart"),
  options
);
chart.render();

//
// Donut with Pattern Pie Chart
//

var options = {
  series: [44, 55, 41, 17, 15],
  chart: {
    height: 300,
    type: "donut",
    parentHeightOffset: 0,
    dropShadow: {
      enabled: true,
      color: "#111",
      top: -1,
      left: 3,
      blur: 3,
      opacity: 0.2,
    },
  },
  stroke: {
    width: 0,
  },
  plotOptions: {
    pie: {
      donut: {
        labels: {
          show: true,
          total: {
            showAlways: true,
            show: true,
          },
        },
      },
    },
  },
  labels: ["Comedy", "Action", "SciFi", "Drama", "Horror"],
  dataLabels: {
    dropShadow: {
      blur: 3,
      opacity: 0.8,
    },
  },
  fill: {
    type: "pattern",
    opacity: 1,
    pattern: {
      enabled: true,
      style: [
        "verticalLines",
        "squares",
        "horizontalLines",
        "circles",
        "slantedLines",
      ],
    },
  },
  states: {
    hover: {
      filter: "none",
    },
  },
  theme: {
    palette: "palette2",
  },
  title: {
    text: "Favourite Movie Type",
  },
  colors: ["#f0f4f7", "#E77636", "#E7366B", "#4a5a6b", "#287F71"],
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: "bottom",
        },
      },
    },
  ],
};
var chart = new ApexCharts(
  document.querySelector("#pattern_donut_pie_chart"),
  options
);
chart.render();
