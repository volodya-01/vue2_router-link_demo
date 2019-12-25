<template>
  <div class="hello">
    <h1>
      {{ msg }}&nbsp;&nbsp;
      <span class="timeStyle">{{noedate}}</span>
    </h1>
    <div class="tabsoutbox">
      <div class="tabsoutbox_inbox">
        <!-- <router-link
          v-for="(item,index) in routerstabrooms"
          :key="index"
          :to="item.path"
          replace
          active-class="activeClass"
          class="routerLinkStyle"
          tag="div"
        >{{item.name}}</router-link> -->
        <router-link
          v-for="(item,index) in routerstabrooms"
          :key="index"
          :to="{path: item.path,params: { id: 123 }}"
          replace
          active-class="activeClass"
          class="routerLinkStyle"
          tag="div"
        >{{item.name}}</router-link>
      </div>
    </div>
    <div class="routerviewsStyle">
      <transition>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "router-link",
      routerstabrooms: [
        { path: "/gfgs", name: "高峰供水" },
        { path: "/cjgs", name: "春节供水" },
        { path: "/jhts", name: "计划停水" },
        { path: "/sctc", name: "水厂停产" }
      ],
      nowtime: "",
      noedate: ""
    };
  },
  mounted() {
    this.gettime();
    setInterval(() => {
      this.gettime();
    }, 1000);
  },
  methods: {
    gettime() {
      var date = new Date();
      this.nowtime = this.$moment(date).format("HH:mm:ss");
      this.noedate = this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/styles/global.scss";
.hello {
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: vw(1920);
  height: vh(1080);
  /*   background-color: #42b983; */
  h1 {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    font-weight: normal;
    width: vw(1920);
    height: vh(80);
    .timeStyle {
      font: normal vh(16) "微软雅黑";
      margin-top: vh(16);
    }
  }
  .tabsoutbox {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    width: vw(1920);
    height: vh(40);
    .tabsoutbox_inbox {
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
      width: vw(1920);
      height: vh(40);
      .routerLinkStyle {
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        width: vw(220);
        height: vh(40);
        color: #2c3e50;
        font: normal vh(18) "微软雅黑";
        cursor: pointer;
        border-bottom: 1px solid #ccc;
        border-top: 1px solid #ccc;
        border-left: 1px solid #ccc;
        &:last-child {
          border-right: 1px solid #ccc;
        }
      }
      .activeClass {
        font: normal vh(18) "微软雅黑";
        color: #fff;
        background-color: #42b983;
      }
    }
  }
  .routerviewsStyle {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    width: vw(1920);
    height: vh(960);
  }
}
</style>
