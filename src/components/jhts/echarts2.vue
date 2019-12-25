<template>
  <div class="outbox">
    <div :class="className" :style="{height:height,width:width}" />
  </div>
</template>

<script>
import Bus from "@/bus.js";
import { debounce } from "@/utils";
export default {
  name: "echarts1",
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "vh(548)"
    },
    autoResize: {
      type: Boolean,
      default: true
    }
    /* chartData: {
      type: Object,
      required: true
    } */
  },
  data() {
    return {
      chart: null,
      sidebarElm: null,
      chartData: {}
    };
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      }
    }
  },
  mounted() {
    Bus.$on("tojhtsecharts2", e => {
      let time=[]
      let time2=[]
      let data=[]
      e.data.forEach((ele, index) => {
        time.push(ele.now);
        time2.push(ele.now);
        data.push(ele.float5);
      });

      var a = {
          time,
          time2,
          data
      };
       this.chartData = a;
      this.$nextTick(this.initChart());
    });
    /* 处理数据结束 */
    if (this.autoResize) {
      this.__resizeHandler = debounce(() => {
        if (this.chart) {
          this.chart.resize();
        }
      }, 100);
      window.addEventListener("resize", this.__resizeHandler);
    }

    // 监听侧边栏的变化
    this.sidebarElm = document.getElementsByClassName("sidebar-container")[0];
    this.sidebarElm &&
      this.sidebarElm.addEventListener(
        "transitionend",
        this.sidebarResizeHandler
      );
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    if (this.autoResize) {
      window.removeEventListener("resize", this.__resizeHandler);
    }

    this.sidebarElm &&
      this.sidebarElm.removeEventListener(
        "transitionend",
        this.sidebarResizeHandler
      );

    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    sidebarResizeHandler(e) {
      if (e.propertyName === "width") {
        this.__resizeHandler();
      }
    },
    setOptions(chartData) {
      this.chart.setOption({
        grid: {
         /*  bottom: 40,
          top: 55,
          right: 19,
          left: 90, */
          show: true,
          borderColor: "#dfdfe1",
          borderWidth: 1
        },

        legend: {
          show: true,
          orient: "horizontal",
         /*  right: 20,
          top: 15, */
          itemWidth: 15,
          itemGap: 20,
          data: ["数据"]
        },
        tooltip: {
          trigger: "axis",
          padding: [0, 10],
          confine: true,
          formatter: function(params) {
            var res =
              "<div> <p>" +
              params[0].name +
             " </p>  </div>";
            for (var i = 0; i < params.length; i++) {
              if (params[i].seriesName == "数据") {
                res +=
                  params[i].data == ""
                    ? ""
                    : "<p>" +
                      params[i].marker +
                      "数据" +
                      ":" +
                      params[i].data +
                      "</p>";
              }  
            }
            return res;
          },
          textStyle: {
            align: "left"
          }
        },
        xAxis: [
          {
            data: chartData.time,
            axisLabel: {
              inside: false,
              textStyle: {
                color: "rgba(0,0,0,0)"
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#dfdfdf",
                width: 1,
                type: "dashed"
              }
            },
            z: 10,
            position: "top",
            offset: 0
          },
          {
            data: chartData.time2,
            axisPointer: {
              type: "none"
            },
            axisLabel: {
              inside: false,
              textStyle: {
                color: "#999"
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            z: 10
          }
        ],
        yAxis: {
          splitLine: {
            show: false,
            lineStyle: {
              color: "#dfdfdf",
              width: 1,
              type: "dashed"
            }
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: "#999"
            }
          }
        },
        series: [
          {
            name: "数据",
            type: "line",
            symbol: "none",
            data: chartData.data,
            connectNulls: true,
            itemStyle: {
              normal: {
                color: "red"
              }
            },
            lineStyle: {
              normal: {
                width: 1,
                color: "red"
              }
            }/* ,
            areaStyle: {
              normal: {
                color: "#f8d8d4"
              }
            } */
          },
        ]
      });
    },
    initChart() {
      this.chart = this.$echarts.init(this.$el, "macarons");
      this.chart.clear();
      this.setOptions(this.chartData);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/global.scss";
.outbox {
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  width: vw(1160);
  height: vh(548);
}
</style>


