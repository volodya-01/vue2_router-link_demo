<template>
  <div class="jhts">
    <div class="outboxh1">
      <h1>{{ msg }}</h1>
      <h2 @click="jhtscreateEcharts">生成echarts曲线</h2>
       <h2>
        <span>fullPath:&nbsp;&nbsp;{{this.$route.fullPath}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span>path:&nbsp;&nbsp;{{this.$route.path}}</span>
      </h2>
    </div>
    <div class="outboxecharts">
        <echarts1/>
        <echarts2/>
    </div>
  </div>
</template>

<script>
import Bus from "@/bus"
import echarts1 from "./jhts/echarts1";
import echarts2 from "./jhts/echarts2";
export default {
  name: "jhts",
  components: {
    echarts1,
    echarts2
  },
  data() {
    return {
      msg: "计划停水"
    };
  },
  mounted() {
    this.jhtsgetadata();
  },
  methods: {
    jhtsgetadata() {
      this.$axios.post("/volodya/resdata").then(res => {
        console.log("%cjhts-cresdata", "color:blue", res);
        Bus.$emit('tojhtsecharts1',res.data)
      });
    },
    jhtscreateEcharts(){
         this.$axios.post("/volodya/resdata2").then(res => {
        console.log("%cjhts-cresdata2", "color:blue", res);
        Bus.$emit('tojhtsecharts2',res.data)
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/styles/global.scss";
.jhts {
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
