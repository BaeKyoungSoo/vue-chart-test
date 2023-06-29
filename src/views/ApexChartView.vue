<template>
  <div>
    <input type="number" v-model="numberValue" />
    <button @click="getchartdata">click</button>
  </div>
  <div id="chart">
    <VueApexCharts
      ref="chartRef"
      type="line"
      height="350"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";
import moment from "moment";

export default {
  components: {
    VueApexCharts,
  },
  methods: {
    getchartdata() {
      let data = [];

      for (let index = 0; index < this.numberValue; index++) {
        data.push(Math.ceil(Math.random() * 10));
      }

      let drawStartDt = moment();

      this.series = [{ name: "test", data: data }];

      // 차트를 다시 그리고 콜백을 호출합니다.
      this.$nextTick(() => {
        let drawEndDt = moment();
        console.log("DIFF : ", this.getTimeDifference(drawStartDt, drawEndDt));
      });
    },
    getTimeDifference(start, end) {
      const duration = moment.duration(end.diff(start));
      const minutes = duration.minutes();
      const seconds = duration.seconds();
      const milseconds = duration.milliseconds();
      return `${minutes}분 ${seconds}초 ${milseconds} 밀리초`;
    },
  },
  data() {
    return {
      series: [
        {
          name: "Desktops",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
        },
      ],
      numberValue: 1000,
      chartOptions: {
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "straight",
        },
        title: {
          text: "Product Trends by Month",
          align: "left",
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
      },
    };
  },
};
</script>
