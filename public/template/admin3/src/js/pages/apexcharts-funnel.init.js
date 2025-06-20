/*
Template Name: Hando - Responsive Bootstrap 5 Admin Dashboard
Author: Zoyothemes
Version: 1.0.0
Website: https://zoyothemes.com/
File: Apexcharts Funnel Chart
*/

//
// Funnel Chart
//
var options = {
  series: [
    {
      name: "Funnel Series",
      data: [1380, 1100, 990, 880, 740, 548, 330, 200],
    },
  ],
  chart: {
    type: "bar",
    height: 350,
    parentHeightOffset: 0,
  },
  colors: ["#108dff"],
  plotOptions: {
    bar: {
      borderRadius: 0,
      horizontal: true,
      barHeight: "80%",
      isFunnel: true,
    },
  },
  dataLabels: {
    enabled: true,
    formatter: function (val, opt) {
      return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
    },
    dropShadow: {
      enabled: true,
    },
  },
  title: {
    text: "Recruitment Funnel",
    align: "middle",
  },
  xaxis: {
    categories: [
      "Sourced",
      "Screened",
      "Assessed",
      "HR Interview",
      "Technical",
      "Verify",
      "Offered",
      "Hired",
    ],
  },
  legend: {
    show: false,
  },
};
var chart = new ApexCharts(document.querySelector("#funnel_chart"), options);
chart.render();

//
// Pyramid Funnel Chart
//
var options = {
  series: [
    {
      name: "",
      data: [200, 330, 548, 740, 880, 990, 1100, 1380],
    },
  ],
  chart: {
    type: "bar",
    height: 350,
    parentHeightOffset: 0,
  },
  plotOptions: {
    bar: {
      borderRadius: 0,
      horizontal: true,
      distributed: true,
      barHeight: "80%",
      isFunnel: true,
    },
  },
  colors: [
    "#287F71",
    "#522c8f",
    "#963b68",
    "#db398a",
    "#E7366B",
    "#c26316",
    "#E77636",
    "#108dff",
  ],
  dataLabels: {
    enabled: true,
    formatter: function (val, opt) {
      return opt.w.globals.labels[opt.dataPointIndex];
    },
    dropShadow: {
      enabled: true,
    },
  },
  title: {
    text: "Pyramid Chart",
    align: "middle",
  },
  xaxis: {
    categories: [
      "Sweets",
      "Processed Foods",
      "Healthy Fats",
      "Meat",
      "Beans & Legumes",
      "Dairy",
      "Fruits & Vegetables",
      "Grains",
    ],
  },
  legend: {
    show: false,
  },
};

var chart = new ApexCharts(
  document.querySelector("#pyramid_funnel_chart"),
  options
);
chart.render();
