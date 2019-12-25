<template>
  <div class="gfgs">
    <div class="outboxh1">
      <h1>{{ msg }}</h1>
      <h2 @click="createEcharts">生成echarts曲线</h2>
    </div>
    <div class="outboxecharts">
        <echarts1/>
        <echarts2/>
    </div>
  </div>
</template>

<script>
import Bus from "@/bus"
import echarts1 from "./gfgs/echarts1";
import echarts2 from "./gfgs/echarts2";
export default {
  name: "gfgs",
  components: {
    echarts1,
    echarts2
  },
  data() {
    return {
      msg: "高峰供水"
    };
  },
  mounted() {
    this.getadata();
  },
  methods: {
    getadata() {
      this.$axios.post("/volodya/resdata").then(res => {
        console.log("%cresdata", "color:green", res);
        Bus.$emit('togfgsecharts1',res.data)
      });
    },
    createEcharts(){
         this.$axios.post("/volodya/resdata2").then(res => {
        console.log("%cresdata2", "color:green", res);
        Bus.$emit('togfgsecharts2',res.data)
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/styles/global.scss";
.gfgs {
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
      margin-top:vh(20);
      color: #fff;
      padding: vh(10) vw(20);
      background-color: #42b983;
      cursor:pointer;
      &:hover{
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
