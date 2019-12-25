<template>
  <div class="sctc">
    <div class="outboxh1">
      <h1>{{ msg }}</h1>
      <h2 @click="sctccreateEcharts">生成echarts曲线</h2>
      <h2>
        <span>fullPath:&nbsp;&nbsp;{{this.$route.fullPath}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span>path:&nbsp;&nbsp;{{this.$route.path}}</span>
      </h2>
    </div>
    <div class="outboxecharts">
      <echarts1 />
      <echarts2 />
    </div>
  </div>
</template>

<script>
import Bus from "@/bus";
import echarts1 from "./sctc/echarts1";
import echarts2 from "./sctc/echarts2";
export default {
  name: "sctc",
  components: {
    echarts1,
    echarts2
  },
  data() {
    return {
      msg: "水厂停产"
    };
  },
  mounted() {
    this.sctcgetadata();
  },
  methods: {
    sctcgetadata() {
      this.$axios.post("/volodya/resdata").then(res => {
        console.log("%sctc-cresdata", "color:yellow", res);
        Bus.$emit("tosctcecharts1", res.data);
      });
    },
    sctccreateEcharts() {
      this.$axios.post("/volodya/resdata2").then(res => {
        console.log("%csctc-resdata2", "color:yellow", res);
        Bus.$emit("tosctcecharts2", res.data);
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/styles/global.scss";
.sctc {
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: vw(1920);
  height: vh(960);
  .outboxh1 {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    width: vw(1920);
    height: vh(220);
    h1 {
      font-size: vh(46);
      font-weight: bold;
      color: #42b983;
    }
    h2 {
      font-weight: bold;
      margin-top: vh(20);
      color: #fff;
      padding: vh(10) vw(20);
      background-color: #42b983;
      cursor: pointer;
      &:hover {
        background-color: #52d399;
      }
    }
  }
  .outboxecharts {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    width: vw(1920);
    height: vh(620);
  }
}
</style>
