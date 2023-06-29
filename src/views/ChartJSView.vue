<template>
  <div>
    <input type="number" v-model="state.numberValue" />
    <button @click="getchartdata">click</button>
  </div>
  <div style="height: 100%">
    <Line
      ref="line"
      :data="state.chartdata"
      :options="state.options"
      :plugins="chartPlugins"
    />
  </div>
  <div>{{ state.int }}</div>
</template>

<script>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "vue-chartjs";
import cdata from "./data.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
import { reactive, ref } from "vue";
import moment from "moment";

export default {
  name: "App",
  components: {
    Line,
  },
  computed: {
    chartPlugins() {
      return [
        {
          afterDraw: () => {
            let drawEndDt = moment();

            console.log(
              "DIFF : ",
              this.getTimeDifference(this.state.drawStartDt, drawEndDt)
            );
          },
        },
      ];
    },
  },
  setup() {
    const state = reactive({
      options: {
        responsive: true,
      },
      chartdata: {
        labels: [],
        datasets: [
          {
            label: "Data One",
            data: [],
          },
        ],
      },
      int: 0,
      numberValue: 1000,
      drawStartDt: null,
    });

    let linedata = ref({
      labels: [],
      datasets: [
        {
          label: "Data One",
          data: [],
        },
      ],
    });

    function getTimeDifference(start, end) {
      const duration = moment.duration(end.diff(start));
      const minutes = duration.minutes();
      const seconds = duration.seconds();
      const milseconds = duration.milliseconds();
      return `${minutes}분 ${seconds}초 ${milseconds} 밀리초`;
    }

    function chartRendered() {
      console.log("dasdada");
    }

    function getchartdata() {
      let data = cdata.rand(state.numberValue);

      state.chartdata = { labels: [], datasets: [{ data: [] }] };

      linedata.value.labels = data.labels;
      linedata.value.datasets[0].data = data.datas;

      state.drawStartDt = moment();

      state.chartdata = linedata;

      console.log(state);
    }

    return {
      state,
      getchartdata,
      chartRendered,
      getTimeDifference,
    };
  },
  // methods: {
  //   getchartdata() {
  //     let data = cdata.rand(100);
  //     console.log(data);
  //     this.linedata.labels = data.labels;
  //     this.linedata.datasets[0].data = data.datas;
  //     this.chartdata = this.linedata;
  //   },
  // },
  // data() {
  //   return {
  //     chartdata: null,
  //     linedata: {
  //       labels: [0, 1, 2, 3, 4],
  //       datasets: [
  //         {
  //           label: "Data One",
  //           backgroundColor: "#f87979",
  //           data: [0, 1, 2, 3, 4],
  //         },
  //       ],
  //     },
  //     options: {
  //       responsive: true,
  //       maintainAspectRatio: false,
  //     },
  //   };
  // },
};
</script>
