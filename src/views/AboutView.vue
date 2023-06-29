<template>
  <div>
    <button @click="getchartdata">click</button>
  </div>
  <div style="height: 100%">
    <Line ref="line" :data="state.chartdata" :options="state.options" />
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

export default {
  name: "App",
  components: {
    Line,
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

    function getchartdata() {
      state.int = state.int + 1;

      let data = cdata.rand(1000000);

      state.chartdata = { labels: [], datasets: [{ data: [] }] };

      linedata.value.labels = data.labels;
      linedata.value.datasets[0].data = data.datas;

      state.chartdata = linedata;

      console.log(state);
    }

    return {
      state,
      getchartdata,
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
