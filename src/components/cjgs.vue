<template>
  <div class="cjgs">
    <div class="outboxh1">
      <h1>{{ msg }}</h1>
      <h2 @click="cjgscreateEcharts">生成echarts曲线</h2>
    </div>
    <div class="outboxecharts">
        <echarts1/>
        <echarts2/>
    </div>
  </div>
</template>

<script>
import Bus from "@/bus"
import echarts1 from "./cjgs/echarts1";
import echarts2 from "./cjgs/echarts2";
export default {
  name: "cjgs",
  components: {
    echarts1,
    echarts2
  },
  data() {
    return {
      msg: "春节供水"
    };
  },
  mounted() {
    this.cjgsgetadata();
  },
  methods: {
    cjgsgetadata() {
      this.$axios.post("/volodya/resdata").then(res => {
        console.log("%ccjgs-resdata", "color:red", res);
        Bus.$emit('tocjgsecharts1',res.data)
      });
    },
    cjgscreateEcharts(){
         this.$axios.post("/volodya/resdata2").then(res => {
        console.log("%cjgs-cresdata2", "color:red", res);
        Bus.$emit('tocjgsecharts2',res.data)
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/styles/global.scss";
.cjgs {
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
