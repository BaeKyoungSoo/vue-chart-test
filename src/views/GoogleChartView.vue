<template>
  <div>
    <input type="number" v-model="numberValue" />
    <button @click="getchartdata">click</button>
  </div>
  <GChart
    type="LineChart"
    :data="chartData"
    :options="chartOptions"
    :events="chartEvents"
  />
</template>

<script>
import { GChart } from "vue-google-charts";
import moment from "moment";

export default {
  components: {
    GChart,
  },
  methods: {
    getchartdata() {
      // let data = cdata.rand(this.numberValue);

      let data = [];

      data.push(["x", "y1"]);

      for (let index = 0; index < this.numberValue; index++) {
        data.push([index, Math.ceil(Math.random() * 10)]);
      }

      this.drawStartDt = moment();
      // console.log(
      //   "START TIME => ",
      //   this.drawStartDt.format("YYYY-MM-DD HH:mm:ss.SSS")
      // );
      this.chartData = data;
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
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartData: [],
      chartOptions: {
        chart: {
          title: "Company Performance",
          subtitle: "Sales, Expenses, and Profit: 2014-2017",
        },
      },
      numberValue: 1000,
      chartEvents: {
        ready: () => {
          this.drawEndDt = moment();

          // console.log(
          //   "END TIME => ",
          //   this.drawEndDt.format("YYYY-MM-DD HH:mm:ss.SSS")
          // );

          console.log(
            "DIFF : ",
            this.getTimeDifference(this.drawStartDt, this.drawEndDt)
          );
        },
      },
      drawStartDt: null,
      drawEndDt: null,
    };
  },
};
</script>
